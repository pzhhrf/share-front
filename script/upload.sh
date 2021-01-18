#!/bin/bash
rm -rf dist/ dist.tar
yarn build
tar -zcvf dist.tar dist
scp dist.tar root@141.164.55.73:/root/backgroud/front