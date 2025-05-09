const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const USERS_FILE = path.join(__dirname, "users.json");

app.use(express.json());

function loadUsers() {
  if (fs.existsSync(USERS_FILE)) {
    const rawData = fs.readFileSync(USERS_FILE);
    return JSON.parse(rawData);
  } else {
    return {};
  }
}

function saveUsers(users) {
  const stringData = JSON.stringify(users, null, 2);
  fs.writeFileSync(USERS_FILE, stringData);
}

const sessions = {};

function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    const cookieArr = cookieHeader.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
      const parts = cookieArr[i].split("=");
      cookies[parts[0]] = parts[1];
    }
  }
  console.log(cookies); 
  return cookies;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const users = loadUsers();

  if (users[username]) {
    res.status(409).send("Username already taken!");} 
    else {
    const defaultCharacterState = {
      face: 1,
      top: 1,
      bottom: 1,
      fh: 1,
      bh: 1,
      shoes: 1
    };

    users[username] = {
      password,
      characterState: defaultCharacterState
    };
    saveUsers(users);
    res.redirect("/page5.html");
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const users = loadUsers();

  if (users[username] && users[username].password === password) {
    const sid = Date.now().toString();
    sessions[sid] = { username: username };
    res.setHeader("Set-Cookie", "sid=" + sid + "; Path=/; HttpOnly");
    res.redirect("/page5.html");
  } else {
    res.status(401).send("Wrong username or password! Please try again!");
  }
});

app.get("/check-auth", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const session = sessions[cookies.sid];
  const users = loadUsers();

  if (session) {
    const username = session.username;
    const user = users[username];
    let charState = null;

    if (typeof user === "object" && user.characterState) {
      charState = user.characterState;
    }
    res.json({
      loggedIn: true,
      username: username,
      characterState: charState
    });
  } else {
    res.json({
      loggedIn: false,
      characterState: null
    });
  }
});

app.post("/saveCharacterState", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const session = sessions[cookies.sid];
  if (!session) {
    return res.status(401).send("Not logged in!");
  }
  const username = session.username;
  const users = loadUsers();

  if (!users[username]) {
    return res.status(404).send("User not found.");
  }

  console.log("Received state data: ", req.body); 
  users[username].characterState = req.body.state;
  saveUsers(users);

  res.send("Character saved!");
});

app.get("/logout", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (cookies.sid) {
    delete sessions[cookies.sid];
  }
  res.setHeader("Set-Cookie", "sid=; Max-Age=0; Path=/");
  res.redirect("/page5.html");
});

app.post("/editpassword", (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const cookies = parseCookies(req.headers.cookie);
  const sid = cookies.sid;  

  if (!sid) {
    return res.status(401).send("Not logged in!"); 
  }
  const session = sessions[sid]; 
  const username = session.username; 
  const users = loadUsers();  

  if (!users[username]) {
    return res.status(404).send("User not found.");
  }
  if (users[username].password !== currentPassword) {
    return res.status(401).send("Current password is incorrect.");
  }
  users[username].password = newPassword;
  saveUsers(users);

  res.redirect("/page5.html");
});

app.post("/editusername", (req, res) => {
  const { newUsername } = req.body;
  const cookies = parseCookies(req.headers.cookie);
  const session = sessions[cookies.sid];

  if (!session) {
    return res.status(401).send("Unauthorized!");
  }
  const oldUsername = session.username;
  const users = loadUsers();

  if (!users[oldUsername]) {
    return res.status(404).send("User not found.");
  }
  if (users[newUsername]) {
    return res.status(409).send("Username already taken!");
  }
  users[newUsername] = users[oldUsername];
  delete users[oldUsername];
  saveUsers(users);
  session.username = newUsername;

  res.redirect("/page5.html");
});

app.post("/delete", (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const session = sessions[cookies.sid];

  if (!session) {
    return res.status(401).send("Unauthorized!");
  }
  const username = session.username;
  const users = loadUsers();
  if (!users[username]) {
    return res.status(404).send("User not found.");
  }
  delete users[username];
  saveUsers(users);
  delete sessions[cookies.sid];

  res.setHeader("Set-Cookie", "sid=; Max-Age=0; Path=/");
  res.redirect("/page5.html");
});

app.listen(PORT, () => {
  console.log("App listening to port" + PORT);
});
