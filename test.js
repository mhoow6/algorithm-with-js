const arrayText = document.getElementById("arrayText");
const arrayBtn = document.getElementById("arrayBtn");

const searchText = document.getElementById("searchText");
const searchSelect = document.getElementById("searchSelect");
const searchBtn = document.getElementById("searchBtn");

const sortText = document.getElementById("sortText");
const sortSelect = document.getElementById("sortSelect");
const sortBtn = document.getElementById("sortBtn");

let array;
let value;

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
      if (array[i] === value) {
        console.log("Finally!! (" + count + ")");
        return 0;
      } else {
        console.log("I found " + array[i] + "...");
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
        console.log("Finally!! I found " + array[mid] + "! (" + count + ")");
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
      console.log("Finally!! I found " + array[mid] + "! (" + count + ")");
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

  // 비교횟수 n-1, n-2, … , 2, 1 = n(n-1)/2
  // O(n^2)
  bubbleSort(array) {
    let temp;
    let count = 0;

    // 마지막 숫자는 자동으로 정렬되기 때문에 (숫자 개수-1) 만큼 반복한다.
    for (var i = array.length - 1; i > 0; i--) {
      for (var j = 0; j < i; j++) {
        if (array[j] > array[j + 1]) {
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
        count++;
        console.log("Sorting...(" + count + ") " + array);
      }
    }
    console.log("------------------------");
    console.log("Bubble Sort Completed: ");
    console.log(array);
    console.log("------------------------");
  }

  // 비교횟수 n-1, n-2, … , 2, 1 = n(n-1)/2
  // O(n^2)
  selectionSort(array) {
    let count = 0;
    let temp = 0;
    // 마지막 숫자는 자동으로 정렬되기 때문에 (숫자 개수-1) 만큼 반복한다.
    for (var i = 0; i < array.length - 1; i++) {
      let mini = i;

      // 첫 번째 인덱스를 최소값으로 잡기 때문에 (i+1) 부터 반복한다.
      for (var j = i + 1; j < array.length; j++) {
        if (array[mini] > array[j]) {
          mini = j;
        }
        count++;
        console.log("Sorting...(" + count + ") " + array);
      }

      if (mini !== i) {
        temp = array[i];
        array[i] = array[mini];
        array[mini] = temp;
      }
    }
    console.log("------------------------");
    console.log("Selection Sort Completed: ");
    console.log(array);
    console.log("------------------------");
  }

  mergeSort(array) {}
}

arrayBtn.addEventListener("click", () => {
  array = arrayText.value.split(",");
  console.log("You send me this array: ");
  console.log(array);
  console.log("------------------------");
});

searchBtn.addEventListener("click", () => {
  algo = new Algorithm(searchSelect);
  value = searchText.value;

  if (algo.selectedOption.value === "linear") {
    algo.linearSearch(array, value);
  } else if (algo.selectedOption.value === "binary") {
    algo.binarySearch(array, value);
  } else if (algo.selectedOption.value === "binaryRe") {
    let low = 0;
    let high = array.length - 1;
    let count = 1;
    algo.binarySearchRecursive(array, value, count, low, high);
  }
});

sortBtn.addEventListener("click", () => {
  algo = new Algorithm(sortSelect);

  if (algo.selectedOption.value === "bubble") {
    algo.bubbleSort(array);
  } else if (algo.selectedOption.value === "selection") {
    algo.selectionSort(array);
  } else if (algo.selectedOption.value === "merge") {
    algo.mergeSort(array);
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
