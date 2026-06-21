const switchForm = document.querySelector('#switchForm');
const authSwitch = document.querySelector('#authSwitch');
const authButton = document.querySelector('#authButton ');
const formTitle  = document.querySelector('#form-title ');

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

let signIn = true;
document.body.addEventListener('click',(e)=>{
  if(e.target.id !== 'switchForm') return
    switchauthForm()
})

const authForm = document.getElementById('authForm').addEventListener('submit',(e)=>{
  e.preventDefault()
  const user = {
  username:signIn ? undefined: username.value,
  email: email.value,
  password: password.value,
  }
  if(signIn){
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user)=> user.email === email.value && user.password === password.value);

    if(existingUser){
      const onlineUser = localStorage.setItem('onlineUser',JSON.stringify(existingUser));

        window.location.href = 'Login.html'
    }else{
      alert('invalid Credentials')
      return
    }
  }else{
       const users = JSON.parse(localStorage.getItem('users')) || [];
       const existingUser = users.find((user)=> user.username === username.value && user.password === password.value)
       if(existingUser){
        alert('this user is already Exist')
        return
       }
         users.push(user);
        localStorage.setItem('users',JSON.stringify(users))
       
        switchauthForm()

         if(confirmPassword.value !== password.value){
         alert('password mismarch')
        return
  }
  } 
})

function switchauthForm(){
   signIn = !signIn
  if(!signIn){
  authButton.textContent = 'Sign Up';
  formTitle.textContent  = 'Sign Up';
  username.style.display = 'block';
  confirmPassword.style.display = 'block';
  authSwitch.innerHTML = `
    Already have an account? <a href ='#' id='switchForm'>Sign In</a>
  `
  }else{
  authButton.textContent = 'Sign In';
  formTitle.textContent  = 'Sign In';
  username.style.display = 'none';
  confirmPassword.style.display = 'none';
  username.value = ''
  confirmPassword.value = ''
  email.value = ''
  password.value = ''
  authSwitch.innerHTML = `
    Already have an account? <a href ='#' id='switchForm'>Sign In</a>
  `
  }
}