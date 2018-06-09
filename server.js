const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// app.engine('hbs', hbs({
//     extname: 'hbs',
//     defaultLayout: 'base',
//     layoutDir: __dirname + '/views/layouts', // for layouts
//     partialsDir  : [
//         //  path to your partials
//         __dirname + '/views/partials',
//     ]
// }));

hbs.registerPartials(__dirname +'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
  //return 'test';
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
  //return 'test';
});
var app = express(__dirname);



app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now =new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n',(err) =>{
    if (err) {
      console.log('Unable to append to server.log;');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

// app.get('/',(req,res)=>{
//   // res.send('<h1>Hello Express !!</h1>')
//   res.send({
//     name: 'Ahmed',
//     likes: [
//       'biking',
//       'Pizza'
//     ]
//   })
// });
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express !!</h1>')
  res.render('home.hbs',{
    pageTitle:'Home page',
    message:'Welcome to my website Dude',
  })
});

app.get('/about',(req,res)=>{
  // res.send('About page')
  res.render('about.hbs',{
    pageTitle:'About Page 1',
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    status: 'Error',
    code: '101'
  })
});

app.listen(3000,()=>{
  console.log('server is up on port 3000');
});
