let usernameStorage = sessionStorage.getItem("Username");


if (usernameStorage) {
  let lists = document.getElementsByClassName("lists");

  lists[0].childNodes[8].previousElementSibling.innerHTML=""
  lists[0].childNodes[8].previousElementSibling.innerHTML= `
    <div id="localsName">${usernameStorage}</div>
    <buttton id="localName">LogOut</button>
  `
  lists[0].childNodes[8].previousElementSibling.href="";

  document.getElementById("localName").addEventListener("click",(e)=>{
      sessionStorage.clear()
  })
}
