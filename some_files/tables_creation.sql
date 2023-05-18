/*
drop table favorite;
drop table reply;
drop table reply_status;
drop table message;
drop table vacancy_skill;
drop table vacancy;
drop table skill;
drop table company_member;
drop table company;
drop table token;
drop table account;
drop table account_info;

SUPER ULTRA IMPORTANT for descriptions fields

create database work_find_coursework 
ENCODING 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8'
   TEMPLATE template0;

*/

create table account(
    id serial primary key,
    login varchar(255) not null,
    password_hash text not null,
    is_admin boolean not null default false
);

create table account_info(
    id serial primary key references account(id),
    name varchar(255) not null,
    email varchar(255),
    website varchar(255),
    about text
);

select * from account_info

alter table account_info add email varchar(255)
alter table account_info drop column age

create table token(
    id serial primary key,
    account_id integer references account(id),
    token text not null,
    date timestamp not null
);

create table company(
    id serial primary key,
    owner_id integer references account(id),
    name varchar(255) not null unique,
    about text,
    website varchar(255),
    phone varchar(255)
);

create table employer(
    account_id integer primary key references account(id),
    company_id integer references company(id),
    is_hr boolean not null default false
);

create table vacancy(
    id serial primary key,
    owner_id integer references account(id),
    company_id integer references company(id),
    title varchar(255) not null,
    description varchar(10000) not null,
    salary varchar(255),
    post_date timestamp not null default now(),
    is_active boolean not null default true
);

create table message(
    id serial primary key,
    from_id integer references account(id),
    to_id integer references account(id),
    text text not null,
    date timestamp not null default now()
);

create table reply(
    id serial primary key,
    vacancy_id integer references vacancy(id),
    account_id integer references account(id),
    date timestamp not null default now(),
    status reply_status not null
);

create table favorite(
    id serial primary key,
    account_id integer references account(id),
    vacancy_id integer references vacancy(id),
    date timestamp not null default now()
);

create table invite(
    id serial primary key,
    account_id integer references account(id),
    inviter_id integer references employer(account_id),
    company_id integer references company(id),
    date timestamp not null default now()
);

drop table invite;