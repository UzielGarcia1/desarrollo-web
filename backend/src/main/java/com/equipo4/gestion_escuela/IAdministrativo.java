package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface IAdministrativo extends CrudRepository<Administrativo, Integer> {
    List<Administrativo> findByNombre(String nombre);
    List<Administrativo> findByNumeroEmpleado(String numeroEmpleado);
}