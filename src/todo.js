(function (globalScope, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    globalScope.TodoApp = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var tareas = [];
  var siguienteId = 1;
  var ESTADOS_VALIDOS = ['Pendiente', 'Completada'];

  function normalizarTitulo(titulo) {
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      throw new Error('El título es obligatorio');
    }

    return titulo.trim();
  }

  function crearTarea(titulo) {
    var tituloLimpio = normalizarTitulo(titulo);

    var tarea = {
      id: siguienteId,
      titulo: tituloLimpio,
      estado: 'Pendiente'
    };

    siguienteId += 1;
    tareas.push(tarea);
    return { ...tarea };
  }

  function cambiarEstado(id, nuevoEstado) {
    if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
      return false;
    }

    var idNumerico = Number(id);
    var tarea = tareas.find(function (item) {
      return item.id === idNumerico;
    });

    if (!tarea) {
      return false;
    }

    tarea.estado = nuevoEstado;
    return true;
  }

  function listarTareas() {
    return tareas.map(function (item) {
      return { ...item };
    });
  }

  function obtenerPendientes() {
    return listarTareas().filter(function (item) {
      return item.estado === 'Pendiente';
    });
  }

  function obtenerCompletadas() {
    return listarTareas().filter(function (item) {
      return item.estado === 'Completada';
    });
  }

  function reiniciarTareas() {
    tareas = [];
    siguienteId = 1;
  }

  return {
    crearTarea: crearTarea,
    cambiarEstado: cambiarEstado,
    listarTareas: listarTareas,
    obtenerPendientes: obtenerPendientes,
    obtenerCompletadas: obtenerCompletadas,
    reiniciarTareas: reiniciarTareas
  };
});
