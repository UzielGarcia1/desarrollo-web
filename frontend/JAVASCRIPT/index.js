function entrarComo(rol) {
  sessionStorage.setItem("sesionEscolar", JSON.stringify({ rol }));

  if (rol === "ESTUDIANTE") {
      window.location.href = "./alumno.html";
  } else if (rol === "MAESTRO") {
      window.location.href = "./maestro.html";
  } else if (rol === "ADMINISTRATIVO") {
      window.location.href = "./administrativo.html";
  }
}

document.querySelectorAll("[data-rol]").forEach((btn) => {
  btn.addEventListener("click", () => {
    entrarComo(btn.getAttribute("data-rol"));
  });
});