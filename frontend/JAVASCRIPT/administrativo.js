const API_BASE = "http://localhost:8082";
const cajaMensaje = document.getElementById("mensaje");

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

// --- ALUMNOS ---
function limpiarAlumnoForm() {
  document.getElementById("adm-alumno-id").value = "";
  document.getElementById("adm-alumno-usuario-id").value = "";
  document.getElementById("form-admin-alumno").reset();
}

function modificarAlumno(a) {
  ocultarMensaje();
  document.getElementById("adm-alumno-id").value = a.id ?? "";
  document.getElementById("adm-alumno-usuario-id").value = a.usuario?.id ?? "";
  document.getElementById("adm-alumno-matricula").value = a.matricula ?? "";
  document.getElementById("adm-alumno-nombre").value = a.nombre ?? "";
  document.getElementById("adm-alumno-apellido").value = a.apellido ?? "";
  document.getElementById("adm-alumno-carrera").value = a.carrera ?? "";
  document.getElementById("adm-alumno-semestre").value = a.semestre ?? "";
  document.getElementById("adm-alumno-matricula").focus();
}

async function cargarAdminAlumnos() {
  const tbody = document.getElementById("tabla-admin-alumnos");
  try {
    const resp = await fetch(`${API_BASE}/alumnos`);
    if (!resp.ok) return;
    const lista = await resp.json();
    tbody.innerHTML = "";
    if (!Array.isArray(lista) || lista.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="centrado">Sin alumnos registrados.</td></tr>';
      return;
    }
    lista.forEach((a) => {
      const tr = document.createElement("tr");
      tr.appendChild(crearCelda(a.id));
      tr.appendChild(crearCelda(a.matricula));
      tr.appendChild(crearCelda(a.nombre));
      tr.appendChild(crearCelda(a.apellido));
      tr.appendChild(crearCelda(a.carrera));
      tr.appendChild(crearCelda(a.semestre));

      const tdAcc = document.createElement("td");
      tdAcc.className = "acciones";

      const btnMod = document.createElement("button");
      btnMod.type = "button";
      btnMod.textContent = "Modificar";
      btnMod.addEventListener("click", () => modificarAlumno(a));

      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.className = "peligro";
      btnDel.textContent = "Eliminar";
      btnDel.addEventListener("click", async () => {
        if (!window.confirm(`¿Eliminar alumno #${a.id}?`)) return;
        ocultarMensaje();
        try {
          const delResp = await fetch(`${API_BASE}/alumnos/${encodeURIComponent(a.id)}`, {
            method: "DELETE"
          });
          if (!delResp.ok) {
            mostrarMensaje(`No se pudo eliminar el alumno (HTTP ${delResp.status}).`, "error");
            return;
          }
          if (document.getElementById("adm-alumno-id").value === String(a.id)) {
            limpiarAlumnoForm();
          }
          await cargarAdminAlumnos();
          mostrarMensaje(`Alumno #${a.id} eliminado.`, "exito");
        } catch {
          mostrarMensaje("No se pudo conectar con el servidor para eliminar.", "error");
        }
      });

      tdAcc.appendChild(btnMod);
      tdAcc.appendChild(btnDel);
      tr.appendChild(tdAcc);
      tbody.appendChild(tr);
    });
  } catch {
    // Sin error de red al cargar si el backend no responde.
  }
}

document.getElementById("form-admin-alumno").addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarMensaje();
  const id = document.getElementById("adm-alumno-id").value.trim();
  const usuarioId = document.getElementById("adm-alumno-usuario-id").value.trim();

  const payload = {
    matricula: document.getElementById("adm-alumno-matricula").value.trim(),
    nombre: document.getElementById("adm-alumno-nombre").value.trim(),
    apellido: document.getElementById("adm-alumno-apellido").value.trim(),
    carrera: document.getElementById("adm-alumno-carrera").value.trim(),
    semestre: Number(document.getElementById("adm-alumno-semestre").value)
  };

  const numUsuarioId = Number(usuarioId);
  if (usuarioId && Number.isInteger(numUsuarioId) && numUsuarioId > 0) {
    payload.usuario = { id: numUsuarioId };
  }

  try {
    const resp = await fetch(id ? `${API_BASE}/alumnos/${encodeURIComponent(id)}` : `${API_BASE}/alumnos`, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      mostrarMensaje(`No se pudo guardar el alumno (HTTP ${resp.status}).`, "error");
      return;
    }
    limpiarAlumnoForm();
    await cargarAdminAlumnos();
    mostrarMensaje(id ? "Alumno actualizado." : "Alumno registrado.", "exito");
  } catch {
    mostrarMensaje("No se pudo conectar con el servidor para guardar el alumno.", "error");
  }
});

// --- MAESTROS ---
function limpiarMaestroForm() {
  document.getElementById("adm-maestro-id").value = "";
  document.getElementById("adm-maestro-usuario-id").value = "";
  document.getElementById("form-admin-maestro").reset();
}

function modificarMaestro(m) {
  ocultarMensaje();
  document.getElementById("adm-maestro-id").value = m.id ?? "";
  document.getElementById("adm-maestro-usuario-id").value = m.usuario?.id ?? "";
  document.getElementById("adm-maestro-emp").value = m.numeroEmpleado ?? "";
  document.getElementById("adm-maestro-nombre").value = m.nombre ?? "";
  document.getElementById("adm-maestro-apellido").value = m.apellido ?? "";
  document.getElementById("adm-maestro-esp").value = m.especialidad ?? "";
  document.getElementById("adm-maestro-emp").focus();
}

async function cargarAdminMaestros() {
  const tbody = document.getElementById("tabla-admin-maestros");
  try {
    const resp = await fetch(`${API_BASE}/maestros`);
    if (!resp.ok) return;
    const lista = await resp.json();
    tbody.innerHTML = "";
    if (!Array.isArray(lista) || lista.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="centrado">Sin maestros registrados.</td></tr>';
      return;
    }
    lista.forEach((m) => {
      const tr = document.createElement("tr");
      tr.appendChild(crearCelda(m.id));
      tr.appendChild(crearCelda(m.numeroEmpleado));
      tr.appendChild(crearCelda(m.nombre));
      tr.appendChild(crearCelda(m.apellido));
      tr.appendChild(crearCelda(m.especialidad ?? "—"));

      const tdAcc = document.createElement("td");
      tdAcc.className = "acciones";

      const btnMod = document.createElement("button");
      btnMod.type = "button";
      btnMod.textContent = "Modificar";
      btnMod.addEventListener("click", () => modificarMaestro(m));

      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.className = "peligro";
      btnDel.textContent = "Eliminar";
      btnDel.addEventListener("click", async () => {
        if (!window.confirm(`¿Eliminar maestro #${m.id}?`)) return;
        ocultarMensaje();
        try {
          const delResp = await fetch(`${API_BASE}/maestros/${encodeURIComponent(m.id)}`, {
            method: "DELETE"
          });
          if (!delResp.ok) {
            mostrarMensaje(`No se pudo eliminar el maestro (HTTP ${delResp.status}).`, "error");
            return;
          }
          if (document.getElementById("adm-maestro-id").value === String(m.id)) {
            limpiarMaestroForm();
          }
          await cargarAdminMaestros();
          mostrarMensaje(`Maestro #${m.id} eliminado.`, "exito");
        } catch {
          mostrarMensaje("No se pudo conectar con el servidor para eliminar.", "error");
        }
      });

      tdAcc.appendChild(btnMod);
      tdAcc.appendChild(btnDel);
      tr.appendChild(tdAcc);
      tbody.appendChild(tr);
    });
  } catch {
    // Sin error de red al cargar si el backend no responde.
  }
}

document.getElementById("form-admin-maestro").addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarMensaje();
  const id = document.getElementById("adm-maestro-id").value.trim();
  const usuarioId = document.getElementById("adm-maestro-usuario-id").value.trim();

  const payload = {
    numeroEmpleado: document.getElementById("adm-maestro-emp").value.trim(),
    nombre: document.getElementById("adm-maestro-nombre").value.trim(),
    apellido: document.getElementById("adm-maestro-apellido").value.trim(),
    especialidad: document.getElementById("adm-maestro-esp").value.trim()
  };

  const numUsuarioId = Number(usuarioId);
  if (usuarioId && Number.isInteger(numUsuarioId) && numUsuarioId > 0) {
    payload.usuario = { id: numUsuarioId };
  }

  try {
    const resp = await fetch(id ? `${API_BASE}/maestros/${encodeURIComponent(id)}` : `${API_BASE}/maestros`, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      mostrarMensaje(`No se pudo guardar el maestro (HTTP ${resp.status}).`, "error");
      return;
    }
    limpiarMaestroForm();
    await cargarAdminMaestros();
    mostrarMensaje(id ? "Maestro actualizado." : "Maestro registrado.", "exito");
  } catch {
    mostrarMensaje("No se pudo conectar con el servidor para guardar el maestro.", "error");
  }
});

// --- MATERIAS ---
function limpiarMateriaForm() {
  document.getElementById("adm-materia-id").value = "";
  document.getElementById("form-admin-materia").reset();
}

function modificarMateria(mat) {
  ocultarMensaje();
  document.getElementById("adm-materia-id").value = mat.id ?? "";
  document.getElementById("adm-materia-nombre").value = mat.nombre ?? "";
  document.getElementById("adm-materia-carrera").value = mat.carrera ?? "";
  document.getElementById("adm-materia-creditos").value = mat.creditos ?? "";
  document.getElementById("adm-materia-maestro-id").value = mat.maestro?.id ?? "";
  document.getElementById("adm-materia-nombre").focus();
}

async function cargarAdminMaterias() {
  const tbody = document.getElementById("tabla-admin-materias");
  try {
    const resp = await fetch(`${API_BASE}/materias`);
    if (!resp.ok) return;
    const lista = await resp.json();
    tbody.innerHTML = "";
    if (!Array.isArray(lista) || lista.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="centrado">Sin materias registradas.</td></tr>';
      return;
    }
    lista.forEach((mat) => {
      const tr = document.createElement("tr");
      tr.appendChild(crearCelda(mat.id));
      tr.appendChild(crearCelda(mat.nombre));
      tr.appendChild(crearCelda(mat.carrera));
      tr.appendChild(crearCelda(mat.creditos));
      const nombreMaestro = mat.maestro
        ? `${mat.maestro.nombre ?? ""} ${mat.maestro.apellido ?? ""}`.trim()
        : "Sin asignar";
      tr.appendChild(crearCelda(nombreMaestro));

      const tdAcc = document.createElement("td");
      tdAcc.className = "acciones";

      const btnMod = document.createElement("button");
      btnMod.type = "button";
      btnMod.textContent = "Modificar";
      btnMod.addEventListener("click", () => modificarMateria(mat));

      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.className = "peligro";
      btnDel.textContent = "Eliminar";
      btnDel.addEventListener("click", async () => {
        if (!window.confirm(`¿Eliminar materia #${mat.id}?`)) return;
        ocultarMensaje();
        try {
          const delResp = await fetch(`${API_BASE}/materias/${encodeURIComponent(mat.id)}`, {
            method: "DELETE"
          });
          if (!delResp.ok) {
            mostrarMensaje(`No se pudo eliminar la materia (HTTP ${delResp.status}).`, "error");
            return;
          }
          if (document.getElementById("adm-materia-id").value === String(mat.id)) {
            limpiarMateriaForm();
          }
          await cargarAdminMaterias();
          mostrarMensaje(`Materia #${mat.id} eliminada.`, "exito");
        } catch {
          mostrarMensaje("No se pudo conectar con el servidor para eliminar.", "error");
        }
      });

      tdAcc.appendChild(btnMod);
      tdAcc.appendChild(btnDel);
      tr.appendChild(tdAcc);
      tbody.appendChild(tr);
    });
  } catch {
    // Sin error de red al cargar si el backend no responde.
  }
}

document.getElementById("form-admin-materia").addEventListener("submit", async (e) => {
  e.preventDefault();
  ocultarMensaje();
  const id = document.getElementById("adm-materia-id").value.trim();
  const maestroId = document.getElementById("adm-materia-maestro-id").value.trim();

  const payload = {
    nombre: document.getElementById("adm-materia-nombre").value.trim(),
    carrera: document.getElementById("adm-materia-carrera").value.trim(),
    creditos: Number(document.getElementById("adm-materia-creditos").value),
    maestro: maestroId ? { id: Number(maestroId) } : null
  };

  try {
    const resp = await fetch(id ? `${API_BASE}/materias/${encodeURIComponent(id)}` : `${API_BASE}/materias`, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      mostrarMensaje(`No se pudo guardar la materia (HTTP ${resp.status}).`, "error");
      return;
    }
    limpiarMateriaForm();
    await cargarAdminMaterias();
    mostrarMensaje(id ? "Materia actualizada." : "Materia guardada.", "exito");
  } catch {
    mostrarMensaje("No se pudo conectar con el servidor para guardar la materia.", "error");
  }
});

// --- INSCRIPCIONES (CALIFICACIONES) ---
function limpiarInscripcionForm() {
  document.getElementById("form-admin-inscripcion").reset();
}

async function cargarAdminInscripciones() {
  const tbody = document.getElementById("tabla-admin-inscripciones");
  if (!tbody) return;
  try {
    const resp = await fetch(`${API_BASE}/calificaciones`);
    if (!resp.ok) return;
    const lista = await resp.json();
    tbody.innerHTML = "";
    if (!Array.isArray(lista) || lista.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="centrado">Sin inscripciones registradas.</td></tr>';
      return;
    }
    lista.forEach((item) => {
      const tr = document.createElement("tr");
      const nombreAlumno = item.alumno
        ? `${item.alumno.nombre ?? ""} ${item.alumno.apellido ?? ""}`.trim()
        : "";
      tr.appendChild(crearCelda(item.id));
      tr.appendChild(crearCelda(nombreAlumno));
      tr.appendChild(crearCelda(item.alumno?.matricula ?? ""));
      tr.appendChild(crearCelda(item.materia?.nombre ?? ""));
      tr.appendChild(crearCelda(item.calificacion ?? 0));

      const tdAcc = document.createElement("td");
      tdAcc.className = "acciones";

      const btnDel = document.createElement("button");
      btnDel.type = "button";
      btnDel.className = "peligro";
      btnDel.textContent = "Quitar";
      btnDel.addEventListener("click", async () => {
        if (!window.confirm(`¿Quitar inscripción #${item.id}?`)) return;
        ocultarMensaje();
        try {
          const delResp = await fetch(`${API_BASE}/calificaciones/${encodeURIComponent(item.id)}`, {
            method: "DELETE"
          });
          if (!delResp.ok) {
            mostrarMensaje(`No se pudo quitar la inscripción (HTTP ${delResp.status}).`, "error");
            return;
          }
          await cargarAdminInscripciones();
          mostrarMensaje(`Inscripción #${item.id} eliminada.`, "exito");
        } catch {
          mostrarMensaje("No se pudo conectar con el servidor para eliminar la inscripción.", "error");
        }
      });

      tdAcc.appendChild(btnDel);
      tr.appendChild(tdAcc);
      tbody.appendChild(tr);
    });
  } catch {
    // Sin error de red al cargar si el backend no responde.
  }
}

const formInscripcion = document.getElementById("form-admin-inscripcion");
if (formInscripcion) {
  formInscripcion.addEventListener("submit", async (e) => {
    e.preventDefault();
    ocultarMensaje();

    const alumnoId = Number(document.getElementById("adm-insc-alumno-id").value);
    const materiaId = Number(document.getElementById("adm-insc-materia-id").value);
    const califRaw = document.getElementById("adm-insc-calificacion").value.trim();

    const payload = {
      alumno: { id: alumnoId },
      materia: { id: materiaId }
    };
    if (califRaw !== "") {
      payload.calificacion = Number(califRaw);
    }

    try {
      const resp = await fetch(`${API_BASE}/calificaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) {
        mostrarMensaje(`No se pudo inscribir al alumno (HTTP ${resp.status}).`, "error");
        return;
      }
      limpiarInscripcionForm();
      await cargarAdminInscripciones();
      mostrarMensaje("Alumno inscrito en la materia.", "exito");
    } catch {
      mostrarMensaje("No se pudo conectar con el servidor para inscribir al alumno.", "error");
    }
  });
}

const btnLimpiarInscripcion = document.getElementById("btn-limpiar-inscripcion");
if (btnLimpiarInscripcion) {
  btnLimpiarInscripcion.addEventListener("click", () => {
    limpiarInscripcionForm();
    ocultarMensaje();
  });
}

document.getElementById("btn-limpiar-alumno").addEventListener("click", () => {
  limpiarAlumnoForm();
  ocultarMensaje();
});
document.getElementById("btn-limpiar-maestro").addEventListener("click", () => {
  limpiarMaestroForm();
  ocultarMensaje();
});
document.getElementById("btn-limpiar-materia").addEventListener("click", () => {
  limpiarMateriaForm();
  ocultarMensaje();
});
document.getElementById("btn-menu").addEventListener("click", () => {
  window.location.href = "./index.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    cargarAdminAlumnos(),
    cargarAdminMaestros(),
    cargarAdminMaterias(),
    cargarAdminInscripciones()
  ]);
});