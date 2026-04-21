# Reporte de Resultados de Pruebas

Fecha de ejecución: 2026-04-21

| ID de Prueba | Tipo de Prueba | Método | Descripción | Resultado Esperado | Resultado Obtenido | Estado |
|---|---|---|---|---|---|---|
| PU-Auto-01 | Unitaria | Automatizada | Ejecutar `crearTarea("Comprar leche")` y validar estado inicial. | La tarea se crea con estado `Pendiente`. | La prueba Jest confirmó `estado === "Pendiente"`. | PASÓ |
| PU-Auto-02 | Unitaria | Automatizada | Ejecutar `cambiarEstado(id, "Completada")` sobre tarea existente. | La función retorna `true` y actualiza el estado. | La prueba Jest confirmó retorno `true` y estado `Completada`. | PASÓ |
| PI-Auto-01 | Integración | Automatizada | Simular UI: escribir `Comprar leche` y hacer clic en `Guardar`. | La tarea aparece en la lista de pendientes en pantalla. | Playwright validó que el texto aparece en `Pendientes`. | PASÓ |
| PI-Auto-02 | Integración | Automatizada | Simular UI: hacer clic en `Check` de la tarea pendiente. | La tarea se mueve de `Pendientes` a `Completadas`. | Playwright validó que desaparece de pendientes y aparece en completadas. | PASÓ |

## Nota de validación manual (simulación)

Se ejecutó manualmente en consola la instrucción:

```bash
node -e "const t=require('./src/todo'); try { t.crearTarea(''); } catch (e) { console.log(e.message); }"
```

Resultado observado: `El título es obligatorio`.
