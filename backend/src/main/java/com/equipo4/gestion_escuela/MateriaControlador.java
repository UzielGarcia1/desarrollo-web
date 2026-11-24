package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class MateriaControlador {

    @Autowired
    IMateria iMateria;

    @Autowired
    ICalificacion iCalificacion;

    @GetMapping("/materias")
    public Iterable<Materia> listarMaterias() {
        return iMateria.findAll();
    }

    @PostMapping("/materias")
    public Materia guardarMateria(@RequestBody Materia materia) {
        return iMateria.save(materia);
    }

    @PutMapping("/materias/{id}")
    public Materia actualizarMateria(@PathVariable Integer id, @RequestBody Materia materia) {
        materia.setId(id);
        return iMateria.save(materia);
    }

    @DeleteMapping("/materias/{id}")
    public void eliminarMateria(@PathVariable Integer id) {
        iMateria.deleteById(id);
    }

    @GetMapping("/materias/{id}/calificaciones")
    public List<Calificacion> calificacionesDeMateria(@PathVariable Integer id) {
        return iCalificacion.findByMateriaId(id);
    }
}