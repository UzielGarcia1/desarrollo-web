package com.equipo4.gestion_escuela;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface IUsuario extends CrudRepository<Usuario, Integer> {
    List<Usuario> findByCorreo(String correo);
}