package com.equipo4.gestion_escuela;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class AlumnoControlador {

    @Autowired
    IAlumno iAlumno;

    @Autowired
    ICalificacion iCalificacion;

    @Autowired
    IUsuario iUsuario;

    private void asociarUsuarioExistente(Alumno alumno) {
        if (alumno.getUsuario() != null && alumno.getUsuario().getId() != null) {
            Usuario usuarioBD = iUsuario.findById(alumno.getUsuario().getId())
                    .orElseThrow(() -> new RuntimeException("No existe el usuario con ID: " + alumno.getUsuario().getId()));
            alumno.setUsuario(usuarioBD);
        } else {
            alumno.setUsuario(null);
        }
    }

    // Ruta GET para listar alumnos
    @GetMapping("/alumnos")
    public Iterable<Alumno> listarAlumnos() {
        return iAlumno.findAll();
    }

    // Ruta POST para registrar un alumno nuevo
    @PostMapping("/alumnos")
    public Alumno guardarAlumno(@RequestBody Alumno alumno) {
        asociarUsuarioExistente(alumno);
        return iAlumno.save(alumno);
    }

    // Ruta PUT para actualizar un alumno
    @PutMapping("/alumnos/{id}")
    public Alumno actualizarAlumno(@PathVariable Integer id, @RequestBody Alumno alumno) {
        alumno.setId(id);
        asociarUsuarioExistente(alumno);
        return iAlumno.save(alumno);
    }

    // Ruta DELETE para eliminar un alumno
    @DeleteMapping("/alumnos/{id}")
    public void eliminarAlumno(@PathVariable Integer id) {
        iAlumno.deleteById(id);
    }
    
    @GetMapping("/alumnos/{id}/calificaciones")
    public List<Calificacion> historialAlumno(@PathVariable Integer id) {
        return iCalificacion.findByAlumnoId(id);
    }
}