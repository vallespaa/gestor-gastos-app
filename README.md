# Gestor de Gastos App

Aplicación móvil para gestionar gastos e ingresos personales.

## Requisitos

- Node.js >= 14
- npm o yarn
- Expo CLI

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd gestor-gastos-app
   ```

2. Instala las dependencias:
   ```
   npm install
   # o
   yarn install
   ```

## Ejecución

Para iniciar la app en modo desarrollo:
```
expo start
```
Ábrelo en el navegador o escanea el código QR con la app Expo Go en tu móvil.

## Funcionalidades principales

- Registro de gastos e ingresos
- Visualización de transacciones por día, semana, mes y año
- Gráficas de resumen por categoría
- Importación y exportación de transacciones en Excel

---

## Estructura del proyecto

```
gestor-gastos-app/
├── app/
│   ├── application/        # Casos de uso
│   ├── data/               # Implementaciones concretas del acceso a datos
│   │   ├── accounts/
│   │   ├── adjustments/
│   │   ├── categories/
│   │   ├── transactions/
│   │   └── transfers/
│   └── domain/
│       ├── entities/       # Modelos puros del negocio
│       └── repositories/   # Contratos que define el dominio
├── assets/
├── shared/                 # Componentes reutilizables, hooks, estilos y contexto global
│   ├── constants/
│   ├── context/
│   └── styles/
├── ui/
│   ├── components/         # Componentes visuales reutilizables
│   ├── features/           # Pantallas principales y lógica de negocio
│   │   ├── accounts/
│   │   ├── add/
│   │   ├── categories/
│   │   ├── overview/
│   │   ├── settings/
│   │   └── transactions/
│   ├── hooks/              # Hooks transversales
│   └── navigation/         # Configuración de la navegación (Drawer, Stacks, etc.)
├── App.js              # Punto de entrada principal de la app
├── index.js            # Registro de la app para Expo
├── app.json            # Configuración de Expo
├── package.json        # Dependencias y scripts del proyecto
├── README.md           # Documentación principal
├── CHANGELOG.md        # Historial de cambios
├── ROADMAP.md          # Plan de desarrollo y futuras funcionalidades
└── LICENSE.md          # Licencia del proyecto
```

## Tecnologías utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage
- XLSX (para importación/exportación Excel)

## Contribución

¿Quieres contribuir? Haz un fork del repositorio, crea una rama y envía tu pull request.

## Changelog

Consulta el historial de cambios en el [Changelog](./CHANGELOG.md).

## Roadmap

Consulta nuestro [Roadmap](./ROADMAP.md) para ver lo que se viene.
