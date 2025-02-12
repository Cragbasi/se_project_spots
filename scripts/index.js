const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const page = document.querySelector(".page");
const editProfileButton = page.querySelector("#editProfileButton");
const newPostButton = page.querySelector("#newPostButton");
const modalEditProfile = page.querySelector("#editProfile");
const modalNewPost = page.querySelector("#newPost");
const closeEditProfileButton = modalEditProfile.querySelector(
  "#closeEditProfileButton"
);
const closeNewPostButton = modalNewPost.querySelector("#closeNewPostButton");
const formEditProfile = modalEditProfile.querySelector("#formEditProfile");
const formNewPost = modalNewPost.querySelector("#formNewPost");
const enlargeModalImage = page.querySelector("#clickedPicture");
const modalImage = enlargeModalImage.querySelector(".modal__image");

let cardsElement = page.querySelector(".cards");

//Delete card function
function deleteCard(card) {
  card.remove(card);
}

//Activate love button funtion
function activateLoveButton(love) {
  love.classList.toggle("card__love-button_activated");
}

// Click image to enlarge function
function clickImage(card, image) {
  modalImage.src = image.src;
  console.log(modalImage);
  enlargeModalImage.querySelector(".modal_image-title").textContent =
    card.textContent;
  enlargeModalImage.classList.toggle("modal_opened");
}

// Close image function
function closeImage() {
  enlargeModalImage.classList.toggle("modal_opened");
}

// Set image close button
const closeImageButton = enlargeModalImage.querySelector("#closeImageButton");
closeImageButton.addEventListener("click", () => {
  closeImage();
});

//Make card from template function
function getCardElement(cardData) {
  let cardElement = cardsElement
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);
  // select the card title and image and store them in variables
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__description").textContent = cardData.name;

  //Set love button
  const loveButton = cardElement.querySelector(".card__love-button");
  loveButton.addEventListener("click", () => {
    activateLoveButton(loveButton);
  });
  // Set delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  // Set image click button
  const imageButton = cardElement.querySelector(".card__image-button");
  imageButton.addEventListener("click", () => {
    clickImage(cardElement, cardImage);
  });

  //return the ready HTML element with the filled-in data
  return cardElement;
}

//Desplay inital cards or added card
function displayCard(card) {
  if (Array.isArray(card)) {
    card.forEach((card) => {
      // Pass the array item to your getCardElement() function to create a card element.
      let cardDisplay = getCardElement(card);
      console.log(cardDisplay);
      cardsElement.append(cardDisplay);
    });

    // Use the appropriate built-in DOM method to add this HTML element to the page.
  } else {
    let cardDisplay = getCardElement(card);
    cardsElement.prepend(cardDisplay);
  }
}

displayCard(initialCards);

// If you want to use for
// for (let i = 0; i < initialCards.length; i++) {
//   // Pass the array item to your getCardElement() function to create a card element.
//   const card = getCardElement(initialCards[i]);
//   console.log(card);

// Without using toggle:
// function modalOpen() {
//   modalEditProfile.classList.add("modal_opened");
// }
// function modalClose() {
//   modalEditProfile.classList.remove("modal_opened");
// }
// editProfileButton.addEventListener("click", modalOpen);
// closeEditProfile.addEventListener("click", modalClose);

console.log("I'm working");

// Defining profile and newpost modals' variables
const avatarInfo = page.querySelector(".avatar__information");
let profileInfoSave = [
  avatarInfo.querySelector(".avatar__name"),
  avatarInfo.querySelector(".avatar__description"),
];

let profileInfoValue = [
  modalEditProfile.querySelector("#name"),
  modalEditProfile.querySelector("#description"),
];

let modalNewPostValue = [
  modalNewPost.querySelector("#picture"),
  modalNewPost.querySelector("#caption"),
];

// Close modal
function toggleModal(modal) {
  modal.classList.toggle("modal_opened");

  // TODO: Get the values of each form field from the value property
  // of the corresponding input element.

  for (let i = 0; i < profileInfoValue.length; i++) {
    profileInfoValue[i].value = profileInfoSave[i].textContent;
  }
}

// Event listeners to toggle edit profile and newpost modals on and off
editProfileButton.addEventListener("click", () => {
  toggleModal(modalEditProfile);
});
closeEditProfile.addEventListener("click", () => {
  toggleModal(modalEditProfile);
});
newPostButton.addEventListener("click", () => {
  toggleModal(modalNewPost);
});

closeNewPostButton.addEventListener("click", function () {
  toggleModal(modalNewPost);
});

// Handle submitted profile function
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // TODO: Then insert these new values into the textContent property of the
  // corresponding profile elements.

  for (let i = 0; i < profileInfoValue.length; i++) {
    profileInfoSave[i].textContent = profileInfoValue[i].value;
  }
  // TODO: Close the modal.
  toggleModal(modalEditProfile);
}

function handleformNewPostSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // TODO: Then insert these new values

  initialCards.unshift = {
    name: modalNewPostValue[1].value,
    link: modalNewPostValue[0].value,
  };

  // Call the function to display added card
  displayCard(initialCards.unshift);
  // TODO: Close the modal.
  toggleModal(modalNewPost);
}

// Modal form submit event listeners for edit profile and new post
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPost.addEventListener("submit", handleformNewPostSubmit);
