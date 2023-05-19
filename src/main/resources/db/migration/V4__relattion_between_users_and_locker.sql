ALTER  table users drop column mac_id;
alter table locker alter column id set data type bigint using id::bigint;
ALTER table users add column locker_id bigint references locker(id);