#!/bin/sh
set -e

echo "定义定时任务合并处理用到的文件路径..."
defaultListFile="/scripts/docker/$DEFAULT_LIST_FILE"
echo "默认文件定时任务文件路径为 ${defaultListFile}"
mergedListFile="/scripts/docker/merged_list_file.sh"
echo "合并后定时任务文件路径为 ${mergedListFile}"

echo "第1步将默认定时任务列表添加到并后定时任务文件..."
cat $defaultListFile >$mergedListFile

echo "第2步判断是否存在自定义任务任务列表并追加..."
if [ $CUSTOM_LIST_FILE ]; then
    echo "您配置了自定义任务文件：$CUSTOM_LIST_FILE，自定义任务类型为：$CUSTOM_LIST_MERGE_TYPE..."
    # 无论远程还是本地挂载, 均复制到 $customListFile
    customListFile="/scripts/docker/custom_list_file.sh"
    echo "自定义定时任务文件临时工作路径为 ${customListFile}"
    if expr "$CUSTOM_LIST_FILE" : 'http.*' &>/dev/null; then
        echo "自定义任务文件为远程脚本，开始下载自定义远程任务。"
        wget -O $customListFile $CUSTOM_LIST_FILE
        echo "下载完成..."
    elif [ -f /scripts/docker/$CUSTOM_LIST_FILE ]; then
        echo "自定义任务文件为本地挂载。"
        cp /scripts/docker/$CUSTOM_LIST_FILE $customListFile
    fi

    if [ -f "$customListFile" ]; then
        if [ $CUSTOM_LIST_MERGE_TYPE == "append" ]; then
            echo "合并默认定时任务文件：$DEFAULT_LIST_FILE 和 自定义定时任务文件：$CUSTOM_LIST_FILE"
            echo -e "" >>$mergedListFile
            cat $customListFile >>$mergedListFile
        elif [ $CUSTOM_LIST_MERGE_TYPE == "overwrite" ]; then
            echo "配置了自定义任务文件：$CUSTOM_LIST_FILE，自定义任务类型为：$CUSTOM_LIST_MERGE_TYPE..."
            cat $customListFile >$mergedListFile
        else
            echo "配置配置了错误的自定义定时任务类型：$CUSTOM_LIST_MERGE_TYPE，自定义任务类型为只能为append或者overwrite..."
        fi
    else
        echo "配置的自定义任务文件：$CUSTOM_LIST_FILE未找到，使用默认配置$DEFAULT_LIST_FILE..."
    fi
else
    echo "当前只使用了默认定时任务文件 $DEFAULT_LIST_FILE ..."
fi





echo "第3步判断是否配置了随即延迟参数..."
if [ $RANDOM_DELAY_MAX ]; then
    if [ $RANDOM_DELAY_MAX -ge 1 ]; then
        echo "已设置随机延迟为 $RANDOM_DELAY_MAX , 设置延迟任务中..."
        sed -i "/\(jd_bean_sign.js\|jd_blueCoin.js\|jd_joy_reward.js\|jd_joy_steal.js\|jd_joy_feedPets.js\|jd_car_exchange.js\)/!s/node/sleep \$((RANDOM % \$RANDOM_DELAY_MAX)); node/g" $mergedListFile
    fi
else
    echo "未配置随即延迟对应的环境变量，故不设置延迟任务..."
fi

echo "第4步判断是否配置自定义shell执行脚本..."
if [ 0"$CUSTOM_SHELL_FILE" = "0" ]; then
    echo "未配置自定shell脚本文件，跳过执行。"
else
    if expr "$CUSTOM_SHELL_FILE" : 'http.*' &>/dev/null; then
        echo "自定义shell脚本为远程脚本，开始下载自定义远程脚本。"
        wget -O /scripts/docker/shell_script_mod.sh $CUSTOM_SHELL_FILE
        echo "下载完成，开始执行..."
        echo "#远程自定义shell脚本追加定时任务" >>$mergedListFile
        sh -x /scripts/docker/shell_script_mod.sh
        echo "自定义远程shell脚本下载并执行结束。"
    else
        if [ ! -f $CUSTOM_SHELL_FILE ]; then
            echo "自定义shell脚本为docker挂载脚本文件，但是指定挂载文件不存在，跳过执行。"
        else
            echo "docker挂载的自定shell脚本，开始执行..."
            echo "#docker挂载自定义shell脚本追加定时任务" >>$mergedListFile
            sh -x $CUSTOM_SHELL_FILE
            echo "docker挂载的自定shell脚本，执行结束。"
        fi
    fi
fi



echo "第5步删除不运行的脚本任务..."
if [ $DO_NOT_RUN_SCRIPTS ]; then
    echo "您配置了不运行的脚本：$DO_NOT_RUN_SCRIPTS"
    arr=${DO_NOT_RUN_SCRIPTS//&/ }
    for item in $arr; do
        sed -ie '/'"${item}"'/d' ${mergedListFile}
    done

fi


echo "第6步设定下次运行docker_entrypoint.sh时间..."
echo "删除原有docker_entrypoint.sh任务"
sed -ie '/'docker_entrypoint.sh'/d' ${mergedListFile}

# 12:00前生成12:00后的cron，12:00后生成第二天12:00前的cron，一天只更新两次代码
if [ $(date +%-H) -lt 12 ]; then
    random_h=$(($RANDOM % 12 + 12))
else
    random_h=$(($RANDOM % 12))
fi
random_m=$(($RANDOM % 60))

echo "设定 docker_entrypoint.sh cron为："
echo -e "\n# 必须要的默认定时任务请勿删除" >> $mergedListFile
echo -e "${random_m} ${random_h} * * * docker_entrypoint.sh >> /scripts/logs/default_task.log 2>&1" | tee -a $mergedListFile


echo "第7步增加 |ts 任务日志输出时间戳..."
sed -i "/\( ts\| |ts\|| ts\)/!s/>>/\|ts >>/g" $mergedListFile

echo "第8步执行proc_file.sh脚本任务..."
sh -x /scripts/docker/proc_file.sh

echo "第9步加载最新的定时任务文件..."
crontab $mergedListFile

echo "第10步将仓库的docker_entrypoint.sh脚本更新至系统/usr/local/bin/docker_entrypoint.sh内..."
cat /scripts/docker/docker_entrypoint.sh >/usr/local/bin/docker_entrypoint.sh
