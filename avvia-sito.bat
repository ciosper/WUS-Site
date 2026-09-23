@echo off
title Wellfit Union Sport - Avvio Sito Locale
chcp 65001 > nul
echo ========================================================
echo   🏀 Wellfit Union Sport - Avvio del Sito Web Locale 🏀
echo ========================================================
echo.
echo Avvio del server locale in corso...
echo Apertura del browser all'indirizzo: http://localhost:8080/
echo.
echo Premi CTRL+C o chiudi questa finestra per fermare il server.
echo ========================================================
echo.

:: Avvia il browser dopo un secondo
start "" "http://localhost:8080/"

:: Esegue il server PowerShell con bypass dei vincoli di esecuzione
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

:: Se PowerShell non fosse disponibile, apre direttamente index.html
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Impossibile avviare il server PowerShell.
    echo Apertura diretta del file index.html nel browser...
    start "" "%~dp0index.html"
)
pause
