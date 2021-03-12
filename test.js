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
let cnt = 0;

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

  merge(array, left, middle, right) {
    let i, j, k;
    let sorted = new Array();
    i = left; // 왼쪽 배열의 첫 번째
    j = middle + 1; // 오른쪽 배열의 첫 번째 (중앙에서 한 칸 뒤)
    k = left; // 정렬된 배열에서 움직일 k도 i와 똑같이 움직임

    console.log(
      "Merging list...(" +
        left +
        "~" +
        middle +
        "," +
        (middle + 1) +
        "~" +
        right +
        ")"
    );

    // 왼쪽 배열과 오른쪽 배열 탐색이 끝날때까지 루프
    while (i <= middle && j <= right) {
      if (array[i] <= array[j]) {
        // 왼쪽 배열이 더 작을 경우
        sorted[k] = array[i]; // 정렬할 배열에 왼쪽 배열 값을 먼저 넣는다 (오름차순 기준)
        i++; // 왼쪽 배열에서 다음 원소를 탐색해야 하므로 i값 증가
      } else {
        sorted[k] = array[j];
        j++;
      }
      k++; // 정렬할 배열의 다음 인덱스에 값을 넣을 수 있도록 k값 증가
    }

    // 남은 데이터 삽입
    if (i > middle) {
      // 왼쪽 배열이 먼저 끝날 경우
      for (var t = j; t <= right; t++) {
        // 남은 오른쪽 배열을 끝까지
        sorted[k] = array[t]; // 정렬된 배열에 넣어준다.
        k++;
      }
    } else {
      // 오른쪽 배열이 먼저 끝날 경우
      for (var t = i; t <= middle; t++) {
        // 남은 왼쪽 배열을 끝까지
        sorted[k] = array[t]; // 정렬된 배열에 넣어준다.
        k++;
      }
    }

    // 정렬된 임시 배열을 실제 배열에 옮김
    for (var t = left; t <= right; t++) {
      // 모든 위치를 탐색하면서
      array[t] = sorted[t];
    }

    console.log("Merge Completed:");
    console.log(array);
    console.log("------------------------");
  }

  mergeSort(array, left, right) {
    console.log("Current States\n" + "left: " + left + "\nright: " + right);

    // 크기가 1보다 작은 경우는 정렬되었다고 보기 때문에, 큰 경우만 따진다
    if (left < right) {
      console.log("Dividng list...");
      let middle = Math.floor((left + right) / 2); // 중앙 위치를 계산하여 배열을 균등 분할시킴
      this.mergeSort(array, left, middle); // 왼쪽 배열 정렬 (정복)
      this.mergeSort(array, middle + 1, right); // 오른쪽 배열 정렬 (정복)
      this.merge(array, left, middle, right); // 정렬된 배열을 합병
    }
  }
}

arrayBtn.addEventListener("click", () => {
  array = arrayText.value.split(",");

  array = array.map((item) => {
    return parseInt(item, 10);
  });

  console.log("You send me this array: ");
  console.log(array);
  console.log("------------------------");
});

searchBtn.addEventListener("click", () => {
  algo = new Algorithm(searchSelect);
  value = parseInt(searchText.value, 10);

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
    algo.mergeSort(array, 0, array.length - 1);
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
