const users = document.getElementById('user') as HTMLHeadingElement;
const projdecs = document.getElementById('projdec') as HTMLParagraphElement;
const names = localStorage.getItem('name')
const email = localStorage.getItem('email') as string
const getprojectDiv = document.getElementById('userProject') as HTMLDivElement

interface ProjectInterface {
    project_id: string,
    name: string,
    description: string,
    end_date: string,
    issent: number,
    user_id: string,
    assigned_user_email: string
}


if (names || email) {
    users.textContent = `Welcome User: ${names}, Here's your Project`

}
class UserProject {

    constructor() { }
    getProject(assigned_user_email: string) {
        new Promise<any>((resolve, reject) => {
            fetch('http://localhost:7000/project/project', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "assigned_user_email": assigned_user_email
                })
            }).then(res => resolve(res.json()))
                .catch(err => reject(err))
        })
            .then(data => {

                if (!data) {
                    console.log('hauna')
                }
                data.map((project: ProjectInterface, index: number) => {
                    console.log(project);


                    const projectcard = document.createElement('div')
                    projectcard.id = 'projectCard'
                    const h2 = document.createElement('h2')
                    const p1 = document.createElement('p')
                    const p2 = document.createElement('p')
                    const p3 = document.createElement('p')
                    const completeBtn = document.createElement('button')
                    h2.textContent = project.name
                    p1.textContent = `Project description: ${project.description}`
                    p2.textContent = `Assigned to user: ${project.assigned_user_email}`
                    completeBtn.textContent = 'Complete project'
                    completeBtn.id = 'submit_project'
                    projectcard.append(h2, p1, p2, completeBtn)
                    getprojectDiv.append(projectcard)
                    // const projectId = `${project.project_id}`
                    completeBtn.addEventListener('click', (e)=>{
                        this.completeproject(project.project_id)
                    })
                })

            }).catch(err => console.log(err))

    }
    completeproject(projectId:string){
        
        new Promise<any>((resolve, reject) => {
            fetch(`http://localhost:7000/project/complete/${projectId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                // body: JSON.stringify({
                //     "project_id": projectId
                // })
            }).then(res => resolve(res.json()))
                .catch(err => reject(err))
        })
        .then(data => {
            console.log(data,projectId);
            
        })

    }


}
const uproject = new UserProject()
uproject.getProject(email)
