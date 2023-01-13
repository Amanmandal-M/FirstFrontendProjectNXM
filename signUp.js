const baseUrl = "https://red-joyous-binturong.cyclic.app";
const postUrl = `${baseUrl}/addData`;
const getDataUrl = `${baseUrl}/allUsers`;
const getUserUrl = `${baseUrl}/getUserById/:id`;

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



let forms = document.getElementById("form");

forms.addEventListener("submit", (e) => {
  e.preventDefault();
 
  let p1 = document.querySelector("#Password").value;
  let p2 = document.querySelector("#ConfirmPassword").value;
 
  p1 == p2 ?  dataPresent() : alert("Please Check your Password");
});

function dataInput() {
  let inputs = document.querySelectorAll("input");
  let selected = document.querySelector("#Role").value;
  let obj = {};
  for (let i = 0; i < inputs.length - 1; i++) {
    if (inputs[i].id == "ConfirmPassword") {
      continue;
    } else {
      obj[inputs[i].id] = inputs[i].value;
      obj["Role"] = selected;
    }
  }
  
  dataImportDB(obj);
}

const dataImportDB = async (obj) => {
  try {
    const res = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (res.status === 200) {
      alert("Signup Successfully");
      sessionStorage.clear()
      setTimeout(() => {
        document.querySelector("#Username").value = "";
        document.querySelector("#EmailId").value = "";
        document.querySelector("#DateOfBirth").value = "";
        document.querySelector("#Location").value = "";
        document.querySelector("#Password").value = "";
        document.querySelector("#ConfirmPassword").value = "";
      }, 1000);
      location.pathname = "/login.html";
    } else {
      alert("Something Went Wrong");
    }
  } catch (error) {
    alert("Error in Fetching");
  }
};


const dataPresent = async()=>{
  try {
    const res = await fetch(getDataUrl,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    checkEmailPresent(data);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

const checkEmailPresent = (data)=>{
    const email = document.getElementById("EmailId").value;
    let flag = false;
    for(let i=0; i<data.length; i++) {
      if(data[i].EmailId == email){
        flag=true;
          break;
      }
    }

    flag == true ? alert("Your Credentials already registered") : dataInput() ;
}