const password = document.getElementById("password") as HTMLInputElement;
const nam = document.getElementById("email") as HTMLInputElement;
const submit = document.getElementById("submit") as HTMLButtonElement;
const register_name = document.getElementById("register_name") as HTMLInputElement;
const register_email = document.getElementById("register_email") as HTMLInputElement;
const register_password = document.getElementById("register_password") as HTMLInputElement;
const register = document.getElementById("register") as HTMLButtonElement;
const errorDiv = document.getElementById('error') as HTMLDivElement
const successDiv = document.getElementById('success') as HTMLDivElement
interface ErrorInterface{
    error: string
    message:string
    token:string
}

class Users {
    static getUser() {
        return new Users();
    }
    constructor() { }

    loginUser(email: string, password: string) {

        const prom = new Promise<{ error?: string, token?: string, message?: string }>((resolve, reject) => {
            fetch('http://localhost:7000/user/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(res => {
                resolve(res.json())
            }).catch(err => {
                reject(err)
            })
        })
        prom.then(data => {
            console.log(data);
            if (data.message !== 'Invalid password') {
                data.token ? localStorage.setItem('token', data.token) : ''
                this.redirect()
            }
            else{
                errorDiv.style.color="red"
                errorDiv.innerHTML = data.message
            }
        }).catch(err => console.log(err))

    }



    register(email: string, name: string, password: string) {

        const prom = new Promise<{ error?: string, message?: string }>((resolve, reject) => {

            fetch('http://localhost:7000/user/signup', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "name": name,
                    "password": password
                })
            }).then(res => {
                resolve(res.json())
            }).catch(err => {
                reject(err)
            })
        })
        prom.then(data => {
            if(data.message == "Registered new user..."){
                successDiv.style.color="green"
                successDiv.innerHTML = `${name}, you have successfully signed up! Please login on the right`
            }else{

            }
        }).catch(err => console.log(err))
    }
    redirect() {
        const token = localStorage.getItem('token') as string

        new Promise<{ name: string, role: string, email: string }>((resolve, reject) => {
            fetch('http://localhost:7000/user/check', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "GET",
            }).then(res => resolve(res.json()))
                .catch(err => reject(err))
        }).then(data => {
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            localStorage.setItem('role', data.role)

            if (data.role === 'admin') {
                location.href = "adminDashboard.html"
            } else {
                location.href = "userDashboard.html"
            }
        }
        )

    }
}
submit.addEventListener('click', () => {
    const nameinput = nam.value;
    const pass = password.value;

    if (nameinput == '' || pass == '') {
        console.log('Please fill in all fields');
    } else {
        Users.getUser().loginUser(nameinput, pass)
    }

})
register.addEventListener('click', () => {
    const nameinput = register_name.value;
    const emailinput = register_email.value;
    const pass = register_password.value;
    register_name.value=''
    register_email.value=''
    register_password.value=''

    if (nameinput == '' || emailinput == '' || pass == '') {
        console.log('Please fill in all fields');
    } else {
        Users.getUser().register(emailinput, nameinput, pass)
    }

})