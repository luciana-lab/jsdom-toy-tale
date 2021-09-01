let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  const toyCollection = document.getElementById('toy-collection');

  const addToyForm = document.querySelector('.add-toy-form');
  const inputToyName = document.querySelectorAll('.input-text')[0];
  const inputImgURL = document.querySelectorAll('.input-text')[1];
  const btnCreateNewToy = document.querySelector('.submit');

  addToyForm.addEventListener('click', function () {
    if (inputToyName.textContent !== "" && inputImgURL !== "") {
      btnCreateNewToy.preventDefault();
    }
  })

  // const formData = new FormData();
  // formData.append(inputToyName.textContent)
  // formData.append(inputImgURL)

  let formData = {
    "name": inputToyName.textContent,
    "image": inputImgURL.textContent,
    "likes": 0
  }

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // body: formData
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", confiObj)
    .then(resp => resp.json())
    .then(data => getToys(data))

  function getToys(toys) {
    // console.log(toys)

    // map gives a new return value
    toys.forEach((toy) => {
      toyCollection.innerHTML += `
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

/*
const toyCollection = document.getElementById('toy-collection');

const newDiv = document.createElement('div');
newDiv.classList.add('card');
const card = document.createTextNode('Card');
newDiv.appendChild(card);
const classCard = document.body.appendChild(newDiv)
const divClassCard = toyCollection.appendChild(classCard);


fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    data.forEach(toy => renderToy(toy))
  })

function renderToy(toy) {
  const h2 = document.createElement('h2');
  h2.innerHTML = toy.name
  divClassCard.appendChild(h2)

  const imgTag = document.createElement('img');
  imgTag.src = toy.image
  imgTag.classList.add('toy-avatar')
  // const toyAvatar = document.createTextNode('Avatar')
  divClassCard.appendChild(imgTag)

  const pTag = document.createElement('p');
  pTag.innerHTML = `${ toy.likes } likes`
  divClassCard.appendChild(pTag)

  const likeButton = document.createElement('button');
  likeButton.classList.add('like-btn')
  const likeBtn = document.createTextNode('Like')
  likeButton.appendChild(likeBtn)

  divClassCard.appendChild(likeButton)
}

// function submitData(name, image, likes) {

//   const configObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(
//       name,
//       image,
//       likes {
//       method: "PATCH"
//     }
//     )
//   }

//   function renderToy(toy) {
//     const h2 = document.createElement('h2');
//     h2.innerHTML = toy.name
//     divClassCard.appendChild(h2)

//     const imgTag = document.createElement('img');
//     imgTag.src = toy.image
//     imgTag.classList.add('toy-avatar')
//     // const toyAvatar = document.createTextNode('Avatar')
//     divClassCard.appendChild(imgTag)

//     const pTag = document.createElement('p');
//     pTag.innerHTML = `${ toy.likes } likes`
//     divClassCard.appendChild(pTag)

//     const likeButton = document.createElement('button');
//     likeButton.classList.add('like-btn')
//     const likeBtn = document.createTextNode('Like')
//     likeButton.appendChild(likeBtn)

//     divClassCard.appendChild(likeButton)
//   }

//   fetch("http://localhost:3000/toys", configObj)
//     .then(resp => resp.json())
//     .then(data => {
//       data.forEach(toy => renderToy(toy))
//     })

// }
*/