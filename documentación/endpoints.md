--PLANIFICACION DE ENDPOINTS REST (API BACKEND)

Estos son los endpoints preliminares que el backend en Spring Boot ofrecera para que el frontend pueda comunicarse y soportar los 3 roles del sistema:

--MODULO DE ALUMNOS

GET /api/alumnos
Descripcion: Permite listar a todos los alumnos (uso exclusivo del rol Administrativo).

GET /api/alumnos/{id}
Descripcion: Permite consultar los datos personales, carrera, semestre y calificaciones de un estudiante especifico.

PUT /api/alumnos/{id}
Descripcion: Permite al estudiante o administrativo modificar los datos personales del alumno, actualizandolos de forma global.

--MODULO DE MAESTROS

GET /api/maestros/{id}/materias
Descripcion: Permite al maestro consultar las materias que imparte y la lista de alumnos inscritos en cada una.

PUT /api/maestros/calificaciones/{id}
Descripcion: Permite al maestro registrar o modificar las calificaciones de los alumnos a su cargo.

--MODULO ADMINISTRATIVO

POST /api/materias
Descripcion: Permite al administrativo registrar nuevas materias, asignarles caracteristicas y vincularlas a un profesor.

PUT /api/usuarios/{id}
Descripcion: Permite modificar la informacion general de usuarios (alumnos, maestros o materias) dentro del sistema.