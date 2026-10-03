# Gestor de Gastos App

Aplicación móvil para gestionar gastos e ingresos personales.

## Requisitos

- Node.js >= 18
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/vallespaa/gestor-gastos-app.git
   cd gestor-gastos-app
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. (Opcional) Copia `.env.example` a `.env` y rellena `FEEDBACK_EMAIL`.

## Ejecución

Para iniciar la app en modo desarrollo:
```
npm start
```
Ábrelo en el navegador o escanea el código QR con la app Expo Go en tu móvil.

## Funcionalidades principales

- Registro de gastos e ingresos
- Visualización de transacciones por día, semana, mes y año
- Gráficas de resumen por categoría

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
├── docs/                   # Documentación del proyecto
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
│   │   ├── transactions/
│   │   └── transfers/
│   ├── hooks/              # Hooks transversales
│   └── navigation/         # Configuración de la navegación (Drawer, Stacks, etc.)
├── App.js              # Punto de entrada principal de la app
├── index.js            # Registro de la app para Expo
├── app.config.js       # Configuración de Expo
└── package.json        # Dependencias y scripts del proyecto
```

## Tecnologías utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage

## Contribución

¿Quieres contribuir? Haz un fork del repositorio, crea una rama y envía tu pull request.

## Changelog

Consulta el historial de cambios en el [Changelog](./docs/CHANGELOG.md).

## Roadmap

Consulta nuestro [Roadmap](./docs/ROADMAP.md) para ver lo que se viene.
