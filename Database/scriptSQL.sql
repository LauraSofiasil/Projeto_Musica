#Criação do banco de dados
create database db_controle_musicas_aa;

#Ativa o database a ser utilizado
use db_controle_musicas_aa;

#Criação da tabela de musicas
create table tbl_musica (
	id              int not null primary key auto_increment,
    nome            varchar(100) not null,
    duracao         time not null,
    data_lancamento date not null,
    letra           text,
    link            varchar(300)
);

#Criação da tabela do tipo de album
create table tbl_tipo_album(
	id_tipo_album   int not null primary key auto_increment,
    tipo            varchar(100) not null
);

#Criação da tabela de genero
create table tbl_genero(
	id_genero   int not null primary key auto_increment,
    tipo            varchar(100) not null
);

#Criação da tabela do tipo de artista
create table tbl_tipo_artista(
	id_tipo_artista   int not null primary key auto_increment,
    tipo            varchar(100) not null
);

#Criação da tabela de gravadora
create table tbl_gravadora(
	id_gravadora    int not null primary key auto_increment,
    nome            varchar(100) not null,
    telefone        varchar(20) not null,
    email           varchar(100) not null
);

#Criação da tabela de usuario
create table tbl_usuario(
	id_usuario       int not null primary key auto_increment,
    nome             varchar(100) not null,
    data_nascimento  date not null,
    email            varchar(100) not null,
    senha            varchar(20) not null
);

show tables;

select * from tbl_musica;