package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class AlumnoControlador {

    @Autowired
    IAlumno iAlumno;

    @Autowired
    ICalificacion iCalificacion;

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

    @GetMapping("/alumnos/buscar/matricula/{matricula}")
    public List<Alumno> buscarPorMatricula(@PathVariable String matricula) {
        return iAlumno.findByMatricula(matricula);
    }

    // Ruta para el filtro por correo del usuario asociado
    @GetMapping("/alumnos/buscar/correo/{correo}")
    public List<Alumno> buscarPorCorreo(@PathVariable String correo) {
        return iAlumno.findByUsuarioCorreo(correo);
    }

    @GetMapping("/alumnos/{id}/calificaciones")
    public List<Calificacion> historialAlumno(@PathVariable Integer id) {
        return iCalificacion.findByAlumnoId(id);
    }
}