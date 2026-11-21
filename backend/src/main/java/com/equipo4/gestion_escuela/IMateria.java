package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface IMateria extends CrudRepository<Materia, Integer> {
    List<Materia> findByNombre(String nombre);
    List<Materia> findByMaestroId(Integer maestroId);
}