@echo off
echo yarn build start ======(1/3)
yarn build
echo pm2 stop =======(2/3)
pm2 delete all
echo pm2 start=======(3/3)
pm2 start
pm2 list
pause
