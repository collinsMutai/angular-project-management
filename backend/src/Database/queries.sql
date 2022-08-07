-- CREATE DATABASE UserProjects;

-- DROP TABLE UsersTable


-- CREATE TABLE UsersTable( id VARCHAR(80), name VARCHAR(200),   email VARCHAR(200) UNIQUE , password VARCHAR(200), role VARCHAR(200) DEFAULT 'user')



-- UPDATE UsersTable SET role='admin' WHERE id ='7e2e97b7-2da3-4d3e-aa1a-cee9b0a6064f'

-- SELECT * FROM UsersTable

-- CREATE PROCEDURE insertUser ( @id VARCHAR(80), @name VARCHAR(200), @email VARCHAR(200), @password VARCHAR(200))
-- AS
-- BEGIN

-- INSERT INTO UsersTable(id,name,email,password) VALUES(@id, @name, @email, @password)

-- END


-- CREATE PROCEDURE getUser(@email VARCHAR(200))
-- AS
-- BEGIN
-- SELECT * FROM UsersTable WHERE email =@email
-- END




-- -- projects


-- CREATE TABLE ProjectsTable( id VARCHAR(80), name VARCHAR(200),   description VARCHAR(200) , end_date VARCHAR(200), user_email VARCHAR(200) FOREIGN KEY REFERENCES UsersTable(email))

-- ALTER TABLE ProjectsTable
--    DROP COLUMN role


-- SELECT * FROM ProjectsTable

-- CREATE PROCEDURE insertProject ( @id VARCHAR(80), @name VARCHAR(200), @description VARCHAR(200), @end_date VARCHAR(200))
-- AS
-- BEGIN

-- INSERT INTO ProjectsTable(id,name,description,end_date) VALUES(@id, @name, @description, @end_date)

-- END

-- CREATE PROCEDURE getProject(@email VARCHAR(200))
-- AS
-- BEGIN
-- SELECT * FROM Table WHERE email =@email
-- END
