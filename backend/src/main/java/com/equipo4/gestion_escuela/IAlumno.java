package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface IAlumno extends CrudRepository<Alumno, Integer> {
    List<Alumno> findByNombre(String nombre);
    List<Alumno> findByMatricula(String matricula);
    List<Alumno> findByUsuarioCorreo(String correo);
}
