CREATE PROCEDURE deleteProject (@Project_id VARCHAR(80))
AS
BEGIN
IF EXISTS(SELECT * FROM ProjectsTable WHERE project_id=@Project_id)
BEGIN
DELETE FROM ProjectsTable WHERE project_id=@Project_id
END
END