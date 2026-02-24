# PrivScore

## Introducción

PrivScore es una plataforma web y extensión de navegador que actúa como un "NutriScore" para las políticas de privacidad de aplicaciones y servicios web. El proyecto democratiza el acceso a la información sobre privacidad digital, traduciendo textos legales densos y complejos en indicadores visuales comprensibles (A-E) y resúmenes en lenguaje claro para el usuario medio.

Este proyecto se desarrolla como parte de la asignatura Proyectos II y consiste en una aplicación full stack junto con una extensión de navegador Chrome.

## Objetivo

Actualmente, casi nadie lee los términos de servicio y políticas de privacidad porque son largos, confusos y están escritos en lenguaje legal. Sin embargo, aceptarlos implica ceder datos personales y perder control sobre cómo se usan. Las plataformas entienden perfectamente lo que recogen y comparten, mientras el usuario decide "a ciegas" o simplemente no tiene alternativas visibles.

El resultado es un ecosistema de rastreo masivo, cesión a terceros y prácticas poco transparentes que afectan a millones de personas diariamente. **PrivScore** nace para reducir esta asimetría de información y permitir que las personas comparen servicios y tomen decisiones informadas sobre su privacidad sin necesidad de ser expertas en derecho digital.

## Funcionalidades Principales

### Aplicación Web
- **Análisis automático de políticas de privacidad** mediante técnicas de PLN (Procesamiento del Lenguaje Natural)
- **Sistema de calificación A-E** tipo semáforo que resume el "coste en privacidad" de aplicaciones y servicios
- **Comparador de aplicaciones** con vistas tipo tabla para contrastar múltiples servicios
- **Recomendaciones inteligentes** de alternativas con mejor puntuación de privacidad
- **Resúmenes comprensibles** sobre qué datos se recogen, con qué finalidad, si se comparten con terceros, períodos de retención y derechos del usuario

### Extensión de Navegador (Chrome)
- **Análisis rápido de privacidad** de datos y cookies con un solo clic
- **Botón de detalles** que abre una nueva pestaña con la ficha completa de la aplicación analizada en la plataforma web
- **Integración fluida** entre la extensión y la aplicación web para una experiencia de usuario unificada

## Tecnologías Utilizadas

### Frontend
- **React** - Biblioteca principal para la interfaz de usuario

### Backend
- **Node.js**
- **Express**

### Base de Datos
- **MongoDB** - Sistema de gestión de base de datos no relacional

### Extensión de Navegador
- **JavaScript** - Desarrollo de la extensión Chrome
- **Chrome Extension API** - APIs nativas de Chrome

### Control de Versiones
- **Git** - Control de versiones distribuido
- **GitHub** - Repositorio central y colaboración

## Metodología de Trabajo

El proyecto sigue la metodología **Scrum** con las siguientes prácticas:

- **Sprints** de duración definida con objetivos claros
- **Product Backlog** y **Sprint Backlog** gestionados en Trello
- **Reuniones de coordinación** regulares vía Discord
- **Comunicación ágil** a través de Discord (reuniones y trabajo) y WhatsApp (coordinación rápida)

## Estructura del Proyecto

```
PrivScore/
├── extension/      # Código de la extensión de Chrome
├── backend/        # API desarrollada con Node.js + Express
├── frontend/       # Aplicación web con React + Vite
├── LICENSE         # Licencia del proyecto
└── README.md       
```

## Colaboradores

Este proyecto es desarrollado por el **Grupo C4** de Proyectos II:

- Hugo Guarido Domínguez
- José Alejandro Viveros
- Vittorio Perillo
- Mario Martínez Lozano
- Ignacio Pérez de Avilés
- David Abelardo Alfageme
- Miguel Angel Espinosa de los Monteros Osuna