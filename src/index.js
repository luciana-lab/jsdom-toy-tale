let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  const toyCollection = document.getElementById('toy-collection');

  const addToyForm = document.querySelector('.add-toy-form');

  let btnLike = document.getElementsByClassName('like-btn');

  // Like Button
  toyCollection.addEventListener('click', (e) => {
    if (e.target.className === 'like-btn') {
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1

      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
        .then(r => r.json())
        .then(like => {
          e.target.previousElementSibling.innerText = `${like.likes} Likes`
        })
    }

    // Delete Button
    if (e.target.className === 'ldelete-btn') {
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'DELETE'
      })
        .then(r => {
          // debugger
          e.target.parentElement.remove()
        })
    }
  })


  // Add Toys Form
  addToyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    createNewToy(event.target[0].value, event.target[1].value)
  })

  function createNewToy(toyName, toyImg) {
    let formData = {
      "name": toyName,
      "image": toyImg,
      "likes": 0
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json())
      .then(toy => {
        toyCollection.innerHTML +=
          `
      <div class="card">
      <h2>${toy.name}</h2 >
      <img src=${toy.image} class="toy-avatar" />
      <p>< id="clicks">${toy.likes} Likes </p>
      <button class="like-btn" id=${toy.id}>$ Like <3</button>
      <button class="delete-btn" id=${toy.id}>Delete</button>
      </div >
      `
      })
  }


  // Display all the toys
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => getToys(data))

  // Another way to do it, with append
  // We don't care about the return value, just want to show in the DOM
  // It we can also use forEach or map
  function getToys(toys) {
    toys.forEach((toy) => {
      toyCollection.innerHTML +=
        `
    <div class="card">
    <h2>${toy.name}</h2 >
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" id=${toy.id}>Like <3</button>
    <button class="ldelete-btn" id=${toy.id}>Delete</button>
    </div >
    `
    })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});