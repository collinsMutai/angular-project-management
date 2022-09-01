CREATE PROCEDURE insertProject ( @project_id VARCHAR(80), @name VARCHAR(200), @description VARCHAR(200), @end_date VARCHAR(200), @assigned_user_email VARCHAR(200))
AS
BEGIN

INSERT INTO ProjectsTable(project_id,name,description,end_date, assigned_user_email) VALUES(@project_id, @name, @description, @end_date, @assigned_user_email)

END


CREATE PROCEDURE assignNewProject (@name VARCHAR(200), @Email VARCHAR(80), @description VARCHAR(200),@end_date VARCHAR(200), @assigned_user_email VARCHAR(200))
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
INSERT INTO ProjectsTable(name,description,end_date, assigned_user_email) VALUES( @name, @description, @end_date, @assigned_user_email)
      END
   END
   ELSE
      BEGIN
         RAISERROR('USER OR PROJECT ID DOES NOT EXIST/ASSIGNED',11,1);
      END
END