# Reporte de Avance del Proyecto

**Equipo: 4**  
**Fecha: 13/11/2026**  
**Número de reporte: 2**  
**Repositorio GitHub: https://github.com/UzielGarcia1/desarrollo-web**  

---

# 1. Actividades realizadas

- Creación del proyecto Spring Boot
- Configuración de conexión a MySQL
- Creación de entidades y repositorios
- Implementación de POST y GET
- Pruebas mediante CURL

---

# 2. Evidencias de trabajo

| Actividad | Integrante responsable | Enlace a commit |
|------------|------------------------|-----------------|
|Creación del proyecto Spring Boot |Úziel| https://github.com/UzielGarcia1/desarrollo-web/tree/main/backend |
|Configuración de conexión a MySQL |Úziel |https://github.com/UzielGarcia1/desarrollo-web/tree/main/backend |
|Creación de entidades y repositorios |Úziel |https://github.com/UzielGarcia1/desarrollo-web/tree/main/backend |
|Implementación de POST y GET |Juan |https://github.com/UzielGarcia1/desarrollo-web/tree/main/backend |
|Pruebas mediante CURL |Juan |https://github.com/UzielGarcia1/desarrollo-web/tree/main/backend |

---

# 3. Problemas encontrados

Al querer actualizar el repositorio, ambos nos encontramos el problema de que saltaba una advertencia de que había cosas desactualizadas, debido a que habiamos hecho push y por tanto no teníamos lo que el compañero sí desde el último commit, pero se resolvió usando git pull.

---

# 4. Avance funcional

El sistema ya permite registrar nuevos estudiantes mediante peticiones POST en formato JSON y consultar el listado completo mediante GET.
Se configuró la conexión a la base de datos en MySQL y se implementó la primera entidad del sistema (Alumno) junto con su respectivo repositorio (IAlumno) y controlador REST, ya se pueden relizar inserciones y consultas en formato JSON.

---

# 5. Uso de IA generativa

Se usó IA generativa para resolver el problema del punto 3.

---

# 6. Participación individual

Describir brevemente la contribución de cada integrante.

- **Integrante 1: Juan: Desarrolló controladores implementando endpoints y ejecutó pruebas funcionales dede terminal.**
- **Integrante 2: úziel: Generó la estructura base del proyecto, configuró y conectó el proyecto con la base de datos y programó la entidad Alumno y su interfaz IAlumno.**

---

# 7. Próximas actividades

Indicar las tareas que se realizarán antes del siguiente reporte.

- Actividad 1: Implementar PUT y DELETE
- Actividad 2: Incorporar filtros
- Actividad 3: Implementar observaciones
- Actividad 4: Validar respuestas HTTP
- Actividad 5: Probar persistencia

---

## Observaciones adicionales

Al enfrentarnos al problema del git pull, creemos conveniente que podamos usar alternativas como trabajar en una sola máquina para efectos de facilidad y eficacia, también planteamos la idea de trabajar en ambas computadoras el proyecto pero solo en una sola computadora hacer los commits mientras que la otra sirva para ir a la par, haciendo las actividades que correspondan a cada integrante.