const {
  crearTarea,
  cambiarEstado,
  listarTareas,
  reiniciarTareas
} = require('../../src/todo');

describe('R1 - Agregar tarea', () => {
  beforeEach(() => {
    reiniciarTareas();
  });

  test('CP-01: crearTarea("Comprar leche") se crea con estado Pendiente', () => {
    const tarea = crearTarea('Comprar leche');

    expect(tarea.titulo).toBe('Comprar leche');
    expect(tarea.estado).toBe('Pendiente');

    const tareas = listarTareas();
    expect(tareas).toHaveLength(1);
    expect(tareas[0].estado).toBe('Pendiente');
  });

  test('crearTarea("") lanza error "El título es obligatorio"', () => {
    expect(() => crearTarea('')).toThrow('El título es obligatorio');
  });
});

describe('R2 - Completar tarea', () => {
  beforeEach(() => {
    reiniciarTareas();
  });

  test('CP-02: cambiarEstado(id, "Completada") retorna true y actualiza estado', () => {
    const tarea = crearTarea('Comprar leche');

    const resultado = cambiarEstado(tarea.id, 'Completada');

    expect(resultado).toBe(true);

    const tareas = listarTareas();
    expect(tareas[0].estado).toBe('Completada');
  });
});
