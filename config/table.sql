create database nossas_lojas;

create table lojas(
    `id` integer auto_increment primary key not null,
    `name` varchar(255) not null,
    `address` varchar(255) not null,
    `phone` char(15) not null ,
    `cnpj` char(20) not null,
    `workingHour` text not null,
    `city` varchar(255) not null,
    `state` char(1) not null
)