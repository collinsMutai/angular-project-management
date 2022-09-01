CREATE PROCEDURE deleteProject (@Project_id VARCHAR(80))
AS
BEGIN
IF EXISTS(SELECT * FROM ProjectsTable WHERE project_id=@Project_id)
BEGIN
DELETE FROM ProjectsTable WHERE project_id=@Project_id
END
END

CREATE PROCEDURE deleteAProject (@Project_id VARCHAR(80))
AS
BEGIN
IF EXISTS(SELECT * FROM ProjectsTable WHERE assigned_user_email=@assigned_user_email)
BEGIN
DELETE FROM ProjectsTable WHERE assigned_user_email=@assigned_user_email
END
END