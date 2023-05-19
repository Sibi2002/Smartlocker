create table otp_management(id UUID primary key ,otp int,created_on timestamp default CURRENT_TIMESTAMP,
                             updated_on timestamp default CURRENT_TIMESTAMP);