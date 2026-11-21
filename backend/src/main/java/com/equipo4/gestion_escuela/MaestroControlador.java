package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    @GetMapping("/maestros/buscar/{nombre}")
    public List<Maestro> buscarPorNombre(@PathVariable String nombre) {
        return iMaestro.findByNombre(nombre);
    }

    @GetMapping("/maestros/buscar/empleado/{numeroEmpleado}")
    public List<Maestro> buscarPorNumeroEmpleado(@PathVariable String numeroEmpleado) {
        return iMaestro.findByNumeroEmpleado(numeroEmpleado);
    }

    @GetMapping("/maestros/buscar/correo/{correo}")
    public List<Maestro> buscarPorCorreo(@PathVariable String correo) {
        return iMaestro.findByUsuarioCorreo(correo);
    }

    @GetMapping("/maestros/{id}/materias")
    public List<Materia> materiasDeMaestro(@PathVariable Integer id) {
        return iMateria.findByMaestroId(id);
    }
}