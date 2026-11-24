const API_ALUMNOS = "http://localhost:8082/alumnos";

const cajaMensaje = document.getElementById("mensaje");
const selectorAlumno = document.getElementById("selector-alumno");
const tablaDatosAlumno = document.getElementById("tabla-datos-alumno");
const tablaCalificaciones = document.getElementById("tabla-calificaciones");
const celdaPromedio = document.getElementById("promedio-calificaciones");
const formDatos = document.getElementById("form-datos-personales");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");

let listaAlumnos = [];
let alumnoActual = null;

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

function renderizarDatosAlumno(alumno, calificaciones) {
  tablaDatosAlumno.innerHTML = "";

  if (!alumno) {
    tablaDatosAlumno.innerHTML =
      '<tr><td colspan="5" class="centrado">Sin información disponible.</td></tr>';
    return;
  }

  const nombreCompleto = `${alumno.nombre ?? ""} ${alumno.apellido ?? ""}`.trim();
  const materiasLista = Array.isArray(calificaciones)
    ? calificaciones.map((c) => c.materia?.nombre).filter(Boolean)
    : [];
  const materiasTexto = materiasLista.length > 0 ? materiasLista.join(", ") : "Sin materias asignadas";

  const tr = document.createElement("tr");
  tr.appendChild(crearCelda(nombreCompleto));
  tr.appendChild(crearCelda(alumno.matricula));
  tr.appendChild(crearCelda(alumno.carrera));
  tr.appendChild(crearCelda(alumno.semestre));
  tr.appendChild(crearCelda(materiasTexto));
  tablaDatosAlumno.appendChild(tr);

  inputNombre.value = alumno.nombre ?? "";
  inputApellido.value = alumno.apellido ?? "";
}

function renderizarCalificaciones(calificaciones) {
  tablaCalificaciones.innerHTML = "";
  const lista = Array.isArray(calificaciones) ? calificaciones : [];

  if (lista.length === 0) {
    tablaCalificaciones.innerHTML =
      '<tr><td colspan="2" class="centrado">Sin calificaciones registradas.</td></tr>';
    celdaPromedio.textContent = "—";
    return;
  }

  let suma = 0;
  let contador = 0;

  lista.forEach((item) => {
    const tr = document.createElement("tr");
    tr.appendChild(crearCelda(item.materia?.nombre ?? "—"));
    tr.appendChild(crearCelda(item.calificacion));
    tablaCalificaciones.appendChild(tr);

    const valor = Number(item.calificacion);
    if (!Number.isNaN(valor)) {
      suma += valor;
      contador += 1;
    }
  });

  celdaPromedio.textContent = contador > 0 ? (suma / contador).toFixed(2) : "—";
}

function poblarSelectorAlumnos(alumnos, idSeleccionado = null) {
  if (!selectorAlumno) return;
  selectorAlumno.innerHTML = "";

  if (!Array.isArray(alumnos) || alumnos.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "Sin alumnos registrados";
    selectorAlumno.appendChild(opt);
    return;
  }

  alumnos.forEach((a) => {
    const opt = document.createElement("option");
    opt.value = String(a.id);
    const nombre = `${a.nombre ?? ""} ${a.apellido ?? ""}`.trim();
    opt.textContent = `${nombre || "Alumno"} (${a.matricula ?? `ID ${a.id}`})`;
    selectorAlumno.appendChild(opt);
  });

  if (idSeleccionado && alumnos.some((a) => String(a.id) === String(idSeleccionado))) {
    selectorAlumno.value = String(idSeleccionado);
  } else {
    selectorAlumno.value = String(alumnos[0].id);
  }
}

async function cargarDetalleAlumnoPorId(alumnoId) {
  const encontrado = listaAlumnos.find((a) => String(a.id) === String(alumnoId));
  if (!encontrado) {
    alumnoActual = null;
    renderizarDatosAlumno(null, []);
    renderizarCalificaciones([]);
    return;
  }

  alumnoActual = encontrado;

  let calificaciones = [];
  try {
    const respCalif = await fetch(`${API_ALUMNOS}/${encodeURIComponent(alumnoActual.id)}/calificaciones`);
    if (respCalif.ok) {
      calificaciones = await respCalif.json();
    }
  } catch {
    calificaciones = [];
  }

  renderizarDatosAlumno(alumnoActual, calificaciones);
  renderizarCalificaciones(calificaciones);
}

async function cargarPortalAlumno(idPreferido = null) {
  try {
    const respAlumnos = await fetch(API_ALUMNOS);
    if (!respAlumnos.ok) return;

    const alumnos = await respAlumnos.json();
    if (!Array.isArray(alumnos) || alumnos.length === 0) {
      listaAlumnos = [];
      alumnoActual = null;
      poblarSelectorAlumnos([]);
      renderizarDatosAlumno(null, []);
      renderizarCalificaciones([]);
      return;
    }

    listaAlumnos = alumnos;
    const idAUsar = idPreferido ?? alumnoActual?.id ?? alumnos[0].id;
    poblarSelectorAlumnos(listaAlumnos, idAUsar);
    await cargarDetalleAlumnoPorId(selectorAlumno ? selectorAlumno.value : idAUsar);
  } catch {
    // Si no hay conexión con el backend, se mantienen los valores vacíos sin mostrar error de red.
  }
}

async function modificarDatosPersonales(e) {
  e.preventDefault();
  ocultarMensaje();

  if (!alumnoActual || !alumnoActual.id) {
    mostrarMensaje("No hay un alumno cargado para modificar.", "error");
    return;
  }

  const payload = {
    id: alumnoActual.id,
    usuario: alumnoActual.usuario ?? null,
    matricula: alumnoActual.matricula,
    nombre: inputNombre.value.trim(),
    apellido: inputApellido.value.trim(),
    carrera: alumnoActual.carrera,
    semestre: alumnoActual.semestre
  };

  try {
    const resp = await fetch(`${API_ALUMNOS}/${encodeURIComponent(alumnoActual.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      mostrarMensaje(`No se pudieron actualizar los datos (HTTP ${resp.status}).`, "error");
      return;
    }

    const actualizado = await resp.json();
    await cargarPortalAlumno(actualizado.id ?? alumnoActual.id);
    mostrarMensaje("Datos personales actualizados correctamente.", "exito");
  } catch {
    mostrarMensaje("No se pudo conectar con el servidor para guardar los cambios.", "error");
  }
}

if (selectorAlumno) {
  selectorAlumno.addEventListener("change", async () => {
    ocultarMensaje();
    await cargarDetalleAlumnoPorId(selectorAlumno.value);
  });
}

formDatos.addEventListener("submit", modificarDatosPersonales);

document.getElementById("btn-menu").addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.addEventListener("DOMContentLoaded", () => cargarPortalAlumno());