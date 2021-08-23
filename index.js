async function getUsers() {
    const data = await fetch(
      "https://611f276f9771bf001785c7a0.mockapi.io/users",
      { method: "GET" }
    );
    const users = await data.json();
    // console.log(users);
    document.querySelector(".user-list").innerHTML = ``;
    users.forEach((user) => createUser(user));
  }
  
  function createUser({ avatar, name, createdAt, id }) {
    const info = document.createElement("div");
    info.setAttribute("class", "container");
  
    info.innerHTML = `
    <div class="avatar-container">
         <img class="avatar" src=${avatar} width="75px" height="75px" />
    </div>
    
    <div class="details">
      <h3>${name}</h3>
      <p>${new Date(createdAt).toDateString()}</p>
      <button onclick="deleteUser(${id})">Delete</button>
    </div>
  </div>
  `;
  
    document.querySelector(".user-list").append(info);
  }
  
  getUsers();
  
  // Delete user
  
  async function deleteUser(id) {
    const data = await fetch(
      `https://611f276f9771bf001785c7a0.mockapi.io/users/${id}`,
      { method: "DELETE" }
    );
    const user = await data.json();
    console.log(user);
    getUsers();
  }
  
  function addUser() {
    const type =
      document.querySelector(".submit-users").innerText === "Edit Users"
        ? "Edit"
        : "Add";
  
    const name = document.querySelector(".add-username").value;
    const avatar = document.querySelector(".add-avatar").value;
    const createdAt = new Date();
    const userDetails = {
      name: name,
      avatar: avatar,
      createdAt: createdAt
    };
  
    const method = type === "Add" ? "POST" : "PUT";
    const userId = type === "Add" ? "" : localStorage.getItem("userId");
    // Add User to the mockapi
    // 'https://60c98aa8772a760017203b57.mockapi.io/users/' + userId
    fetch(`https://611f276f9771bf001785c7a0.mockapi.io/users/${userId}`, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    }).then((users) => refreshUsers());
  }
  
  function refreshUsers() {
    document.querySelector(".container").remove();
    formReset();
    getUsers();
  }
  
  function formReset() {
    document.querySelector(".submit-users").innerText = "Add Users";
    document.querySelector(".add-username").value = "";
    document.querySelector(".add-avatar").value = "";
  }