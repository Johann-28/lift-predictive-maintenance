#!/bin/bash

# Crear estructura de carpetas y archivos para proyecto React TypeScript

# Crear carpetas principales
mkdir -p src/{components/{shared/{Header,Sidebar,Chat,Layout},ui/{Button,Modal,Card,Badge,Chart}},modules/{home/{components/{SystemOverviewPanel,ElevatorsGrid,ElevatorsList,Recommendations,AlertRemainings},pages,hooks},elevator-details/{components/{RLUComponents,ScheduleMaintenance/{Calendar},ElevatorReportLog,Lift3D,SensorsVariables/{VibrationSensor,LoadWeightSensor,HumiditySensor,TemperatureSensor}},pages,hooks}},services/{api,websocket},hooks,context,utils,styles,assets/{images,icons,fonts},routes}

mkdir -p public

# Crear archivos en components/shared
touch src/components/shared/Header/{Header.tsx,Header.module.css,index.ts}
touch src/components/shared/Sidebar/{Sidebar.tsx,Sidebar.module.css,index.ts}
touch src/components/shared/Chat/{Chat.tsx,Chat.module.css,index.ts}
touch src/components/shared/Layout/{Layout.tsx,Layout.module.css,index.ts}

# Crear archivos en components/ui (estructura básica)
touch src/components/ui/Button/{Button.tsx,Button.module.css,index.ts}
touch src/components/ui/Modal/{Modal.tsx,Modal.module.css,index.ts}
touch src/components/ui/Card/{Card.tsx,Card.module.css,index.ts}
touch src/components/ui/Badge/{Badge.tsx,Badge.module.css,index.ts}
touch src/components/ui/Chart/{Chart.tsx,Chart.module.css,index.ts}

# Crear archivos en modules/home
touch src/modules/home/components/SystemOverviewPanel/{SystemOverviewPanel.tsx,SystemOverviewPanel.module.css,index.ts}
touch src/modules/home/components/ElevatorsGrid/{ElevatorsGrid.tsx,ElevatorsGrid.module.css,index.ts}
touch src/modules/home/components/ElevatorsList/{ElevatorsList.tsx,ElevatorsList.module.css,index.ts}
touch src/modules/home/components/Recommendations/{Recommendations.tsx,Recommendations.module.css,index.ts}
touch src/modules/home/components/AlertRemainings/{AlertRemainings.tsx,AlertRemainings.module.css,index.ts}
touch src/modules/home/pages/HomePage.tsx
touch src/modules/home/hooks/useHomeData.ts

# Crear archivos en modules/elevator-details
touch src/modules/elevator-details/components/RLUComponents/{RLUComponents.tsx,RLUComponents.module.css,index.ts}
touch src/modules/elevator-details/components/ScheduleMaintenance/{ScheduleMaintenance.tsx,ScheduleMaintenance.module.css,index.ts}
touch src/modules/elevator-details/components/ScheduleMaintenance/Calendar/{Calendar.tsx,Calendar.module.css}
touch src/modules/elevator-details/components/ElevatorReportLog/{ElevatorReportLog.tsx,ElevatorReportLog.module.css,index.ts}
touch src/modules/elevator-details/components/Lift3D/{Lift3D.tsx,Lift3D.module.css,index.ts}
touch src/modules/elevator-details/components/SensorsVariables/{SensorsVariables.tsx,SensorsVariables.module.css}

# Crear carpetas para sensores (estructura básica)
mkdir -p src/modules/elevator-details/components/SensorsVariables/{VibrationSensor,LoadWeightSensor,HumiditySensor,TemperatureSensor}
touch src/modules/elevator-details/components/SensorsVariables/VibrationSensor/{VibrationSensor.tsx,VibrationSensor.module.css,index.ts}
touch src/modules/elevator-details/components/SensorsVariables/LoadWeightSensor/{LoadWeightSensor.tsx,LoadWeightSensor.module.css,index.ts}
touch src/modules/elevator-details/components/SensorsVariables/HumiditySensor/{HumiditySensor.tsx,HumiditySensor.module.css,index.ts}
touch src/modules/elevator-details/components/SensorsVariables/TemperatureSensor/{TemperatureSensor.tsx,TemperatureSensor.module.css,index.ts}

touch src/modules/elevator-details/pages/ElevatorDetailsPage.tsx
touch src/modules/elevator-details/hooks/{useElevatorData.ts,useSensorData.ts}

# Crear archivos de servicios
touch src/services/api/{elevators.ts,maintenance.ts,sensors.ts,index.ts}
touch src/services/websocket/chatService.ts

# Crear hooks globales
touch src/hooks/{useAuth.ts,useLocalStorage.ts,useWebSocket.ts}

# Crear context providers
touch src/context/{AuthContext.tsx,ThemeContext.tsx,ElevatorContext.tsx}

# Crear utilidades
touch src/utils/{constants.ts,helpers.ts,formatters.ts,validators.ts}

# Crear estilos globales
touch src/styles/{globals.css,variables.css,mixins.css}

# Crear rutas
touch src/routes/{AppRouter.tsx,ProtectedRoute.tsx,routes.ts}

# Crear archivos principales
touch src/{App.tsx,index.tsx,setupTests.ts}

# Crear archivos públicos
touch public/{index.html,favicon.ico,manifest.json}

# Crear archivos de configuración del proyecto
touch {package.json,.gitignore,README.md}

echo "✅ Estructura del proyecto creada exitosamente!"
echo "📁 Todos los archivos .jsx han sido cambiados a .tsx"
echo "📁 Los hooks y servicios ahora usan extensión .ts"
echo "📁 Los archivos de contexto usan extensión .tsx"