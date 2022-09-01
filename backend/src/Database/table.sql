CREATE DATABASE UserProjects;

DROP TABLE UsersTable


CREATE TABLE UsersTable( id VARCHAR(80), name VARCHAR(200),   email VARCHAR(200) UNIQUE , password VARCHAR(200), role VARCHAR(200) DEFAULT 'user', status VARCHAR(80) DEFAULT 0)





UPDATE UsersTable SET role='admin' WHERE id ='49024070-5fe2-4c9d-890d-b6eaa27e67d3'

SELECT * FROM UsersTable

CREATE PROCEDURE insertUser ( @id VARCHAR(80), @name VARCHAR(200), @email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN

INSERT INTO UsersTable(id,name,email,password) VALUES(@id, @name, @email, @password)

END


CREATE PROCEDURE getUser(@email VARCHAR(200))
AS
BEGIN
SELECT * FROM UsersTable WHERE email =@email
END

CREATE PROCEDURE getallusers
AS
BEGIN
SELECT * FROM UsersTable
END


-- projects



CREATE TABLE ProjectsTable( project_id VARCHAR(80), name VARCHAR(200) UNIQUE,   description VARCHAR(200) , end_date VARCHAR(200),
issent VARCHAR(10) DEFAULT 0, assigned_user_email VARCHAR(200) UNIQUE, completed VARCHAR(10) DEFAULT 0
)




SELECT * FROM ProjectsTable

DROP TABLE ProjectsTable

CREATE PROCEDURE insertProject ( @project_id VARCHAR(80), @name VARCHAR(200), @description VARCHAR(200), @end_date VARCHAR(200), @assigned_user_email VARCHAR(200))
AS
BEGIN

INSERT INTO ProjectsTable(project_id,name,description,end_date, assigned_user_email) VALUES(@project_id, @name, @description, @end_date, @assigned_user_email)

END

CREATE PROCEDURE getProject(@assigned_user_email VARCHAR(200))
AS
BEGIN
SELECT * FROM ProjectsTable WHERE assigned_user_email =@assigned_user_email
END

CREATE PROCEDURE getAllProjects
AS
BEGIN
SELECT * FROM ProjectsTable
END

INSERT INTO ProjectsTable (name, description, end_date, email) VALUES ('Collins', 'project 1', 'aug101989', 'collinsfrontend@gmail.com')


SELECT * FROM projectsTable WHERE issent='0'

CREATE PROCEDURE assignProject (@name VARCHAR(200), @Email VARCHAR(80))
AS
BEGIN
IF EXISTS(SELECT * FROM dbo.ProjectsTable WHERE assigned_user_email IS NULL AND name=@name)
   BEGIN 
         IF EXISTS( SELECT * FROM dbo.ProjectsTable WHERE assigned_user_email = @Email)
      BEGIN
         RAISERROR('user on another project',11,1);
      END
   ELSE
      BEGIN
         update dbo.ProjectsTable set assigned_user_email = @Email WHERE name=@name;
      END
   END
   ELSE
      BEGIN
         RAISERROR('USER OR PROJECT ID DOES NOT EXIST/ASSIGNED',11,1);
      END
END

CREATE PROCEDURE deleteProject (@Project_id VARCHAR(80))
AS
BEGIN
IF EXISTS(SELECT * FROM ProjectsTable WHERE project_id=@Project_id)
BEGIN
DELETE FROM ProjectsTable WHERE project_id=@Project_id
END
END






SELECT * FROM projectsTable WHERE issent='0' 

SELECT email FROM UsersTable u INNER JOIN projectsTable p ON p.user_id =@User_Id

DELETE from UsersTable WHERE name = 'user1'

select * from UsersTable
select * from ProjectsTable

TRUNCATE TABLE UsersTable
TRUNCATE TABLE projectsTable


SELECT email FROM UsersTable u LEFT JOIN ProjectsTable p ON p.user_id ='9c77912e-b9ae-4c94-8eae-6094dd075d84'
UPDATE ProjectsTable SET issent='1' WHERE user_id = '9c77912e-b9ae-4c94-8eae-6094dd075d84'

ALTER TABLE ProjectsTable
DROP COLUMN user_id