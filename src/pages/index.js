import {
  resetErrorDisplayedInEditProfileModal,
  disableSubmitButton,
  enableValidation,
} from "../scripts/validation.js";
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__input-error_active",
};
import "./index.css";
import { Api } from "../scripts/Api.js";
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
const profile = page.querySelector(".profile");
const editProfileButton = page.querySelector("#editProfileButton");
const editProfileOverlayedButton = page.querySelector(
  "#editProfileOverlayedButton"
);
const newPostButton = page.querySelector("#newPostButton");
const modalEditProfile = page.querySelector("#editProfile");
const modalEditProfileAvatar = page.querySelector("#editProfileAvatar");
const submitProfileButton = modalEditProfile.querySelector("#saveEditProfile");
const formEditProfileAvatar = document.forms["editProfileAvatarForm"];

const modalNewPost = page.querySelector("#newPost");
const submitNewPostButton = modalNewPost.querySelector("#saveNewPostButton");
const closeEditProfileButton = modalEditProfile.querySelector(
  "#closeEditProfileButton"
);
const closeEditProfileAvatarButton = modalEditProfileAvatar.querySelector(
  "#closeEditProfileAvatarButton"
);
const editProfileAvatarSubmitButton = modalEditProfileAvatar.querySelector(
  "#editProfileAvatarSubmitButton"
);

const closeNewPostButton = modalNewPost.querySelector("#closeNewPostButton");
const formEditProfile = modalEditProfile.querySelector("#formEditProfile");
// const formNewPost = modalNewPost.querySelector("#formNewPost"); or better:
const formNewPost = document.forms["formNewPost"];
const enlargeModalImage = page.querySelector("#clickedPicture");
const modalImage = enlargeModalImage.querySelector(".modal__image");
const modalImageTitle = enlargeModalImage.querySelector(".modal__image-title");
const cardsElement = page.querySelector(".cards");
const modalDeleteCard = page.querySelector("#deleteImageQuery");
const confirmCardDeleteButton =
  modalDeleteCard.querySelector("#confirmCardDelete");
const cancelCardDeleteButton =
  modalDeleteCard.querySelector("#cancelCardDelete");
// Array of all modals aka pop ups
const popUps = Array.from(page.querySelectorAll(".modal"));
// Outside of any functions, declare variables to store the current selected
// card and its ID. You will assign them values when a delete icon is clicked.
let selectedCard;
let selectedCardId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "263132f6-100d-422f-9deb-cb4a2234cfd1",
    "Content-Type": "application/json",
  },
});

api
  .renderUserInfo()
  .then((result) => {
    // process the result
    // console.log(result);
    setInitialProfile(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

function setInitialProfile(initialProfile) {
  profileInfoSave[0].textContent = initialProfile.name;
  profileInfoSave[1].textContent = initialProfile.about;
  modalAvatarImage.src = initialProfile.avatar;
}

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

const modalAvatarImage = profile.querySelector(".avatar__image");

const modalEditProfileAvatarImageInput =
  modalEditProfileAvatar.querySelector("#picture");

// // Event listeners to toggle edit profile and newpost modals on and off
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

editProfileOverlayedButton.addEventListener("click", () => {
  resetErrorDisplayedInEditProfileModal(modalEditProfileAvatar, settings);
  disableSubmitButton(formEditProfileAvatar);
  openModal(modalEditProfileAvatar);

  // TODO: Get the values of each form field from the value property
  // of the corresponding input element.
});
// Handle submitted profile function
function handleEditProfileAvatarFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // notify the user that the upload process is underway
  // by changing the button text to "Saving..."
  editProfileAvatarSubmitButton.textContent = "Saving...";

  // TODO: Then insert these new values into the src property of the
  // profile image.
  modalAvatarImage.src = modalEditProfileAvatarImageInput.value;

  // Send the following PATCH request to change the profile picture
  api
    .changeProfilePicture(modalEditProfileAvatarImageInput.value)
    .then((result) => {
      // process the result
      console.log(result);
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })
    .finally(() => {
      // Change button text back to original
      editProfileAvatarSubmitButton.textContent = "Save";

      disableSubmitButton(editProfileAvatarSubmitButton);
      formEditProfileAvatar.reset();
      // TODO: Close the modal.
      closeModal(modalEditProfileAvatar);
    });
}
// Handle submitted profile function
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // Change button text to "Saving..."
  submitProfileButton.textContent = "Saving...";

  // TODO: Then insert these new values into the textContent property of the
  // corresponding profile elements.
  for (let i = 0; i < profileInfoValue.length; i++) {
    profileInfoSave[i].textContent = profileInfoValue[i].value;
  }

  // Editing the profile text content
  // Save to server, call API and editUserInfo: /uers/me
  api
    .editUserInfo({
      name: profileInfoValue[0].value,
      about: profileInfoValue[1].value,
    })
    .then((result) => {
      // process the result
      // console.log(result);
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })

    .finally(() => {
      // Change button text back to original
      submitProfileButton.textContent = "Save";

      disableSubmitButton(submitProfileButton);
      formEditProfile.reset();
      // TODO: Close the modal.
      closeModal(modalEditProfile);
    });
}

// Loading cards from the server
api
  .getInitialCards()
  .then((result) => {
    // process the result
    // console.log(result);
    displayCard(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

function handleformNewPostSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  // Change button text to "Saving..."
  submitNewPostButton.textContent = "Saving...";

  // TODO: Then insert these new values

  const cardData = {
    name: modalNewPostValue[1].value,
    link: modalNewPostValue[0].value,
  };
  // Send a POST request to add a new card to the server:
  api
    .postCard(cardData.name, cardData.link)
    .then((result) => {
      // process the result
      // console.log(result);
      // Call the function to display added card
      displayCard(result);
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })
    .finally(() => {
      // Change button text back to original
      submitNewPostButton.textContent = "Deliting";

      disableSubmitButton(submitNewPostButton);
      // Clear the inputs after a successful adding of a new card
      // to let the user add the 2nd one again without having to remove the old data manually.
      formNewPost.reset();
      // TODO: Close the modal.
      closeModal(modalNewPost);
    });
}
// The submission handler makes use of the selectedCard and selectedCardId
// variables to target the correct card.
function handleDeleteSubmit() {
  // Change button text to "Saving..."
  confirmCardDeleteButton.textContent = "Deleting...";
  api
    .removeCard(selectedCardId) // pass the ID the the api function
    .then(() => {
      // remove the card from the DOM
      deleteCard(selectedCard);
      // close the modal
      closeModal(modalDeleteCard);
    })
    .catch(console.error)
    .finally(() => {
      // Change button text back to original
      confirmCardDeleteButton.textContent = "Delete";
      // TODO: Close the modal.
      closeModal(modalNewPost);
    });
}
//Delete card function
function deleteCard(card) {
  card.remove(card);
}

confirmCardDeleteButton.addEventListener("click", handleDeleteSubmit);
cancelCardDeleteButton.addEventListener("click", () =>
  closeModal(modalDeleteCard)
);
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
// displayCard(initialCards);

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

  // Check if current user has already liked this card
  if (cardData.isLiked) {
    loveButton.classList.add("card__love-button_activated");
  }
  loveButton.addEventListener("click", () => {
    activateLoveButton(loveButton, cardData._id);
  });
  // Set delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Modify it so that you can pass the card element as an argument, as well
  // as the card data.
  deleteButton.addEventListener("click", () => {
    selectedCard = cardElement; // Assign the card element to selectedCard
    selectedCardId = cardData._id; // Assign the card's ID to selectedCardId

    // open the delete confirmation modal
    openModal(modalDeleteCard);
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

//Activate love button funtion
function activateLoveButton(loveButton, cardId) {
  loveButton.classList.toggle("card__love-button_activated");
  if (loveButton.classList.contains("card__love-button_activated")) {
    api
      .addLike(cardId, "PUT") // pass the ID the the api function
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  } else {
    api
      .addLike(cardId, "DELETE") // pass the ID the the api function
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  }
}

////////////////////////////////////////////////////////////////////////

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

// //Activate love button funtion
// function activateLoveButton(love) {
//   love.classList.toggle("card__love-button_activated");
// }

// //Make card from template function
// function getCardElement(cardData) {
//   const cardElement = cardsElement
//     .querySelector("#card")
//     .content.querySelector(".card")
//     .cloneNode(true);
//   // select the card title and image and store them in variables
//   const cardImage = cardElement.querySelector(".card__image");
//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   cardElement.querySelector(".card__description").textContent = cardData.name;

//   //Set love button
//   const loveButton = cardElement.querySelector(".card__love-button");
//   loveButton.addEventListener("click", () => {
//     activateLoveButton(loveButton);
//   });
//   // Set delete button
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", () => {
//     deleteCard(cardElement);
//   });
//   // Set image click button
//   // const imageButton = cardElement.querySelector(".card__image-button");
//   // imageButton.addEventListener("click", () => {
//   //   clickImage(cardElement, cardImage);
//   // }); Instead of creeating a button just listen on the image element click
//   cardImage.addEventListener("click", () => {
//     clickImage(cardElement, cardImage);
//   });

//   //return the ready HTML element with the filled-in data
//   return cardElement;
// }

// //Desplay inital cards or added card
// function displayCard(data) {
//   if (Array.isArray(data)) {
//     data.forEach((card) => {
//       // Pass the array item to your getCardElement() function to create a card element.
//       const cardDisplay = getCardElement(card);
//       // Use the appropriate built-in DOM method to add this HTML element to the page.
//       cardsElement.append(cardDisplay);
//     });

//     // This is for user input single card, separate from initial cards' array
//   } else {
//     const cardDisplay = getCardElement(data);
//     cardsElement.prepend(cardDisplay);
//   }
// }

// // Call display card funtion to display initial cards' array
// displayCard(initialCards);

// If you want to use for loop
// for (let i = 0; i < initialCards.length; i++) {
//   // Pass the array item to your getCardElement() function to create a card element.
//   const card = getCardElement(initialCards[i]);
//   console.log(card);

// editProfileButton.addEventListener("click", modalOpen);
// closeEditProfile.addEventListener("click", modalClose);

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
  // console.log("at Esc");
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
  // console.log("at mousedown");
  popUp.addEventListener("mousedown", (evt) => {
    // console.log("1", evt, "2", evt.target, "3", evt.currentTarget);
    if (
      popUp.classList.contains("modal_opened") &&
      //So that the Esc event listener is not removed when image is clicked
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

// // Event listeners to toggle edit profile and newpost modals on and off
// editProfileButton.addEventListener("click", () => {
//   resetErrorDisplayedInEditProfileModal(modalEditProfile, settings);
//   disableSubmitButton(submitProfileButton);
//   openModal(modalEditProfile);
//   // TODO: Get the values of each form field from the value property
//   // of the corresponding input element.

//   for (let i = 0; i < profileInfoValue.length; i++) {
//     profileInfoValue[i].value = profileInfoSave[i].textContent;
//   }
// });

// // Handle submitted profile function
// function handleProfileFormSubmit(evt) {
//   // Prevent default browser behavior, see explanation below.
//   evt.preventDefault();

//   // TODO: Then insert these new values into the textContent property of the
//   // corresponding profile elements.

//   for (let i = 0; i < profileInfoValue.length; i++) {
//     profileInfoSave[i].textContent = profileInfoValue[i].value;
//   }
//   // TODO: Close the modal.
//   closeModal(modalEditProfile);

//   disableSubmitButton(submitProfileButton);
//   formEditProfile.reset();
// }

// function handleformNewPostSubmit(evt) {
//   // Prevent default browser behavior, see explanation below.
//   evt.preventDefault();

//   // TODO: Then insert these new values

//   const cardData = {
//     name: modalNewPostValue[1].value,
//     link: modalNewPostValue[0].value,
//   };

//   // Call the function to display added card
//   displayCard(cardData);
//   // TODO: Close the modal.
//   closeModal(modalNewPost);
//   // Clear the inputs after a successful adding of a new card to let the user add the 2nd one again without having to remove the old data manually.
//   evt.target.reset();
//   // Or
//   // modalNewPostValue[1].value = "";
//   // modalNewPostValue[0].value = "";
//   disableSubmitButton(submitNewPostButton);
// }

// Pop-up or close modal (toggle modal) event listeners
closeEditProfileButton.addEventListener("click", () => {
  closeModal(modalEditProfile);
});
closeEditProfileAvatarButton.addEventListener("click", () => {
  closeModal(modalEditProfileAvatar);
});
newPostButton.addEventListener("click", () => {
  openModal(modalNewPost);
});

closeNewPostButton.addEventListener("click", function () {
  closeModal(modalNewPost);
});

// Modal form submit event listeners for edit profile and new post
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPost.addEventListener("submit", handleformNewPostSubmit);
formEditProfileAvatar.addEventListener(
  "submit",
  handleEditProfileAvatarFormSubmit
);
// enable validation
enableValidation(settings);
