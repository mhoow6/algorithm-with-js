const arrayText = document.getElementById("arrayText");
const arrayBtn = document.getElementById("arrayBtn");

const searchText = document.getElementById("searchText");
const searchSelect = document.getElementById("searchSelect");
const searchBtn = document.getElementById("searchBtn");

const sortText = document.getElementById("sortText");
const sortSelect = document.getElementById("sortSelect");
const sortBtn = document.getElementById("sortBtn");

let list;
let searchValue;

// import Algorithm from "./algorithm.js";
class Algorithm {
  constructor(element) {
    this.element = element;
    this.options = getFormattedOptions(element.querySelectorAll("option"));
  }

  get selectedOption() {
    return this.options.find((option) => option.selected);
  }

  linearSearch(array, value) {
    let count = 1;
    for (var i = 0; i < array.length; i++) {
      console.log("I found " + array[i] + "...");
      if (array[i] === value) {
        console.log("Finally!! (" + count + ")");
        return 0;
      } else {
        count++;
      }
    }
  }

  binarySearch(array, value) {
    let count = 1;
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (array[mid] === value) {
        console.log("Finally!! (" + count + ")");
        return 0;
      }

      console.log("I found " + array[mid] + "...");

      if (array[mid] > value) {
        high = mid - 1;
        count++;
      } else {
        low = mid + 1;
        count++;
      }
    }
    return -1;
  }

  binarySearchRecursive(array, value, count, low, high) {
    let mid = Math.floor((low + high) / 2);

    if (array[mid] === value) {
      console.log("Finally!! (" + count + ")");
      return 0;
    }

    console.log("I found " + array[mid] + "...");

    if (array[mid] > value) {
      count++;
      return this.binarySearchRecursive(array, value, count, low, mid - 1);
    }

    count++;
    return this.binarySearchRecursive(array, value, count, mid + 1, high);
  }

  bubbleSort(array, value) {}

  selectionSort(array, value) {}

  mergeSort(array, value) {}
}

arrayBtn.addEventListener("click", () => {
  list = arrayText.value.split(",");
  console.log(list);
});

searchBtn.addEventListener("click", () => {
  algo = new Algorithm(searchSelect);
  searchValue = searchText.value;

  if (algo.selectedOption.value === "linear") {
    algo.linearSearch(list, searchValue);
  } else if (algo.selectedOption.value === "binary") {
    algo.binarySearch(list, searchValue);
  } else if (algo.selectedOption.value === "binaryRe") {
    let low = 0;
    let high = list.length - 1;
    let count = 1;
    algo.binarySearchRecursive(list, searchValue, count, low, high);
  }
});

function getFormattedOptions(optionElements) {
  return [...optionElements].map((optionElement) => {
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
    };
  });
}
