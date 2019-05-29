const express = require("express");
const router = express.Router();
const axios = require("axios");

//@route GET api/shows/
//@desc Tests shows route

router.get("/", (req, res) => {
  axios
    .get("http://124.41.240.154:9803/api/nowshowinginfo")
    .then(response => {
      res.json({ shows: response.data });
    })
    .catch(err => console.log(err));
});

module.exports = router;
