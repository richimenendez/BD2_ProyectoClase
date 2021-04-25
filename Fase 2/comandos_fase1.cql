CREATE KEYSPACE IF NOT EXISTS proyecto201602916 WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':3};

CREATE TABLE proyecto201602916.reporte1 (
   ... id_usuario int,
   ... id_transaccion int,
   ... nombre text,
   ... apellido text,
   ... dpi int,
   ... fecha Date,
   ... tipo text,
   ... monto float,
   ... primary key ((id_usuario),fecha,id_transaccion)
   ... )
   ... with clustering order by(fecha asc, id_transaccion desc);

CREATE TABLE proyecto201602916.reporte2 (
	id_institucion int,
	tipo int,
	nombre text,
	direccion text,
	monto float,
	primary key ((id_institucion),tipo)
)
with clustering order by(tipo asc);

CREATE TABLE proyecto201602916.reporte3 (
	id_usuario int,
	nombre text,
	apellido text,
	dpi text,
	primary key ((id_usuario))
);

CREATE TABLE proyecto201602916.reporte4 (
	id_institucion int,
	tipo text,
	nombre text,
	direccion text,
	primary key ((id_institucion))
);

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
    fechaTransferencia Date,
    primary key ((cui),fechaTransferencia)
    )
    with clustering order by(fechaTransferencia desc);

-- ,MontoTransferencia,FechaTransferencia
CREATE TABLE proyecto201602916.debitosInstituciones (
	institucionBancaria text,
    abreviacionInstitucion text,
   	institucionBancaria2 text,
    abreviacionInstitucion2 text,
    montoTransferencia float,
    fechaTransferencia Date,
	primary key ((institucionBancaria2),institucionBancaria, fechaTransferencia)
)
with clustering order by(institucionBancaria asc, fechaTransferencia desc);

-- ,MontoTransferencia,FechaTransferencia
CREATE TABLE proyecto201602916.creditosInstituciones (
	institucionBancaria text,
    abreviacionInstitucion text,
   	institucionBancaria2 text,
    abreviacionInstitucion2 text,
    montoTransferencia float,
    fechaTransferencia Date,
	primary key ((institucionBancaria),institucionBancaria2, fechaTransferencia)
)
with clustering order by(institucionBancaria2 asc, fechaTransferencia desc);

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
);
with clustering order by(institucionBancaria asc, fechaRegistro desc);

CREATE TABLE proyecto201602916.institucionesBancarias (
	institucionBancaria text,
	abreviacionInstitucion text
	primary key ((institucionBancaria))
);
