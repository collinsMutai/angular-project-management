export interface ProjectInterface {
    project_id: string,
    name: string,
    description: string,
    end_date: string,
    issent: number,
    // user_id: string,
    assigned_user_email: string
}
export interface FetchProjectInterface {
  project_id: string
  name: string
  description: string
  end_date: string
  issent: string
  assigned_user_email: string
  completed: string
}
