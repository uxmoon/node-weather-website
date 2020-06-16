// core modules and npm modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

/* Define paths for Express config */
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/* Set handlebars engine and views locationx */
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Martin Luna",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Martin Luna",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, exercitationem. Quas porro adipisci quod nulla ducimus quos laboriosam at, enim aliquam odit amet labore minima repudiandae, vel soluta, ut exercitationem?",
    name: "Martin",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Article not found",
    name: "Martin Luna"
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "Provide an address"
    })
  }

  geocode(req.query.address, (error, { longitude, latitude, location } = {} ) => {

    if(error) {
      return res.send({ error })
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error: "Address not found"
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });

    })
  })
});

app.get("/products", (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: "Provide a search term"
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  });
});

/* 404 error pages */

app.get('*', (req, res) => {
  res.render("404", {
    title: '404',
    errorMessage: "Page not found",
    name: "Martin Luna"
  })
})

app.listen(3000, () => {
  console.log("Server is running in port 3000.");
});
