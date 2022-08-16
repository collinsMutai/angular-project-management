CREATE PROCEDURE insertProject ( @project_id VARCHAR(80), @name VARCHAR(200), @description VARCHAR(200), @end_date VARCHAR(200), @assigned_user_email VARCHAR(200))
AS
BEGIN

INSERT INTO ProjectsTable(project_id,name,description,end_date, assigned_user_email) VALUES(@project_id, @name, @description, @end_date, @assigned_user_email)

END