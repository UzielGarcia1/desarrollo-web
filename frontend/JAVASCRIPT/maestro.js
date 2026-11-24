const API_BASE = "http://localhost:8082";

const cajaMensaje = document.getElementById("mensaje");
const tablaDatosMaestro = document.getElementById("tabla-datos-maestro");
const tablaMaterias = document.getElementById("tabla-materias-maestro");
const tablaInscritos = document.getElementById("tabla-inscritos-materia");
const panelModificar = document.getElementById("panel-modificar-calificacion");
const formCalif = document.getElementById("form-calificacion");

let maestroActual = null;
let materiaSeleccionadaId = null;

function mostrarMensaje(texto, tipo = "exito") {
  cajaMensaje.textContent = texto;
  cajaMensaje.className = `mensaje ${tipo}`;
}

function ocultarMensaje() {
  cajaMensaje.textContent = "";
  cajaMensaje.className = "mensaje oculto";
}

function crearCelda(valor) {
  const td = document.createElement("td");
  td.textContent = valor ?? "";
  return td;
}

function cerrarPanelCalificacion() {
  document.getElementById("calif-id").value = "";
  document.getElementById("calif-alumno-id").value = "";
  document.getElementById("calif-materia-id").value = "";
  formCalif.reset();
  panelModificar.classList.add("oculto");
}

function abrirPanelCalificacion(reg) {
  document.getElementById("calif-id").value = reg.id ?? "";
  document.getElementById("calif-alumno-id").value = reg.alumno?.id ?? "";
  document.getElementById("calif-materia-id").value = reg.materia?.id ?? "";

  const nombreAlumno = `${reg.alumno?.nombre ?? ""} ${reg.alumno?.apellido ?? ""}`.trim();
  document.getElementById("calif-alumno-info").value =
    reg.alumno?.matricula ? `${nombreAlumno} (${reg.alumno.matricula})` : nombreAlumno;
  document.getElementById("calif-materia-info").value = reg.materia?.nombre ?? "";
  document.getElementById("calif-valor").value = reg.calificacion ?? 0;

  panelModificar.classList.remove("oculto");
  document.getElementById("calif-valor").focus();
}

function renderizarDatosMaestro(maestro) {
  tablaDatosMaestro.innerHTML = "";
  if (!maestro) {
    tablaDatosMaestro.innerHTML =
      '<tr><td colspan="4" class="centrado">Sin información disponible.</td></tr>';
    return;
  }

  const tr = document.createElement("tr");
  tr.appendChild(crearCelda(maestro.numeroEmpleado));
  tr.appendChild(crearCelda(maestro.nombre));
  tr.appendChild(crearCelda(maestro.apellido));
  tr.appendChild(crearCelda(maestro.especialidad ?? "—"));
  tablaDatosMaestro.appendChild(tr);
}

function renderizarMaterias(materias) {
  tablaMaterias.innerHTML = "";
  const lista = Array.isArray(materias) ? materias : [];

  if (lista.length === 0) {
    tablaMaterias.innerHTML =
      '<tr><td colspan="5" class="centrado">Sin materias registradas.</td></tr>';
    return;
  }

  lista.forEach((mat) => {
    const tr = document.createElement("tr");
    tr.appendChild(crearCelda(mat.id));
    tr.appendChild(crearCelda(mat.nombre));
    tr.appendChild(crearCelda(mat.carrera));
    tr.appendChild(crearCelda(mat.creditos));

    const tdAcc = document.createElement("td");
    const btnSeleccionar = document.createElement("button");
    btnSeleccionar.type = "button";
    btnSeleccionar.textContent = "Seleccionar";
    btnSeleccionar.addEventListener("click", () => cargarInscritosMateria(mat.id));

    tdAcc.appendChild(btnSeleccionar);
    tr.appendChild(tdAcc);
    tablaMaterias.appendChild(tr);
  });
}

function renderizarInscritos(registros) {
  tablaInscritos.innerHTML = "";
  const lista = Array.isArray(registros) ? registros : [];

  if (lista.length === 0) {
    tablaInscritos.innerHTML =
      '<tr><td colspan="6" class="centrado">No hay alumnos inscritos en esta materia.</td></tr>';
    return;
  }

  lista.forEach((reg) => {
    const tr = document.createElement("tr");
    const nombreCompleto = `${reg.alumno?.nombre ?? ""} ${reg.alumno?.apellido ?? ""}`.trim();

    tr.appendChild(crearCelda(reg.id));
    tr.appendChild(crearCelda(reg.alumno?.matricula ?? "—"));
    tr.appendChild(crearCelda(nombreCompleto || "—"));
    tr.appendChild(crearCelda(reg.alumno?.carrera ?? "—"));
    tr.appendChild(crearCelda(reg.calificacion));

    const tdAcc = document.createElement("td");
    const btnModificar = document.createElement("button");
    btnModificar.type = "button";
    btnModificar.textContent = "Modificar";
    btnModificar.addEventListener("click", () => abrirPanelCalificacion(reg));

    tdAcc.appendChild(btnModificar);
    tr.appendChild(tdAcc);
    tablaInscritos.appendChild(tr);
  });
}

async function cargarInscritosMateria(materiaId) {
  ocultarMensaje();
  cerrarPanelCalificacion();
  materiaSeleccionadaId = materiaId;

  try {
    const resp = await fetch(`${API_BASE}/materias/${encodeURIComponent(materiaId)}/calificaciones`);
    if (!resp.ok) {
      mostrarMensaje(`No se pudieron cargar los alumnos inscritos (HTTP ${resp.status}).`, "error");
      return;
    }
    const registros = await resp.json();
    renderizarInscritos(registros);
  } catch {
    mostrarMensaje("No se pudo conectar con el servidor para consultar los alumnos.", "error");
  }
}

async function cargarPortalMaestro() {
  try {
    const respMaestros = await fetch(`${API_BASE}/maestros`);
    if (!respMaestros.ok) return;

    const maestros = await respMaestros.json();
    if (!Array.isArray(maestros) || maestros.length === 0) return;

    maestroActual = maestros[0];
    renderizarDatosMaestro(maestroActual);

    try {
      const respMaterias = await fetch(`${API_BASE}/maestros/${encodeURIComponent(maestroActual.id)}/materias`);
      if (respMaterias.ok) {
        const materias = await respMaterias.json();
        renderizarMaterias(materias);
      }
    } catch {
      // Sin error de red al cargar si el backend no responde.
    }
  } catch {
    // Sin error de red al cargar si el backend no responde.
  }
}

async function guardarCalificacion(e) {
  e.preventDefault();
  ocultarMensaje();

  const id = document.getElementById("calif-id").value.trim();
  const alumnoId = document.getElementById("calif-alumno-id").value.trim();
  const materiaId = document.getElementById("calif-materia-id").value.trim();
  const valorCalificacion = Number(document.getElementById("calif-valor").value);

  if (!id || !alumnoId || !materiaId) {
    mostrarMensaje("Selecciona un alumno de la materia para modificar su calificación.", "error");
    return;
  }

  const payload = {
    id: Number(id),
    alumno: { id: Number(alumnoId) },
    materia: { id: Number(materiaId) },
    calificacion: valorCalificacion
  };

  try {
    const resp = await fetch(`${API_BASE}/calificaciones/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      mostrarMensaje(`No se pudo guardar la calificación (HTTP ${resp.status}).`, "error");
      return;
    }

    await resp.json();
    cerrarPanelCalificacion();
    if (materiaSeleccionadaId) {
      await cargarInscritosMateria(materiaSeleccionadaId);
    }
    mostrarMensaje("Calificación actualizada correctamente.", "exito");
  } catch {
    mostrarMensaje("No se pudo conectar con el servidor para guardar la calificación.", "error");
  }
}

formCalif.addEventListener("submit", guardarCalificacion);
document.getElementById("btn-cancelar-calif").addEventListener("click", () => {
  cerrarPanelCalificacion();
  ocultarMensaje();
});
document.getElementById("btn-menu").addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.addEventListener("DOMContentLoaded", cargarPortalMaestro);