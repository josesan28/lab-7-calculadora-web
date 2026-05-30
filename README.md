# Laboratorio 7 - Calculadora
### Sistemas y Tecnologías Web
### José Manuel Sanchez Hernández
---

Calculadora hecha con React que permite hacer operaciones básicas como sumar, restar, multiplicar, dividir, módulo e igualdad. También permite el uso de decimales y cambio de signo con un botón. Esta tiene una estética brasileña, con los colores que caracterizan a este país.

## Instalación

```bash
git clone <url del repositorio>
cd calculadora-brasil
npm install
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm test` | Ejecuta todos los tests |
| `npm run lint` | Verifica el código con ESLint |
| `npm run storybook` | Abre Storybook en puerto 6006 |
| `npm run build` | Build de producción |

## Decisiones de diseño

- **Hook personalizado**: `useCalculator` tiene toda la lógica de la calculadora
- **Componentes <=20 líneas**: `Display`, `CalcButton`, `Keyboard`, `Calculator`, `App`
- **Sin semicolons**: ESLint configurado con `semi: ['error', 'never']`
- **Máximo 120 caracteres por línea**: regla `max-len` activa

## Operaciones

- Suma (`+`), Resta (`−`), Multiplicación (`×`), División (`÷`)
- Módulo (`%`), Punto decimal (`.`), Cambio de signo (`+/-`)
- Límite de 9 caracteres en pantalla
- Muestra `ERROR` si el resultado es negativo o supera 999,999,999

## Tecnologías

- React 19 + Vite
- Vitest + Testing Library
- Storybook
- ESLint con reglas custom
- CSS Modules

## Requisitos del laboratorio cumplidos

- Calculadora simple con pantalla y teclado numérico hecho con botones de HTML
- Entrada exclusivamente desde los botones, sin teclado físico
- Operaciones de suma, resta, multiplicación, división, módulo e igualdad
- Punto decimal y cambio de signo con `+/-`
- Límite de 9 caracteres en pantalla
- Manejo de `ERROR` para resultados negativos o mayores a `999999999`
- Lógica principal separada en un hook personalizado (`useCalculator`)
- Más de 5 pruebas automatizadas con `npm test`
- Lint configurado con `npm run lint`
- Regla custom para prohibir puntos y coma
- Regla custom para limitar las líneas a 120 caracteres
- Más de 5 historias de Storybook para componentes de la calculadora
- Título y favicon personalizados
