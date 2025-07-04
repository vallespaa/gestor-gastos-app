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
├── features/           # Pantallas y lógica principal (transacciones, resumen, exportar, etc.)
├── shared/             # Componentes reutilizables, hooks, estilos y contexto
├── navigation/         # Navegación de la app
├── App.js              # Punto de entrada principal
└── ...
```

## Tecnologías utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage
- XLSX (para importación/exportación Excel)

## Contribución

¿Quieres contribuir? Haz un fork del repositorio, crea una rama y envía tu pull request.

## Roadmap

Consulta nuestro [Roadmap](./ROADMAP.md) para ver lo que se viene.


## Licencia

MIT
