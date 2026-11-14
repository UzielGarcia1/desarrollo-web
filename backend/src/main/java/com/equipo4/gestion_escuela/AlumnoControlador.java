package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AlumnoControlador {

    @Autowired
    IAlumno iAlumno;

    // Ruta GET para listar alumnos 
    @GetMapping("/alumnos")
    public Iterable<Alumno> listarAlumnos() {
        return iAlumno.findAll();
    }

    // Ruta POST para registrar un alumno nuevo
    @PostMapping("/alumnos")
    public Alumno guardarAlumno(@RequestBody Alumno alumno) {
        return iAlumno.save(alumno);
    }
}