SISTEMA DE GESTION ESCOLAR - PROYECTO FINAL

Proyecto desarrollado para la materia de Desarrollo Web.

INTEGRANTES DEL EQUIPO:
-Garcia Garcia Juan Alejandro
-Garcia Saldaña Angel Uziel

INTRODUCCION Y DESCRIPCION DEL SISTEMA
El Sistema de Gestion Escolar es una aplicacion web basada en una arquitectura de 3 capas diseñada para optimizar y simplificar el control de la historia academica de una institucion educativa.

ACTORES Y ROLES DEL SISTEMA:

Estudiante:
Puede consultar sus datos personales, carrera, semestre y materias actuales.
Puede consultar sus calificaciones e historial academico.
Puede modificar sus datos personales, los cuales se actualizan de forma global en el sistema.

Maestro:
Puede consultar las materias que imparte, los alumnos inscritos en cada una y sus carreras correspondientes.
Puede consultar y modificar las calificaciones de los alumnos a su cargo.
Puede consultar sus propios datos personales.

Administrativo:
Cuenta con control y permisos globales de consulta sobre datos personales de alumnos y maestros, informacion de carreras, materias y calificaciones.
Puede modificar la informacion general de las materias, las asignaciones de los maestros, asi como los datos de alumnos y profesores.

ARQUITECTURA DEL SISTEMA
El proyecto esta estructurado bajo el modelo de 3 capas:

Frontend: HTML, CSS y JavaScript (Interfaces dinamicas conectadas mediante API Fetch).

Backend: Java con Spring Boot (Controladores REST, servicios y repositorios).

Base de Datos: MySQL o motor relacional administrado mediante Hibernate / JPA.

ESTRUCTURA DEL REPOSITORIO
El repositorio se encuentra organizado de la siguiente manera:

backend/: Proyecto en Spring Boot

frontend/: Archivos HTML, CSS y JS

database/: Esquema y scripts SQL iniciales (esquema.sql)

documentacion/: Reportes de avance y documentacion del proyecto

IAG/: Registros y evidencias del uso de Inteligencia Artificial