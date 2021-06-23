const axios = require("axios");

axios("https://rgd-api.damirlut.tk/user/371690693233737740").then(
  ({ data }) => {
    console.log(data);
  }
);
