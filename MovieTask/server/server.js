const express = require("express");
const shows = require("./routes/api/shows");
const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Use Routes
app.use("/api/shows", shows);

app.listen(port, () => console.log(`Server running on ${port}`));
