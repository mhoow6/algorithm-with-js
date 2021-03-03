import Algorithm from "./algorithm.js";

const selectElements = document.querySelectorAll("[data-sol]");

selectElements.forEach((selectElement) => {
  new Algorithm(selectElement);
});
