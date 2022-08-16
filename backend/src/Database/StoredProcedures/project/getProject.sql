CREATE PROCEDURE getProject(@assigned_user_email VARCHAR(200))
AS
BEGIN
SELECT * FROM ProjectsTable WHERE assigned_user_email =@assigned_user_email
END