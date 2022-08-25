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
  for(let i = 0; i < stateListLength; i++) {
    let stateListOption = new Option(stateList[i].name, stateList[i].code);
    selectState.appendChild(stateListOption);
  }
}

function onChangeDisplayCity() {
  
}