package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ICalificacion extends CrudRepository<Calificacion, Integer> {
    List<Calificacion> findByAlumnoId(Integer alumnoId);
    List<Calificacion> findByMateriaId(Integer materiaId);
}
