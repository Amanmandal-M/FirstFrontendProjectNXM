const baseUrl = "https://red-joyous-binturong.cyclic.app";
const postUrl = `${baseUrl}/addLoginData`;
const getToken = `${baseUrl}/tokens`;

const submitButton = document.getElementById("form");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  getData();
});

function getData() {
  const email = document.getElementById("EmailId").value;
  const password = document.getElementById("Password").value;

  let obj = {
    EmailId: email,
    Password: password,
  };

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
    if (res.ok==true) {
        let data = await res.json();

        if (data.status === 200) {
            const name = data.user[0].Username;
            const tokenCopy = data.Token;
            console.log(tokenCopy);                               //user Takes token from here
            dataImportToken(tokenCopy, name);
        } else {
            alert("Login failed");
        }

    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.log("Error While Posting");
    alert("Login Failed");
  }
};

const dataImportToken = async (tokenCopy, name) => {
  try {
    const resp = await fetch(getToken, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${tokenCopy}`,
      },
    });

    if (resp.status === 200) {
      alert("Login Successfully");
      setTimeout(() => {
        document.querySelector("#EmailId").value = "";
        document.querySelector("#Password").value = "";
      }, 1000);
      location.pathname = "/index.html";
      sessionStorage.setItem("Username", name);
    } else {
      alert("Login failed");
    }
  } catch (error) {
    alert("Login failed");
  }
};
