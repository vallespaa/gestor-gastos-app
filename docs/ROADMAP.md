# Roadmap

Este roadmap detalla las tareas pendientes y planeadas para el desarrollo de la app.

---

## 🔜 [0.6.0]

- Corrección de problemas conocidos ([KNOWN_ISSUES.md](./KNOWN_ISSUES.md)):
  - `getTransfersByAccount` no pasa el repositorio al caso de uso
  - Falta `assets/icon.png`, referenciado en `app.config.js`
  - Unificar la versión entre `package.json` y `app.config.js`
  - Mover dependencias de lint y Prettier a `devDependencies`, y declarar `expo-constants` y `@expo/vector-icons`
  - Normalizar `Transaction.amount` a número
- Eliminación del código muerto de importación/exportación Excel
- Mejoras visuales en la pantalla de creación de transacciones:
  - Reorganizar el flujo
  - Mejorar la selección de categorías
  - Integrar un calendario estilizado
  - Añadir soporte de calculadora rápida

---

## [0.7.0]

- Implementación de modal para ajustes de balance: permitiendo su edición y eliminación
- Implementación de modal para transferencias: permitiendo su edición y eliminación
- Filtro de transacciones por tipo
- Tema claro y oscuro

---

## [0.8.0]

- Tests con Jest:
  - Unitarios de entidades y casos de uso, con repositorios en memoria
  - Tests de formularios con React Native Testing Library
- Integración continua con GitHub Actions (lint y tests en cada push)
- Soporte para exportación/importación CSV, en sustitución de Excel

---

## [0.9.0]

- Guardado local con SQLite (`expo-sqlite`):
  - Solo cambia `app/data`, gracias a los repositorios abstractos
  - Migración de los datos existentes en AsyncStorage
- Migración gradual a TypeScript (dominio y aplicación primero, después contextos y UI)
- Internacionalización (español e inglés)

---

## [1.0.0]

- Reescritura del README con capturas, arquitectura e instrucciones
- Icono, splash y recursos gráficos finales
- Política de privacidad
- Publicación en Google Play (pruebas internas, pruebas cerradas y producción)
- Release etiquetada en GitHub con APK adjunto

---

## 💡 Ideas futuras (sin fecha definida)

- Mejoras visuales en la pantalla principal: Cajón ampliable para ver categorías detalladas
- Gráficas mejoradas para categorías (pie chart, etc.)
- Slider para cambio de fechas
- Presupuestos por categoría
- Transacciones recurrentes
- Recordatorios con notificaciones locales

---

## 📌 Notas

- Esta lista puede cambiar a medida que se prueban funcionalidades.
- Las versiones son tentativas y solo representan agrupaciones por prioridad.
- La importación/exportación Excel está descartada por una vulnerabilidad en `xlsx`.
- Las cuentas personales nuevas de Google Play necesitan 12 o más testers durante 14 días en pruebas cerradas antes de pasar a producción.
