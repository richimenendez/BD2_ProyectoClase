CREATE KEYSPACE IF NOT EXISTS proyecto201602916 WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':3};

-- Reporte 1

-- Nombre_1,Apellido_1,CUI_1,Email_1,FechaRegistro_1,Genero_1,InstitucionBancaria_1,AbreviacionInstitucion_1,TipoCuenta_1,SaldoInicial_1,Nombre_2,Apellido_2,CUI_2,Email_2,FechaRegistro_2,Genero_2,InstitucionBancaria_2,AbreviacionInstitucion_2,TipoCuenta_2,SaldoInicial_2,MontoTransferencia,FechaTransferencia
CREATE TABLE proyecto201602916.operacionesCuentahabiente (
    nombre text,
    apellido text,
    cui text,
    email text,
    fechaRegistro Date,
    genero text,
   	institucionBancaria text,
    tipoCuenta text,
    saldoInicial float,
    nombre2 text,
    apellido2 text,
   	institucionBancaria2 text,
    tipoCuenta2 text,
    montoTransferencia float,
    fechaTransferencia timestamp,
    primary key ((cui),fechaTransferencia)
    )
    with clustering order by(fechaTransferencia desc);

COPY operacionescuentahabiente(nombre,apellido,cui,email,fechaRegistro,genero,institucionBancaria,tipoCuenta,saldoInicial,nombre2,apellido2,institucionBancaria2,tipoCuenta2,montoTransferencia,fechaTransferencia) FROM 'TransaccionesCuentahabiente.csv';

-- ,MontoTransferencia,FechaTransferencia
CREATE TABLE proyecto201602916.debitosInstituciones (
	institucionBancaria text,
    abreviacionInstitucion text,
   	institucionBancaria2 text,
    abreviacionInstitucion2 text,
    montoTransferencia float,
    fechaTransferencia timestamp,
	primary key ((institucionBancaria2),institucionBancaria, fechaTransferencia)
)
with clustering order by(institucionBancaria asc, fechaTransferencia desc);

COPY debitosInstituciones(institucionBancaria,abreviacionInstitucion,institucionBancaria2,abreviacionInstitucion2,montoTransferencia,fechaTransferencia) FROM 'Creditos.csv' WITH HEADER=TRUE;

-- ,MontoTransferencia,FechaTransferencia
CREATE TABLE proyecto201602916.creditosInstituciones (
	institucionBancaria text,
    abreviacionInstitucion text,
   	institucionBancaria2 text,
    abreviacionInstitucion2 text,
    montoTransferencia float,
    fechaTransferencia timestamp,
	primary key ((institucionBancaria),institucionBancaria2, fechaTransferencia)
)
with clustering order by(institucionBancaria2 asc, fechaTransferencia desc);

COPY creditosInstituciones(institucionBancaria,abreviacionInstitucion,institucionBancaria2,abreviacionInstitucion2,montoTransferencia,fechaTransferencia) FROM 'Creditos.csv' WITH HEADER=TRUE;

--Nombre_1,Apellido_1,CUI_1,Email_1,FechaRegistro_1,Genero_1,InstitucionBancaria_1,AbreviacionInstitucion_1,TipoCuenta_1,SaldoInicial_1
CREATE TABLE proyecto201602916.cuentaHabientes (
	nombre text,
	apellido text,
	cui text,
	email text,
	fechaRegistro Date,
	genero text,
	institucionBancaria text,
	abreviacionInstitucion text,
	tipoCuenta text,
	saldoInicial float,
	primary key ((cui), institucionBancaria, fechaRegistro)
)
with clustering order by(institucionBancaria asc, fechaRegistro desc);

COPY cuentaHabientes(nombre,apellido,cui,email,fechaRegistro,genero,institucionBancaria,abreviacionInstitucion,tipoCuenta,saldoInicial) FROM 'Cuentas.csv' WITH HEADER=TRUE;


CREATE TABLE proyecto201602916.institucionesBancarias (
	institucionBancaria text,
	abreviacionInstitucion text,
	primary key ((institucionBancaria))
);


COPY institucionBancaria(institucionBancaria,abreviacionInstitucion) FROM 'Instituciones.csv' WITH HEADER=TRUE;