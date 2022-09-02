CREATE PROCEDURE completeProject (@project_id VARCHAR(80))
AS
BEGIN
UPDATE ProjectsTable SET completed=1 WHERE project_id=@project_id
END