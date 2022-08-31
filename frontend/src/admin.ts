const admin = document.getElementById('admin') as HTMLParagraphElement;
const namess = localStorage.getItem('name')
const project_name = document.getElementById("project_name") as HTMLInputElement;
const project_description = document.getElementById("project_description") as HTMLInputElement;
const project_end_date = document.getElementById("project_end_date") as HTMLInputElement;
const assignedemailinput = document.getElementById("assigned_user_email") as HTMLInputElement;
const submit_project = document.getElementById("submit_project") as HTMLButtonElement;
// const pname = document.getElementById('pName') as HTMLParagraphElement;
// const pdescription = document.getElementById('pDescription') as HTMLParagraphElement;
// const pEnddate = document.getElementById('pEnddate') as HTMLParagraphElement;
const getusersDiv = document.getElementById('usersDiv') as HTMLDivElement;
const allUsers = document.getElementById('allUsers') as HTMLInputElement
const getuserprojectDiv = document.getElementById('userProject') as HTMLDivElement
const error= document.getElementById('error') as HTMLDivElement


interface User {
    name: string
    email: string
    status: number
}
interface ProjectInterface {
    project_id: string,
    name: string,
    description: string,
    end_date: string,
    issent: number,
    // user_id: string,
    assigned_user_email: string
}

if (namess) {
    admin.textContent = `Welcome Admin: ${namess}, Add a Project`
}

class Projects {
    static getProject() {
        return new Projects();
    }
    constructor() { }

    addProject(name: string, description: string, end_date: string, assigned_user_email: string) {

        const prom = new Promise<{ error?: string, token?: string, message?: string }>((resolve, reject) => {
            fetch('http://localhost:7000/project/newproject', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "description": description,
                    "end_date": end_date,
                    "assigned_user_email": assigned_user_email
                })
            }).then(res => {

                resolve(res.json())
            }).catch(err => {
                reject(err)
            })
        })
        prom.then((data) => {
            
            this.fetchProject()
        }).catch(err => console.log(err))

    }

    async redirect() {
        const res = await fetch('http://localhost:7000/project/projects');
        const data = await res.json();



    }

    fetchUsers() {
        const token = localStorage.getItem('token') as string
        new Promise<any>((resolve, reject) => {
            fetch('http://localhost:7000/user/users', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    token
                },
                method: "GET",
            }).then(res => resolve(res.json()))
                .catch(err => reject(err))
        }).then(data => {


            data.map((user: User) => {

                let html = `
            <option value=${user.email}>${user.email}</option>
            `

                allUsers.insertAdjacentHTML('beforeend', html)
            })


        }

        )
    }


    fetchProject() {
        const prom=new Promise<ProjectInterface[]>((resolve, reject) => {
            fetch('http://localhost:7000/project/projects', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            }).then(res => resolve(res.json()))
                .catch(err => reject(err))
        })
        prom.then((data)=> {
            console.log(data);
            
            getuserprojectDiv.innerHTML = '';
            data.map((project:ProjectInterface) => {
                const projectcard = document.createElement('div')
                projectcard.id = 'projectCard'
                const h2 = document.createElement('h2')
                const p1 = document.createElement('p')
                const p2 = document.createElement('p')
                const deleteBtn = document.createElement('button')
                h2.textContent = project.name
                p1.textContent = `Project description: ${project.description}`
                p2.textContent = `Assigned to user: ${project.assigned_user_email}`
                deleteBtn.textContent = 'Delete project'
                deleteBtn.id = 'deleteBtn'
                projectcard.append(h2, p1, p2, deleteBtn)
                getuserprojectDiv.append(projectcard)
                const projectId = `${project.project_id}`
                deleteBtn.addEventListener('click', (e) => {
                    this.handleDelete(projectId)
                    setTimeout(()=>{
                        window.location.reload()
                    },1000)

                })
            })


        }

        )
    }
    handleDelete( projectId: string) {
        const prom = new Promise<{ projectId: string }>((resolve, reject) => {
            fetch('http://localhost:7000/project/deleteProject', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "project_id": projectId
                })
            }).then(res => resolve(res.json()))
                .catch(err => reject(err))
        })
        prom.then(data => {
            console.log(data, projectId);
            // this.addProject()

        }).catch(err => console.log(err))

    }
}



const u = new Projects()
u.fetchUsers()
u.fetchProject()
// const userp = new Projects()
// userp.fetchProject()


submit_project.addEventListener('click', () => {
    const nameinput = project_name.value;
    const descriptioninput = project_description.value;
    const enddateinput = project_end_date.value;
    const assignedemailinput = allUsers.value;
    project_name.value = '';
    project_description.value = '';
    project_end_date.value = '';

    if (nameinput == '' || descriptioninput == '' || enddateinput == '' || assignedemailinput == '') {
        console.log('Please fill in all fields');
        // error.style.color="red"
        // error.innerHTML = 'Please fill in all fields'
    } else {

        Projects.getProject().addProject(nameinput, descriptioninput, enddateinput, assignedemailinput)
    }

})
