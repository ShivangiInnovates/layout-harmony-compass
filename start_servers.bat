@echo off
REM start_servers.bat

echo Starting Python Flask server...
start powershell -NoExit "cd '%~dp0' && python server.py"

echo Starting React development server...
start powershell -NoExit "cd '%~dp0' && npm run dev"

echo Both servers started!
