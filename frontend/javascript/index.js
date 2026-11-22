function entrarComo(rol) {
  sessionStorage.setItem("sesionEscolar", JSON.stringify({ rol }));

  if (rol === "ESTUDIANTE") {
    window.location.href = "frontend/html/alumno.html";
  } else if (rol === "MAESTRO") {
    window.location.href = "frontend/html/maestro.html";
  } else if (rol === "ADMINISTRATIVO") {
    window.location.href = "frontend/html/administrativo.html";
  }
}

document.querySelectorAll("[data-rol]").forEach((btn) => {
  btn.addEventListener("click", () => {
    entrarComo(btn.getAttribute("data-rol"));
  });
});
