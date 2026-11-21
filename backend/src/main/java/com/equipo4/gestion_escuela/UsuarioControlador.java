package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class UsuarioControlador {

    @Autowired
    IUsuario iUsuario;

    @GetMapping("/usuarios")
    public Iterable<Usuario> listarUsuarios() {
        return iUsuario.findAll();
    }

    @PostMapping("/usuarios")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return iUsuario.save(usuario);
    }

    @PutMapping("/usuarios/{id}")
    public Usuario actualizarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return iUsuario.save(usuario);
    }

    @DeleteMapping("/usuarios/{id}")
    public void eliminarUsuario(@PathVariable Integer id) {
        iUsuario.deleteById(id);
    }

    @GetMapping("/usuarios/buscar/correo/{correo}")
    public List<Usuario> buscarPorCorreo(@PathVariable String correo) {
        return iUsuario.findByCorreo(correo);
    }
}