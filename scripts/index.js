const initialCards = [
  {
    object1: {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
  },
  {
    object2: {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
  },
  {
    object3: {
      name: "An outdoor cafe",
      link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
  },
  {
    object4: {
      name: "A very long bridge, over the forest and through the trees",
      link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
  },
  {
    object5: {
      name: "Tunnel with morning light",
      link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
  },
  {
    object6: {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
  },
];

const page = document.querySelector(".page");
const editProfileButton = page.querySelector("#editProfileButton");
const modalEditProfile = page.querySelector(".modal");
const closeEditProfile = modalEditProfile.querySelector(".modal__button-close");

function modalOpen() {
  modalEditProfile.classList.add("modal__opened");
}

function modalClose() {
  modalEditProfile.classList.remove("modal__opened");
}

editProfileButton.addEventListener("click", modalOpen);
closeEditProfile.addEventListener("click", modalClose);

console.log("I'm working");
