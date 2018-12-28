create table questions(
    id int not null auto_increment PRIMARY KEY,
    openId varchar(50) not null,
    deptId int(20) not null,
    title varchar(100) not null,
    choiceA VARCHAR(50) not null,
    choiceB VARCHAR(50) not null,
    choiceC VARCHAR(50) not null,
    choiceD VARCHAR(50) not null,
    answer VARCHAR(20) not null,
    count int(20) DEFAULT 0,
 ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

 create table department(
     id int not null auto_increment PRIMARY KEY,
     name VARCHAR(30) not null
 )DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

 create table test(
     id int not null auto_increment PRIMARY KEY,
     openId varchar(20) not null,
     queId varchar(10) not null,
     uAns varchar(10) not null
 )DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
