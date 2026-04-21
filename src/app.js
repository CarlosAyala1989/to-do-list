(function () {
  'use strict';

  var form = document.getElementById('task-form');
  var taskInput = document.getElementById('task-title');
  var pendingList = document.getElementById('pending-list');
  var completedList = document.getElementById('completed-list');
  var errorMessage = document.getElementById('error-message');

  function crearItemPendiente(tarea) {
    var li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.testid = 'pending-task-' + tarea.id;

    var texto = document.createElement('span');
    texto.textContent = tarea.titulo;

    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'complete-btn';
    boton.dataset.id = String(tarea.id);
    boton.dataset.testid = 'complete-task-' + tarea.id;
    boton.setAttribute('aria-label', 'Completar ' + tarea.titulo);
    boton.textContent = 'Check';

    li.append(texto, boton);
    return li;
  }

  function crearItemCompletado(tarea) {
    var li = document.createElement('li');
    li.className = 'task-item done';
    li.dataset.testid = 'completed-task-' + tarea.id;
    li.textContent = tarea.titulo;
    return li;
  }

  function crearLeyendaVacia(texto) {
    var li = document.createElement('li');
    li.className = 'empty';
    li.textContent = texto;
    return li;
  }

  function renderizar() {
    var pendientes = TodoApp.obtenerPendientes();
    var completadas = TodoApp.obtenerCompletadas();

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    if (pendientes.length === 0) {
      pendingList.appendChild(crearLeyendaVacia('No hay tareas pendientes.'));
    } else {
      pendientes.forEach(function (tarea) {
        pendingList.appendChild(crearItemPendiente(tarea));
      });
    }

    if (completadas.length === 0) {
      completedList.appendChild(crearLeyendaVacia('No hay tareas completadas.'));
    } else {
      completadas.forEach(function (tarea) {
        completedList.appendChild(crearItemCompletado(tarea));
      });
    }
  }

  function limpiarError() {
    errorMessage.textContent = '';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    try {
      TodoApp.crearTarea(taskInput.value);
      taskInput.value = '';
      limpiarError();
      renderizar();
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });

  pendingList.addEventListener('click', function (event) {
    var boton = event.target.closest('.complete-btn');
    if (!boton) {
      return;
    }

    var id = Number(boton.dataset.id);
    var actualizado = TodoApp.cambiarEstado(id, 'Completada');
    if (actualizado) {
      renderizar();
    }
  });

  // Atajos para simular pruebas manuales desde la consola del navegador.
  window.crearTarea = TodoApp.crearTarea;
  window.cambiarEstado = TodoApp.cambiarEstado;
  window.listarTareas = TodoApp.listarTareas;

  renderizar();
})();
