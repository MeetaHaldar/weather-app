const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const queryCity = req.body.cityName;
  const apiKey = "1795c21427ee4d63a8b93211222602";
  const url =
    "https://api.weatherapi.com/v1/current.json?key=" +
    apiKey +
    "&q=" +
    queryCity +
    "&aqi=no";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.current.wind_degree;
      const icon = weatherData.current.condition.icon;
      console.log(temp);
      res.write(" <h1>the temp is = " + temp + "</h1>");
      res.write(`<img src=${icon} />`);
      res.send();
    });
  });

  console.log("form got submitted!!");
});

app.listen(4000, function () {
  console.log("app is running on port 4000");
});
