import { Tamagotchi } from "./pet.js";
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const petNameInput = form.querySelector('input[name="pet"]');
  const petTypeSelect = form.querySelector('#pet-select');

  const petName = petNameInput.value;
  const petType = petTypeSelect.value;

  console.log(`Pet name: ${petName}, Pet type: ${petType}`); 


  const pet = new Tamagotchi(petName, petType);
  pet.createPet();

  petNameInput.value = '';
  petTypeSelect.value = '';
});
