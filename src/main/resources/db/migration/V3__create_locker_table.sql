create table locker (id varchar unique ,ip_address varchar ,mac_id varchar unique);
insert into locker (id, ip_address, mac_id) values('1','123456789','abcd1234');
alter table users add constraint fk_locker_mac_id FOREIGN KEY(mac_id) references  locker(mac_id);