"use-strict";

let myList = [];
const saveInputbtnEl = document.getElementById("btn-save-input");

const saveTabbtnEl = document.getElementById("btn-save-tab");

const deletebtnEl = document.getElementById("btn-delete");

const ulEl = document.getElementById("list");

const inputEl = document.getElementById("input-el");

let localStore = JSON.parse(localStorage.getItem("myClick"));

if (localStore) {
  myList = localStore;
  render(myList);
}

function render(arr) {
  let listItem = "";

  for (let i = 0; i < arr.length; i++) {
    listItem += `<li><a href='${arr[i]}'>${arr[i]}</a></li>`;
  }

  ulEl.innerHTML = listItem;
}

saveInputbtnEl.addEventListener("click", function () {
  let value1 = inputEl.value;

  if (value1 !== "") {
    myList.push(inputEl.value);

    render(myList);
    inputEl.value = "";
    console.log(myList);
    localStorage.setItem("myClick", JSON.stringify(myList));
  }
});

deletebtnEl.addEventListener("dblclick", function () {
  ulEl.innerHTML = "";
  myList = [];
  localStorage.clear();
});

saveTabbtnEl.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myList.push(tabs[0].url);
    console.log(myList);
    localStorage.setItem("myClick", JSON.stringify(myList));
    render(myList);
  });
});
