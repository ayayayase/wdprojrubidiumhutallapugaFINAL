document.getElementById("btnback1").onclick = function () {
  location.href = "index.html";
}

document.getElementById("btnstudio").onclick = function () {
  saveState(); 
  location.href = "page3.html";
}

document.getElementById("btnstudio").onclick = function () {
  location.href = "page3.html";
}

window.onload = function () {
  fetch("/check-auth")
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn && data.characterState) {
        loadCharacter(data.characterState);
      } else {
        const saved = localStorage.getItem("characterState");
        if (saved) {
          loadCharacter(JSON.parse(saved));
        }
      }
    });
};
function loadCharacter(savedState) {
  document.getElementById("face").className = "face" + savedState.face;
  document.getElementById("top").className = "top" + savedState.top;
  document.getElementById("bottom").className = "bottom" + savedState.bottom;
  document.getElementById("fh").className = "fh" + savedState.fh;
  document.getElementById("bh").className = "bh" + savedState.bh;
  document.getElementById("shoes").className = "shoes" + savedState.shoes;
}


let state = {face: 1, top: 1, bottom: 1, fh: 1, bh: 1, shoes: 1}

function nextface() {
  console.log("faceworks");
  let face = document.querySelector("#face");

  if (state.face < 6) {
    state.face++;
    face.setAttribute("class", `face${state.face}`);
  }
  else if (state.face == 6) {
    state.face = 1;
    face.setAttribute("class", `face${state.face}`);
  }

  saveState();  
}

function nexttop() {
  console.log("topworks");
  let top = document.querySelector("#top");

  if (state.top < 6) {
    state.top++;
    top.setAttribute("class", `top${state.top}`);
  }
  else if (state.top == 6) {
    state.top= 1;
    top.setAttribute("class", `top${state.top}`);
  }

  saveState(); }

function nextbottom() {
  console.log("bottomworks");
  let bottom = document.querySelector("#bottom");

  if (state.bottom < 6) {
    state.bottom++;
    bottom.setAttribute("class", `bottom${state.bottom}`);
  }
  else if (state.bottom == 6) {
    state.bottom= 1;
    bottom.setAttribute("class", `bottom${state.bottom}`);
  }

  saveState();  
} 

function nextfh() {
  console.log("fhworks");
  let fh = document.querySelector("#fh");

  if (state.fh < 8) {
    state.fh++;
    fh.setAttribute("class", `fh${state.fh}`);
  }
  else if (state.fh == 8) {
    state.fh = 1;
    fh.setAttribute("class", `fh${state.fh}`);
  }

  saveState();  
}

function nextbh() {
  console.log("bhworks");
  let bh = document.querySelector("#bh");

  if (state.bh < 8) {
    state.bh++;
    bh.setAttribute("class", `bh${state.bh}`);
  }
  else if (state.bh == 8) {
    state.bh = 1;
    bh.setAttribute("class", `bh${state.bh}`);
  }

  saveState();  
}

function nextshoes() {
  console.log("shoesworks");
  let shoes = document.querySelector("#shoes");

  if (state.shoes < 6) {
    state.shoes++;
    shoes.setAttribute("class", `shoes${state.shoes}`);
  }
  else if (state.shoes == 6) {
    state.shoes = 1;
    shoes.setAttribute("class", `shoes${state.shoes}`);
  }

  saveState(); 
}

function saveState() {
  localStorage.setItem("characterState", JSON.stringify(state)); 
  fetch("/check-auth")
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        const stateData = {
          face: state.face,
          top: state.top,
          bottom: state.bottom,
          fh: state.fh,
          bh: state.bh,
          shoes: state.shoes
        };

        fetch("/saveCharacterState", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ state: stateData })
        }).then(response => {
          if (response.ok) {
            console.log("Saved on server.");
          }
        });
      } else {
        console.log("Saved to local storage only.");
      }
    });
}