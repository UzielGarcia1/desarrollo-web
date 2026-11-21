package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class CalificacionControlador {

    @Autowired
    ICalificacion iCalificacion;

    @GetMapping("/calificaciones")
    public Iterable<Calificacion> listarCalificaciones() {
        return iCalificacion.findAll();
    }

    @PostMapping("/calificaciones")
    public Calificacion guardarCalificacion(@RequestBody Calificacion calificacion) {
        return iCalificacion.save(calificacion);
    }

    @PutMapping("/calificaciones/{id}")
    public Calificacion actualizarCalificacion(
            @PathVariable Integer id,
            @RequestBody Calificacion calificacion
    ) {
        calificacion.setId(id);
        return iCalificacion.save(calificacion);
    }

    @DeleteMapping("/calificaciones/{id}")
    public void eliminarCalificacion(@PathVariable Integer id) {
        iCalificacion.deleteById(id);
    }

    @GetMapping("/calificaciones/alumno/{alumnoId}")
    public List<Calificacion> porAlumno(@PathVariable Integer alumnoId) {
        return iCalificacion.findByAlumnoId(alumnoId);
    }

    @GetMapping("/calificaciones/materia/{materiaId}")
    public List<Calificacion> porMateria(@PathVariable Integer materiaId) {
        return iCalificacion.findByMateriaId(materiaId);
    }
}
