#!/usr/bin/env bash

## Author: https://github.com/EvineDeng
## Modified： 2021-01-22
## Version： v1.0.1

## 路径与清单
WorkDir=$(cd $(dirname $0); pwd)
JsList=$(cd $WorkDir; ls *.js | grep -Ei "j[drx]_")
JsList="$JsList backUp/xmSports.js"
FileLoon=$WorkDir/Loon/lxk0301_LoonTask.conf
FileQx=$WorkDir/QuantumultX/lxk0301_gallery.json
FileQxRe=$WorkDir/QuantumultX/lxk0301_cookies.conf
FileSurge=$WorkDir/Surge/lxk0301_Task.sgmodule.sgmodule

## task清单顶部内容
CommentsLoon="# IOS Loon Task&Cookies配置 By LXK9301\n# GitHub主页(https://gitee.com/lxk0301/jd_scripts/tree/master)\n# TG讨论组 (https://t.me/JD_fruit_pet)\n# TG通知频道 (https://t.me/jdfruit)\n# Loon的Task&Cookies脚本订阅链接: https://gitee.com/lxk0301/jd_scripts/raw/master/Loon/lxk0301_LoonTask.conf\n# 使用方法:打开APP，顶部的配置 -> 脚本 -> 订阅脚本- > 点击右上角+号 -> 添加url链接 (https://gitee.com/lxk0301/jd_scripts/raw/master/Loon/lxk0301_LoonTask.conf)\n\nhostname = api.m.jd.com, wq.jd.com, draw.jdfcloud.com, jdjoy.jd.com, account.huami.com"
CommentsQx='{\n  "name": "LXK9301 task gallery",\n  "description": "https://gitee.com/lxk0301/jd_scripts/tree/master",\n  "task": ['
CommentsQxRe="hostname = api.m.jd.com, draw.jdfcloud.com, jdjoy.jd.com, account.huami.com, wq.jd.com"

CommentsSurgeHead="#!name=LXK9301 iOS Tasks&Cookies Module\n#!desc=iOS Tasks&Cookies 模块配置\n\n# Task&Cookies模块配置 By LXK9301\n# GitHub主页(https://gitee.com/lxk0301/jd_scripts/tree/master)\n# TG讨论组 (https://t.me/JD_fruit_pet)\n# TG通知频道 (https://t.me/jdfruit)\n# Surge的Task&Cookies脚本模块地址: https://gitee.com/lxk0301/jd_scripts/raw/master/Surge/lxk0301_Task.sgmodule.sgmodule\n\n[Script]"
CommentsSurgeTail="\n[MITM]\nhostname = %APPEND% wq.jd.com, draw.jdfcloud.com, jdjoy.jd.com, account.huami.com, wq.jd.com"


## 执行写入
cd $WorkDir
echo -e $CommentsLoon > $FileLoon
echo -e $CommentsQx > $FileQx
echo -e $CommentsQxRe > $FileQxRe
echo -e $CommentsSurgeHead > $FileSurge
for file in $JsList
do
  TaskName=$(grep "new Env" $file | awk -F "'|\"" '{print $2}')
  if [[ -n $TaskName ]]; then
    echo -e "\n# $TaskName" >> $FileLoon
    grep -E "cron.+script-path.+https://gitee\.com.+tag" $file >> $FileLoon
    grep -E "https://gitee\.com.+tag.+enabled" $file | perl -pe 's|(.+\w)|\1",|' | perl -pe 's|^|    \"|' >> $FileQx
    grep -E "type.+cronexp.+script-path.+https://gitee\.com" $file >> $FileSurge
  fi
  grep -E "http-(request|response).+script-path.+https://gitee\.com.+tag" $file | perl -pe "s|(.+tag=)(.+)|\n# \2\n\1\2|" >> $FileLoon
  grep -E "script-(request|response)-.+https://gitee\.com" $file | perl -pe "s|(.+)|\n# $TaskName\n\1|" >> $FileQxRe
  grep -E "type=http-(request|response).+pattern.+script-path.+https://gitee\.com" $file >> $FileSurge
done
echo -e "  ]\n}" >> $FileQx
echo -e $CommentsSurgeTail >> $FileSurge
perl -0777 -i -pe "s|,(\s{1,2}  \])|\1|" $FileQx
perl -0777 -i -pe "s|# .+\n{2}(# .+)|\1|g" $FileLoon
