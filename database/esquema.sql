CREATE DATABASE IF NOT EXISTS gestion_escolar;
USE gestion_escolar;

-- Tabla de roles para los 3 actores del sistema
CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla general de usuarios
CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
correo VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
rol_id INT,
FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla de Alumnos
CREATE TABLE alumnos (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario_id INT,
matricula VARCHAR(20) UNIQUE NOT NULL,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
carrera VARCHAR(100) NOT NULL,
semestre INT NOT NULL,
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Maestros
CREATE TABLE maestros (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario_id INT,
numero_empleado VARCHAR(20) UNIQUE NOT NULL,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
especialidad VARCHAR(100),
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Materias
CREATE TABLE materias (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
carrera VARCHAR(100) NOT NULL,
creditos INT NOT NULL,
maestro_id INT,
FOREIGN KEY (maestro_id) REFERENCES maestros(id)
);

-- Tabla de Calificaciones (Relaciona Alumnos con Materias)
CREATE TABLE calificaciones (
id INT AUTO_INCREMENT PRIMARY KEY,
alumno_id INT,
materia_id INT,
calificacion DECIMAL(5,2) DEFAULT 0.00,
FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
FOREIGN KEY (materia_id) REFERENCES materias(id)
);

-- Insertar los roles iniciales del sistema
INSERT INTO roles (nombre) VALUES ('ADMINISTRATIVO'), ('MAESTRO'), ('ESTUDIANTE');