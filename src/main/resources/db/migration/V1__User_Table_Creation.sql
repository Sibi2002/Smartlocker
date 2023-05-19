create table users (user_id bigserial primary key ,user_name varchar not null ,password varchar not null ,mac_id varchar
                   ,email varchar unique ,phone_number varchar ,created_on timestamp default CURRENT_TIMESTAMP,
                    updated_on timestamp default CURRENT_TIMESTAMP);
create table session_management (id UUID PRIMARY KEY , user_id bigint references users(user_id));