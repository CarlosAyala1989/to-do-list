# Gestor de Tareas Simplificado

Proyecto web simple que implementa dos requerimientos:

- `R1`: Agregar tarea con validación de título obligatorio y estado inicial `Pendiente`.
- `R2`: Completar tarea para cambiar estado a `Completada` y moverla a su sección.

## Ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Levantar la página:

```bash
npm run start
```

3. Abrir en navegador:

```text
http://127.0.0.1:3000
```

## Casos de prueba diseñados

- `CP-01 (R1)`: Ingresar tarea `Comprar leche`.
	- Resultado esperado: se crea y queda en estado `Pendiente`.

- `CP-02 (R2)`: Marcar `Comprar leche` como completada.
	- Resultado esperado: cambia a `Completada` y desaparece de pendientes.

## Pruebas unitarias

### Automatizadas (Jest)

```bash
npm run test:unit
```

Qué validan:

- `crearTarea("Comprar leche")` devuelve tarea con estado `Pendiente`.
- `crearTarea("")` arroja error `El título es obligatorio`.
- `cambiarEstado(id, "Completada")` retorna `true` y actualiza el estado.

### Manuales (simuladas por consola)

Opción A: consola del navegador (con la app abierta):

```js
crearTarea("")
```

Debe mostrar error: `El título es obligatorio`.

```js
crearTarea("Comprar leche")
listarTareas()
cambiarEstado(1, "Completada")
listarTareas()
```

Debes ver que el estado de la tarea pasa a `Completada`.

Opción B: terminal Node:

```bash
node -e "const t=require('./src/todo');try{t.crearTarea('')}catch(e){console.log(e.message)}"
```

## Pruebas de integración

### Automatizadas (Playwright)

Si es la primera vez, instala navegador de pruebas:

```bash
npm run install:browsers
```

Ejecutar pruebas:

```bash
npm run test:integration
```

Qué validan:

- Flujo UI de agregar `Comprar leche` y verificar en lista de pendientes.
- Flujo UI de completar la tarea y verificar movimiento a lista de completadas.

### Manuales

1. Abrir la app en el navegador.
2. Escribir `Comprar leche` en el formulario y hacer clic en `Guardar`.
3. Confirmar que aparece en `Pendientes`.
4. Hacer clic en `Check` para completar la tarea.
5. Confirmar que desaparece de `Pendientes` y aparece en `Completadas`.

## Reporte de resultados

El reporte en formato Markdown está en:

- `REPORTE-RESULTADOS.md`