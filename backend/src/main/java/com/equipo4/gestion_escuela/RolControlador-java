package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RolControlador {

    @Autowired
    IRol iRol;

    @GetMapping("/roles")
    public Iterable<Rol> listarRoles() {
        return iRol.findAll();
    }

    @PostMapping("/roles")
    public Rol guardarRol(@RequestBody Rol rol) {
        return iRol.save(rol);
    }

    @PutMapping("/roles/{id}")
    public Rol actualizarRol(@PathVariable Integer id, @RequestBody Rol rol) {
        rol.setId(id);
        return iRol.save(rol);
    }

    @DeleteMapping("/roles/{id}")
    public void eliminarRol(@PathVariable Integer id) {
        iRol.deleteById(id);
    }
}