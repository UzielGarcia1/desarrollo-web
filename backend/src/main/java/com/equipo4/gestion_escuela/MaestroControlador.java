package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class MaestroControlador {

    @Autowired
    IMaestro iMaestro;

    @Autowired
    IMateria iMateria;

    @GetMapping("/maestros")
    public Iterable<Maestro> listarMaestros() {
        return iMaestro.findAll();
    }

    @PostMapping("/maestros")
    public Maestro guardarMaestro(@RequestBody Maestro maestro) {
        return iMaestro.save(maestro);
    }

    @PutMapping("/maestros/{id}")
    public Maestro actualizarMaestro(@PathVariable Integer id, @RequestBody Maestro maestro) {
        maestro.setId(id);
        return iMaestro.save(maestro);
    }

    @DeleteMapping("/maestros/{id}")
    public void eliminarMaestro(@PathVariable Integer id) {
        iMaestro.deleteById(id);
    }


    @GetMapping("/maestros/{id}/materias")
    public List<Materia> materiasDeMaestro(@PathVariable Integer id) {
        return iMateria.findByMaestroId(id);
    }
}