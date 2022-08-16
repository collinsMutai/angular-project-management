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