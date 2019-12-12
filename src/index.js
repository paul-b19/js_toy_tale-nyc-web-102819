const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const actualForm = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE

let toyCollectionDiv = document.getElementById("toy-collection")
fetch ('http://localhost:3000/toys') 
  .then (function (response) {
    return response.json()
  })
  .then(function (toyCollection) {
    toyCollection.forEach (function (toy) {
      let div = document.createElement("div")
      div.setAttribute("class", "card")
      toyCollectionDiv.appendChild(div)
      div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span>${toy.likes}</span> Likes </p>
      <button name = "like" class="like-btn">Like <3</button>
      <button name = "delete" class="like-btn">Delete</button>
      `
      div.setAttribute("id", `${toy.id}`)
    })
  });

toyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("submitted")
  let formData = new FormData(actualForm)
  let nameInput = formData.get("name")
  let imageInput = formData.get("image")
  // let nameField = document.querySelector("name = name")
  console.log(nameInput)
  console.log(imageInput)
  fetch ('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify ({
      "name": `${nameInput}`,
      "image": `${imageInput}`,
      "likes": 0
      })
  })
  let div = document.createElement("div")
  div.setAttribute("class", "card")
  toyCollectionDiv.appendChild(div)
  div.innerHTML = `
    <h2>${nameInput}</h2>
    <img src=${imageInput} class="toy-avatar" />
    <p><span>0</span> Likes </p>
    <button name = "like" class="like-btn">Like <3</button>
    <button name = "delete" class="like-btn">Delete</button>
    `
  
  actualForm.reset()
  toyForm.style.display = 'none'

})

document.addEventListener("click", function (e) {
  toyDiv = e.target.parentNode 
  likes = parseInt(toyDiv.querySelector("span").innerText)
  switch (e.target.name) {
    case("like"): 
      fetch (`http://localhost:3000/toys/${toyDiv.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify ({
          "likes": `${likes + 1}`
        })
      })
      toyDiv.querySelector("span").innerText = 
        parseInt(toyDiv.querySelector("span").innerText) + 1
    break;
    case ("delete"):
      fetch(`http://localhost:3000/toys/${toyDiv.id}`, {
        method: "DELETE"
      })
      toyDiv.remove();
    break;
    default:
      null
    }
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!