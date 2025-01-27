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
const modalEditProfile = page.querySelector(".modal");
const closeEditProfile = modalEditProfile.querySelector(".modal__button-close");
const formEditProfile = modalEditProfile.querySelector(".modal__form");
let cardsElement = page.querySelector(".cards");

function getCardElement(cardData) {
  let cardElement = cardsElement
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);
  // select the card title and image and store them in variables
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__description").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;

  //return the ready HTML element with the filled-in data
  return cardElement;
}
for (let i = 0; i < initialCards.length; i++) {
  // Pass the array item to your getCardElement() function to create a card element.
  card = getCardElement(initialCards[i]);
  console.log(card);

  // Use the appropriate built-in DOM method to add this HTML element to the page.
  cardsElement.append(card);
}

// Without using toggle:
// function modalOpen() {
//   modalEditProfile.classList.add("modal__opened");
// }
// function modalClose() {
//   modalEditProfile.classList.remove("modal__opened");
// }
// editProfileButton.addEventListener("click", modalOpen);
// closeEditProfile.addEventListener("click", modalClose);

console.log("I'm working");

const avatarInfo = page.querySelector(".avatar__information");
let avatarInfoSave = [
  avatarInfo.querySelector(".avatar__name"),
  avatarInfo.querySelector(".avatar__description"),
];

let avatarInfoValue = [
  modalEditProfile.querySelector("#name"),
  modalEditProfile.querySelector("#description"),
];

function modalToggle() {
  modalEditProfile.classList.toggle("modal__opened");

  // TODO: Get the values of each form field from the value property
  // of the corresponding input element.

  for (let i = 0; i < avatarInfoValue.length; i++) {
    avatarInfoValue[i].value = avatarInfoSave[i].textContent;
  }
}
editProfileButton.addEventListener("click", modalToggle);
closeEditProfile.addEventListener("click", modalToggle);

function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // TODO: Then insert these new values into the textContent property of the
  // corresponding profile elements.

  for (let i = 0; i < avatarInfoValue.length; i++) {
    avatarInfoSave[i].textContent = avatarInfoValue[i].value;
  }
  // TODO: Close the modal.
  modalToggle();
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
