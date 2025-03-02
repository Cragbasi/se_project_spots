// Initial data of image cards
const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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

// Finding and defining HTML elements as variables
const page = document.querySelector(".page");
const editProfileButton = page.querySelector("#editProfileButton");
const newPostButton = page.querySelector("#newPostButton");
const modalEditProfile = page.querySelector("#editProfile");
const submitProfileButton = modalEditProfile.querySelector("#saveEditProfile");
const modalNewPost = page.querySelector("#newPost");
const submitNewPostButton = modalNewPost.querySelector("#saveNewPostButton");
const closeEditProfileButton = modalEditProfile.querySelector(
  "#closeEditProfileButton"
);
const closeNewPostButton = modalNewPost.querySelector("#closeNewPostButton");
const formEditProfile = modalEditProfile.querySelector("#formEditProfile");
// const formNewPost = modalNewPost.querySelector("#formNewPost"); or better:
const formNewPost = document.forms["formNewPost"];
const enlargeModalImage = page.querySelector("#clickedPicture");
const modalImage = enlargeModalImage.querySelector(".modal__image");
const modalImageTitle = enlargeModalImage.querySelector(".modal__image-title");
const cardsElement = page.querySelector(".cards");
// Array of all modals aka pop ups
const popUps = Array.from(page.querySelectorAll(".modal"));

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
  modalImage.alt = image.alt;
  modalImageTitle.textContent = card.textContent;
  openModal(enlargeModalImage);
}

// Set image close button
const closeImageButton = enlargeModalImage.querySelector("#closeImageButton");
closeImageButton.addEventListener("click", () => {
  closeModal(enlargeModalImage);
});

//Make card from template function
function getCardElement(cardData) {
  const cardElement = cardsElement
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
  // const imageButton = cardElement.querySelector(".card__image-button");
  // imageButton.addEventListener("click", () => {
  //   clickImage(cardElement, cardImage);
  // }); Instead of creeating a button just listen on the image element click
  cardImage.addEventListener("click", () => {
    clickImage(cardElement, cardImage);
  });

  //return the ready HTML element with the filled-in data
  return cardElement;
}

//Desplay inital cards or added card
function displayCard(data) {
  if (Array.isArray(data)) {
    data.forEach((card) => {
      // Pass the array item to your getCardElement() function to create a card element.
      const cardDisplay = getCardElement(card);
      // Use the appropriate built-in DOM method to add this HTML element to the page.
      cardsElement.append(cardDisplay);
    });

    // This is for user input single card, separate from initial cards' array
  } else {
    const cardDisplay = getCardElement(data);
    cardsElement.prepend(cardDisplay);
  }
}

// Call display card funtion to display initial cards' array
displayCard(initialCards);

// If you want to use for loop
// for (let i = 0; i < initialCards.length; i++) {
//   // Pass the array item to your getCardElement() function to create a card element.
//   const card = getCardElement(initialCards[i]);
//   console.log(card);

// editProfileButton.addEventListener("click", modalOpen);
// closeEditProfile.addEventListener("click", modalClose);

// Defining profile and newpost modals' variables
const avatarInfo = page.querySelector(".avatar__information");
const profileInfoSave = [
  avatarInfo.querySelector(".avatar__name"),
  avatarInfo.querySelector(".avatar__description"),
];

const profileInfoValue = [
  modalEditProfile.querySelector("#name"),
  modalEditProfile.querySelector("#description"),
];

const modalNewPostValue = [
  modalNewPost.querySelector("#picture"),
  modalNewPost.querySelector("#caption"),
];

// Open or close modal without using toggle:
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalUsingEsc);

  // debugger;
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalUsingEsc);
}

// After listening to esc key when pressed, close modal
const closeModalUsingEsc = (evt) => {
  // debugger;
  console.log("at Esc");
  if (evt.key === "Escape" || evt.key === "Esc") {
    // Your code to execute when the Escape key is pressed
    // for each form element check for the opened form and close it
    popUps.forEach((popUp) => {
      // debugger;
      if (popUp.classList.contains("modal_opened")) {
        closeModal(popUp);
      }
    });
  }
};

// Listen to modal background when clicked and close modal upon click

popUps.forEach((popUp) => {
  console.log("at mousedown");
  popUp.addEventListener("mousedown", (evt) => {
    console.log("1", evt, "2", evt.target, "3", evt.currentTarget);
    if (
      popUp.classList.contains("modal_opened") &&
      evt.target === evt.currentTarget
    ) {
      closeModal(evt.target);
    }
  });
});
// closeModalUsingBackground(modal);
// const closeModalUsingBackground = (modal) => {
//   modal.addEventListener("mousedown", (evt) => {
//     // evt.target.classList.remove("modal_opened");
//     closeModal(evt.target);
//   });
// };

// Pop-up or close modal (toggle modal)
// function toggleModal(modal) {
//   modal.classList.toggle("modal_opened");
// }
// Select all modal elements (not needed?)
// const modalElements = page.querySelectorAll(".modal");
// function modalClose() {
//   console.log("here");
//   modalElements.forEach((modal) =>
//     modal.addEventListener("click", (evt) => {
//       evt.target.classList.remove("modal_opened");
//     })
//   );
// }

// Event listeners to toggle edit profile and newpost modals on and off
editProfileButton.addEventListener("click", () => {
  resetErrorDisplayedInEditProfileModal(modalEditProfile, settings);
  disableSubmitButton(submitProfileButton);
  openModal(modalEditProfile);
  // TODO: Get the values of each form field from the value property
  // of the corresponding input element.

  for (let i = 0; i < profileInfoValue.length; i++) {
    profileInfoValue[i].value = profileInfoSave[i].textContent;
  }
});
closeEditProfile.addEventListener("click", () => {
  closeModal(modalEditProfile);
});
newPostButton.addEventListener("click", () => {
  openModal(modalNewPost);
});

closeNewPostButton.addEventListener("click", function () {
  closeModal(modalNewPost);
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
  closeModal(modalEditProfile);

  disableSubmitButton(submitProfileButton);
  formEditProfile.reset();
}

function handleformNewPostSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // TODO: Then insert these new values

  const cardData = {
    name: modalNewPostValue[1].value,
    link: modalNewPostValue[0].value,
  };

  // Call the function to display added card
  displayCard(cardData);
  // TODO: Close the modal.
  closeModal(modalNewPost);
  // Clear the inputs after a successful adding of a new card to let the user add the 2nd one again without having to remove the old data manually.
  evt.target.reset();
  // Or
  // modalNewPostValue[1].value = "";
  // modalNewPostValue[0].value = "";
  disableSubmitButton(submitNewPostButton);
}

// Modal form submit event listeners for edit profile and new post
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPost.addEventListener("submit", handleformNewPostSubmit);
