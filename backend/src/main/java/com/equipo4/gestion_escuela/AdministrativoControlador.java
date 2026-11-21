package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class AdministrativoControlador {

    @Autowired
    IAdministrativo iAdministrativo;

    @GetMapping("/administrativos")
    public Iterable<Administrativo> listarAdministrativos() {
        return iAdministrativo.findAll();
    }

    @PostMapping("/administrativos")
    public Administrativo guardarAdministrativo(@RequestBody Administrativo administrativo) {
        return iAdministrativo.save(administrativo);
    }

    @PutMapping("/administrativos/{id}")
    public Administrativo actualizarAdministrativo(
            @PathVariable Integer id,
            @RequestBody Administrativo administrativo
    ) {
        administrativo.setId(id);
        return iAdministrativo.save(administrativo);
    }

    @DeleteMapping("/administrativos/{id}")
    public void eliminarAdministrativo(@PathVariable Integer id) {
        iAdministrativo.deleteById(id);
    }

    @GetMapping("/administrativos/buscar/{nombre}")
    public List<Administrativo> buscarPorNombre(@PathVariable String nombre) {
        return iAdministrativo.findByNombre(nombre);
    }

    @GetMapping("/administrativos/buscar/empleado/{numeroEmpleado}")
    public List<Administrativo> buscarPorNumeroEmpleado(@PathVariable String numeroEmpleado) {
        return iAdministrativo.findByNumeroEmpleado(numeroEmpleado);
    }
}