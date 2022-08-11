const admin = document.getElementById('admin') as HTMLParagraphElement;
const namess = localStorage.getItem('name')
const project_name = document.getElementById("project_name") as HTMLInputElement;
const project_description = document.getElementById("project_description") as HTMLInputElement;
const project_end_date = document.getElementById("project_end_date") as HTMLInputElement;
const submit_project = document.getElementById("submit_project") as HTMLButtonElement;
const pname = document.getElementById('pName') as HTMLParagraphElement;
const pdescription = document.getElementById('pDescription') as HTMLParagraphElement;
const pEnddate = document.getElementById('pEnddate') as HTMLParagraphElement;

if(namess){
    admin.textContent=`Welcome Admin: ${namess}, Add a Project`
}
class Projects {
    static getProject() {
        return new Projects();
    }
    constructor() { }

    addProject(name: string, description: string, end_date:string) {

        const prom = new Promise<{ error?: string, token?: string, message?: string }>((resolve, reject) => {
            // console.log(email,password);
            fetch('http://localhost:7000/project/newproject', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body: JSON.stringify({
                    "name": name,
                    "description":description,
                    "end_date": end_date
                })
            }).then(res => {
                
                resolve(res.json())
            }).catch(err => {
                reject(err)
            })
        })
        prom.then(data=>{
            // console.log(data);
            this.redirect()
        }).catch(err=>console.log(err))

    }

    redirect(){
        new Promise<{name:string,description:string, end_date:string}>((resolve,reject)=>{
            fetch('http://localhost:7000/project/projects',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method:"GET",
            }).then(res=>resolve(res.json()))
            .catch(err=>reject(err))
        }).then(data=>{
            console.log(data)
        
        }
        )
        
    }
}
submit_project.addEventListener('click', () => {
    const nameinput = project_name.value;
    const descriptioninput= project_description.value; 
    const enddateinput = project_end_date.value

    if (nameinput == '' || descriptioninput == '' || enddateinput == '') {
        console.log('Please fill in all fields');
    } else {
        Projects.getProject().addProject(nameinput, descriptioninput, enddateinput)
    }

})