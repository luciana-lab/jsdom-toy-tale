let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  const toyCollection = document.getElementById('toy-collection');

  const addToyForm = document.querySelector('.add-toy-form');

  function likes(e) {
    e.preventDefault();
    let more = parseInt(e.target.previousElementSiblings.innerText) + 1

    let btnLike = document.getElementsByClassName('like-btn');

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": more
      })
    })
      .then(res => res.json())
      .then((like_obj => {
        for (let i = 0; i < btnLike.length; i++) {
          btnLike[i].addEventListener('click', function (e) {

            e.preventDefault();
            e = `${more} likes`;
          })
        }
      }))
  }

  // let btnLike = document.getElementsByClassName('like-btn');
  // for (let i = 0; i < btnLike.length; i++) {
  //   btnLike[i].addEventListener('click', function (e) {
  //     console.log(e)
  //     e.preventDefault();
  //     likes(e)
  //   })
  // }


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
      // body: formData
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json())
      .then(data => getToy(data))

    function getToy(toy) {
      toyCollection.innerHTML +=
        `
      <div class="card">
      <h2>${toy.name}</h2 >
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id=${toy.id}>$ Like <3</button>
      <button class="ldelete-btn" id=${toy.id}>Delete</button>
      </div >
        `
    }
  }

  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => getToys(data))

  function getToys(toys) {
    // console.log(toys)
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