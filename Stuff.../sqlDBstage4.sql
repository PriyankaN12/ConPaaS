drop table tenantmeta;
create table tenantmeta (tid int,tname varchar(50),primary key(tid));
drop table nvmeta;
create table nvmeta (nameid int,cname varchar(50),ctype varchar(15),primary key(nameid));
drop table pivot;
create table pivot (nvid int,nameid int,value varchar(15),primary key(nvid),constraint nv foreign key (nameid) references nvmeta(nameid));
drop table inventory;
create table inventory (tid int,isbn varchar(10),name varchar(50),author varchar(50),price int,nvid int,primary key(tid,isbn,nvid),constraint fknv foreign key (nvid) references pivot(nvid),constraint fktid foreign key (tid) references tenantmeta(tid));


insert into tenantmeta(tid,tname) values(1,'UsedBooks');
insert into tenantmeta(tid,tname) values(2,'NewBooks');


insert into nvmeta(nameid,cname,ctype) values(1,'condition','int');
insert into nvmeta(nameid,cname,ctype) values(2,'seller','string');
insert into nvmeta(nameid,cname,ctype) values(3,'edition','int');


insert into pivot (nvid,nameid,value) values(1,1,'4');
insert into pivot (nvid,nameid,value) values(2,1,'5');
insert into pivot (nvid,nameid,value) values(3,1,'3');
insert into pivot (nvid,nameid,value) values(4,2,'Tom');
insert into pivot (nvid,nameid,value) values(5,2,'Will');
insert into pivot (nvid,nameid,value) values(6,2,'Harry');
insert into pivot (nvid,nameid,value) values(7,3,'5');
insert into pivot (nvid,nameid,value) values(8,3,'2');
insert into pivot (nvid,nameid,value) values(9,3,'11');


insert into inventory (tid,isbn,name,author,price,nvid) values(2,'006','Hadoop','Tom White',350,9);
insert into inventory (tid,isbn,name,author,price,nvid) values(2,'005','Natural Language Processing','Jurafsky & Martin',600,8);
insert into inventory (tid,isbn,name,author,price,nvid) values(2,'004','Moving to the Cloud','Dinkar Sitaram',400,7);
insert into inventory (tid,isbn,name,author,price,nvid) values(1,'003','Lord of the Rings','JRR Tolkein',400,6);
insert into inventory (tid,isbn,name,author,price,nvid) values(1,'002','Percy Jackson','Rick Riordan',250,5);
insert into inventory (tid,isbn,name,author,price,nvid) values(1,'003','Lord of the Rings','JRR Tolkein',400,3);
insert into inventory (tid,isbn,name,author,price,nvid) values(1,'002','Percy Jackson','Rick Riordan',250,2);
insert into inventory (tid,isbn,name,author,price,nvid) values(1,'001','Harry Potter','JK Rowling',500,4);
insert into inventory (tid,isbn,name,author,price,nvid) values(1,'001','Harry Potter','JK Rowling',500,1);

