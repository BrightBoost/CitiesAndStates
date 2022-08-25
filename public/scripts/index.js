window.onload = function () {
  initStatesData();
  let selectState = document.getElementById("selectState");
  selectState.onchange = onChangeDisplayCity;
};

function initStatesData() {
  let url = "/api/states";
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let stateList = JSON.parse(this.responseText);
      populateDropdown(stateList);
    }
  };
  xhr.open("GET", url);
  xhr.send(null);
}

function populateDropdown(stateList) {
  let selectState = document.getElementById("selectState");
  let selectStateOption = [{ name: "Select a state" }];
  let selectStateDropdown = new Option(selectStateOption[0].name);
  selectState.appendChild(selectStateDropdown);

  let stateListLength = stateList.length;
  for (let i = 0; i < stateListLength; i++) {
    let stateListOption = new Option(stateList[i].name, stateList[i].name);
    selectState.appendChild(stateListOption);
  }
}

function onChangeDisplayCity() {
  let selectedState = document.getElementById("selectState").value;
  let url = `/api/cities/${selectedState}`;
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let cities = JSON.parse(this.responseText);
      createCitiesTable(cities);
    }
  };
  xhr.open("GET", url);
  xhr.send(null);
}

function createCitiesTable(cities) {
  let cityTableBody = document.getElementById("cityTableBody");
  cityTableBody.innerHTML = "";
  let length = cities.length;
  for (let i = 0; i < length; i++) {
    let row = cityTableBody.insertRow(-1);
    let cell0 = row.insertCell(0);
    cell0.innerHTML = cities[i].city;
  }
}
