document.getElementById("btnback1").onclick = function () {
  location.href = "page2.html";
}

window.onload = function () {
  var req = new XMLHttpRequest();
  req.open("GET", "/check-auth", true);

  req.onload = function () {
    if (req.status === 200) {
      var data = JSON.parse(req.responseText);

      if (data.loggedIn && data.characterState) {
        // If logged in, use server state
        loadCharacter(data.characterState);
      } else {
        // Try to load from localStorage if not logged in
        var saved = localStorage.getItem("characterState");
        if (saved) {
          loadCharacter(JSON.parse(saved));
        } else {
          console.log("No character state saved.");
        }
      }
    } else {
      console.log("Error checking auth");
    }
  };

  req.send();
};

function loadCharacter(state) {
  document.getElementById("face").className = "face" + state.face;
  document.getElementById("top").className = "top" + state.top;
  document.getElementById("bottom").className = "bottom" + state.bottom;
  document.getElementById("fh").className = "fh" + state.fh;
  document.getElementById("bh").className = "bh" + state.bh;
  document.getElementById("shoes").className = "shoes" + state.shoes;
}


let maxLength = 9;  

document.getElementById("changename").onclick = function changename () {
  let userInput = window.prompt("Enter desired name (character limit: 9)");

  if (userInput && userInput.length > maxLength) {
    alert(`${maxLength} only please!`);
  } else {
    document.getElementById("name").innerHTML = userInput;  // Update the name if valid
  }
}


//button to change the dialogue of the character
document.getElementById("changedialogue").onclick = function changedialogue () {

  var dialogueinput = document.getElementById("dialogueinput").value;
  
  document.getElementById("dialogue").innerHTML = dialogueinput;
}

// turn elements into an array so its easier to reuse
const ids = [
  "title",
  "caption",
  "hrtlndecor",
  "changename",
  "changebackground",
  "dialogueinput",
  "changedialogue"
];
 
//button to hide the other elements (for when user wants a clearer screen)
document.getElementById("hideshow").onclick = function hide () {
  document.getElementById("hideshow").style.visibility = "hidden";
  
  for (let i = 0; i < ids.length; i++) {
  document.getElementById(ids[i]).style.visibility = "hidden";
}
  
document.getElementById("showhide").style.visibility = "visible";
}

//buttons to show the elements back
document.getElementById("showhide").onclick = function hide () {
  document.getElementById("showhide").style.visibility = "hidden";
  
    for (let i = 0; i < ids.length; i++) {
  document.getElementById(ids[i]).style.visibility = "visible";
}
  
document.getElementById("hideshow").style.visibility = "visible";
}

let state = 1;

function changebg() {
  console.log("bgworks");
  
  let bg = document.querySelector("#bg");
  
  if (state < 8) {
    state++;
    bg.setAttribute("class", `bg${state}`);
  }
  else if (state == 8) {
    state = 1;  
    bg.setAttribute("class", `bg${state}`);
  }
}
