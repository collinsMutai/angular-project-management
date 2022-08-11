-- CREATE DATABASE UserProjects;

-- DROP TABLE UsersTable


-- CREATE TABLE UsersTable( id VARCHAR(80), name VARCHAR(200),   email VARCHAR(200) UNIQUE , password VARCHAR(200), role VARCHAR(200) DEFAULT 'user')



-- UPDATE UsersTable SET role='admin' WHERE id ='820e83ec-008f-4376-b4bb-4250c6a9993c'

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

-- CREATE PROCEDURE getallusers
-- AS
-- BEGIN
-- SELECT * FROM UsersTable
-- END


-- -- projects


-- -- CREATE TABLE ProjectsTable( id VARCHAR(80), name VARCHAR(200),   description VARCHAR(200) , end_date VARCHAR(200), user_email VARCHAR(200) FOREIGN KEY REFERENCES UsersTable(email))

-- CREATE TABLE ProjectsTable( project_id VARCHAR(80), name VARCHAR(200) UNIQUE,   description VARCHAR(200) , end_date VARCHAR(200),
-- issent VARCHAR(10) DEFAULT 0, user_id VARCHAR(80)
-- )




-- SELECT * FROM ProjectsTable

-- DROP TABLE ProjectsTable

-- CREATE PROCEDURE insertProject ( @project_id VARCHAR(80), @name VARCHAR(200), @description VARCHAR(200), @end_date VARCHAR(200))
-- AS
-- BEGIN

-- INSERT INTO ProjectsTable(project_id,name,description,end_date) VALUES(@project_id, @name, @description, @end_date)

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

-- CREATE PROCEDURE assignProject (@name VARCHAR(200), @User_Id VARCHAR(80))
-- AS
-- BEGIN
-- IF EXISTS(SELECT * FROM dbo.ProjectsTable WHERE user_id IS NULL AND name=@name)
--    BEGIN 
--          IF EXISTS( SELECT * FROM dbo.ProjectsTable WHERE user_id = @User_Id)
--       BEGIN
--          RAISERROR('user on another project',11,1);
--       END
--    ELSE
--       BEGIN
--          update dbo.ProjectsTable set user_Id = @User_Id WHERE name=@name;
--       END
--    END
--    ELSE
--       BEGIN
--          RAISERROR('USER OR PROJECT ID DOES NOT EXIST/ASSIGNED',11,1);
--       END
-- END

-- CREATE PROCEDURE deleteProject (@Project_id VARCHAR(80))
-- AS
-- BEGIN
-- IF EXISTS(SELECT * FROM ProjectsTable WHERE project_id=@Project_id)
-- BEGIN
-- DELETE FROM ProjectsTable WHERE project_id=@Project_id
-- END
-- END




-- SELECT * FROM projectsTable WHERE issent='0' 

-- SELECT email FROM UsersTable u INNER JOIN projectsTable p ON p.user_id =@User_Id

-- DELETE from UsersTable WHERE name = 'kiprop'

-- select * from UsersTable