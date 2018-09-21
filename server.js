const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
// logs activity on the server
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server log');
    }
  })
  // moves the middleware to continue to next handler
  next();
});

app.use((req, res, next) => {
    res.render('maintain.hbs');
});

app.use(express.static(__dirname + '/public'));

var currentYear = new Date().getFullYear();

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});


hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs',{
      pageTitle:'Home Page',
      pageDesc:'Welcome to My Site'
    });
  });

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
    pageDesc:'I am so good'
  });
});
//
// app.get('/bad', (req, res)=>{
//   res.send({
//     errorCode: 500,
//     errorMessage: 'Internal server error occured'
//   });
// });

app.listen(3000, () =>{
  console.log("Server is up on port 3000");
});
