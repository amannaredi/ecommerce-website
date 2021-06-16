
// task
// 1. add to cart
// 2. multipage,
// 3.SUBSCRIBE

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const request = require ("request");
const _ =  require("lodash");

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static("public"));

let products = [];

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

// collections route
app.get("/collections", function(req, res){
  res.render("collections")
})

// women route
app.get("/shopwomen", function(req, res){
  res.render("shopwomen")
})

// accesories route
app.get("/accesories", function(req, res){
  res.render("accesories")
})

// collections route
app.get("/aboutus", function(req, res){
  res.render("aboutus")
})

// individual products

app.post("/products",function(req,res){
 var imageAddress = req.body.imageAddress;
 var aboutImage = req.body.aboutImage;
 var imagePrice = req.body.priceImage;

 res.render("products", {
   imgsrc : imageAddress,
   about:aboutImage,
   price:imagePrice
 })

})

// cart
app.post("/cart", function(req, res){

  const product = {
     imgsrc : req.body.imagecart,
     aboutsrc : req.body.aboutcart,
     pricesrc : req.body.pricecart,
};
var sum = parseInt(product.pricesrc);
products.forEach(function(product){
  sum = sum + parseInt(product.pricesrc);
})

  product.totalSum = sum;
  products.push(product);

  res.render("cart", {
    products:products,
    total: product.totalSum
})

  console.log( product , product.totalSum, products);
})


// buy NOW

app.post("/buynow", function(req, res){

  const product = {
     imgsrc : req.body.image,
     aboutsrc : req.body.about,
     pricesrc : req.body.price,
};
var sum = parseInt(product.pricesrc);
products.forEach(function(product){
  sum = sum + parseInt(product.pricesrc);
})

  product.totalSum = sum;
  products.push(product);

  res.render("buynow", {
    products:products,
    total: product.totalSum
})

  console.log( product , product.totalSum, products);
})

// newsletter-signup
app.post("/",function(req,res){

   const email = req.body.email;
   console.log(email);

   const data = {
        members:[
          {
            email_address:email,
            status:"subscribed",

          }
        ]
   }

   const jsonData = JSON.stringify(data);

   const url = "https://us1.api.mailchimp.com/3.0/lists/d3e76a7f11";
   const options={
     method:"POST",
     auth:"aman:64b908a5f12a6fbc834c950c82346951-us1"
   }
   const request = https.request(url, options, function(response){

     if (response.statusCode===200){
       res.sendFile(__dirname + "/success.html")
     } else{
       res.sendFile(__dirname + "/failure.html")
     }

     response.on("data",function(data){
        console.log(JSON.parse(data));
     })
   })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen("3000",function(req,res){
  console.log("server at port 3000");
})
