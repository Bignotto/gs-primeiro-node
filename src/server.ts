import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Big Rocks!" });
});

app.listen(3333, () => {
  console.log("🚀 Lift off!!!!!!!!!!!!!!!!");
});
