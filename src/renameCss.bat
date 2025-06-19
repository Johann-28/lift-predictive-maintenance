@echo off
setlocal enabledelayedexpansion
echo Renombrando archivos .module.css a .css...
echo.

REM Contador para mostrar progreso
set count=0
set conflicts=0

REM Buscar y renombrar todos los archivos .module.css recursivamente
for /r %%f in (*.module.css) do (
    set /a count+=1
    
    REM Obtener información del archivo
    set "fullpath=%%f"
    set "directory=%%~dpf"
    set "filename=%%~nf"
    
    REM Crear el nuevo nombre eliminando .module
    set "newname=!filename:.module=!"
    set "newfile=!directory!!newname!.css"
    
    REM Verificar si ya existe el archivo destino
    if exist "!newfile!" (
        echo CONFLICTO: !newfile! ya existe
        echo   - Eliminando archivo existente: !newname!.css
        del "!newfile!"
        set /a conflicts+=1
    )
    
    REM Renombrar el archivo
    echo Renombrando: !filename!.module.css ^> !newname!.css
    ren "!fullpath!" "!newname!.css"
    
    if errorlevel 1 (
        echo ERROR: No se pudo renombrar !fullpath!
    )
)

echo.
echo ========================================
echo Proceso completado:
echo - Archivos procesados: !count!
echo - Conflictos resueltos: !conflicts!
echo ========================================
pause