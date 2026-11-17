package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    // Ruta PUT para actualizar un alumno
    @PutMapping("/alumnos/{id}")
    public Alumno actualizarAlumno(@PathVariable Integer id, @RequestBody Alumno alumno) {
        alumno.setId(id); 
        return iAlumno.save(alumno);
    }
        
    // Ruta DELETE para eliminar un alumno
    @DeleteMapping("/alumnos/{id}")
    public void eliminarAlumno(@PathVariable Integer id) {
        iAlumno.deleteById(id); 
    }

    @GetMapping("/alumnos/buscar/{nombre}")
    public List<Alumno> buscarPorNombre(@PathVariable String nombre) {
        return iAlumno.findByNombre(nombre);
    }

    // Ruta para el filtro por correo completo
    @GetMapping("/alumnos/buscar/correo/{correo}")
    public List<Alumno> buscarPorCorreo(@PathVariable String correo) {
        return iAlumno.findByCorreo(correo);
    }

}