-- CREATE DATABASE UserProjects;

-- DROP TABLE UsersTable


-- CREATE TABLE UsersTable( id VARCHAR(80), name VARCHAR(200),   email VARCHAR(200) UNIQUE , password VARCHAR(200), role VARCHAR(200) DEFAULT 'user', issent VARCHAR(10) DEFAULT 0)



-- UPDATE UsersTable SET role='admin' WHERE id ='712cf667-f0f8-44e7-abf5-1934a7995246'

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


-- -- CREATE TABLE ProjectsTable( id VARCHAR(80), name VARCHAR(200),   description VARCHAR(200) , end_date VARCHAR(200), user_email VARCHAR(200) FOREIGN KEY REFERENCES UsersTable(email))

-- CREATE TABLE ProjectsTable( id VARCHAR(80), name VARCHAR(200) UNIQUE,   description VARCHAR(200) , end_date VARCHAR(200), email VARCHAR(200), issent VARCHAR(10) DEFAULT 0)


-- ALTER TABLE ProjectsTable
--    DROP COLUMN role


-- SELECT * FROM ProjectsTable

-- DROP TABLE ProjectsTable

-- CREATE PROCEDURE insertProject ( @id VARCHAR(80), @name VARCHAR(200), @description VARCHAR(200), @end_date VARCHAR(200))
-- AS
-- BEGIN

-- INSERT INTO ProjectsTable(id,name,description,end_date) VALUES(@id, @name, @description, @end_date)

-- END

-- CREATE PROCEDURE getProject(@email VARCHAR(200))
-- AS
-- BEGIN
-- SELECT * FROM projectsTable WHERE email =@email
-- END

-- CREATE PROCEDURE getAllProjects
-- AS
-- BEGIN
-- SELECT * FROM projectsTable
-- END

-- INSERT INTO ProjectsTable (name, description, end_date, email) VALUES ('Collins', 'project 1', 'aug101989', 'collinsfrontend@gmail.com')


-- SELECT * FROM projectsTable WHERE issent='0'