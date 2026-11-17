package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface IAlumno extends CrudRepository<Alumno, Integer> {
    // Filtro por nombre exacto
    List<Alumno> findByNombre(String nombre);

    // Filtro por correo exacto
    List<Alumno> findByCorreo(String correo);

}
