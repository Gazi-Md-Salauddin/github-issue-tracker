const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener("click", () => {
  const userName = document.getElementById('userName').value;
  const password = document.getElementById('password').value;
  const defaultUser = "admin";
  const defaultPassword = "admin123"
  if(userName === defaultUser && password === defaultPassword){
    alert("Login successful");
    window.location.assign("home.html")
  }else{
    alert("Wrong username or password");
    return;
  }
})