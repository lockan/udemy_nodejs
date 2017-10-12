@echo off

set dst="D:\Code\node\projects\udemy-todo"
set src="D:\Code\node\projects\udemy_nodejs\todo"

echo. && echo " ===== Copying %src% to %dst% ====="
robocopy /MIR %src% %dst% /XA:H /XF publish.bat /XD .git

pushd %dst%

REM echo. && echo " ===== Reinitialize git repo and heroku remote ====="
REM git init
REM git remote add heroku https://git.heroku.com/still-dusk-34085.git
REM git pull heroku master

echo. && echo " ===== Create git commit ====="
git add --all
git commit -m "===== Automatic publish commit ====="

echo. && echo " ===== git push heroku master ====="
git push heroku master

popd