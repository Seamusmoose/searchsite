const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "user2", "user3", "userfour"] });
});

app.listen(5000, () => console.log("server running on 5000"));
