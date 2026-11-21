package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface IMaestro extends CrudRepository<Maestro, Integer> {
    List<Maestro> findByNombre(String nombre);
    List<Maestro> findByNumeroEmpleado(String numeroEmpleado);
    List<Maestro> findByUsuarioCorreo(String correo);
}