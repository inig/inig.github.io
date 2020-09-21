#!/bin/bash -
# if [ -z '$1' ]
# then
#   echo "你想要将哪个文件夹部署到GitHub页面？"
#   exit 1
# fi
git subtree push --prefix=gh-pages origin gh-pages 
# git subtree push --prefix $1 origin gh-pages

# 