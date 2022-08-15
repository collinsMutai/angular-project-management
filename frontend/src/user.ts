const users = document.getElementById('user') as HTMLHeadingElement;
const projdecs = document.getElementById('projdec') as HTMLParagraphElement;
const names = localStorage.getItem('name')
const projectD = localStorage.getItem('project')
const getuserprojectDiv = document.getElementById('userProject') as HTMLDivElement



if(names || projectD){
    users.textContent=`Welcome User: ${names}, Here's your Project`
    projdecs.textContent=`Project name: ${projectD}`
}
class UserProject {
   
    constructor() { }

 fetchProject() {
    new Promise<any>((resolve, reject) => {
        fetch('http://localhost:7000/project/project', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        }).then(res => resolve(res.json()))
            .catch(err => reject(err))
    }).then(data => {
        console.log(data);
        
          
    //   data.map((project:ProjectInterface)=>{
    //     console.log(project);
       
    //     const p1 = document.createElement('p')
    //     const p2 = document.createElement('p')
    //     p1.textContent = project.name
    //     p2.textContent = project.description
    //     getuserprojectDiv.append(p1,p2)
    //    })


    }
  
    )
}

}
const userp = new UserProject()
userp.fetchProject()