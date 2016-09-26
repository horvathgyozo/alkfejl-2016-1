const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const indicative = require('indicative');

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Middlewares
app.use(express.static('public'));
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  // req.alma = 'piros';
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(function (req, res, next) {
//   console.log(req.alma);
//   next();
// });

app.get('/', function (req, res) {
  res.render('hello.njk', {
    name: 'Győző'
  });
})

app.get('/hello/:name', function (req, res) {
  const name = req.params.name;
  res.render('hello.njk', {
    name
  });
})

app.get('/bgcolor', function (req, res) {
  const bgcolor = req.query.bgcolor;
  res.render('bgcolor.njk', {
    bgcolor
  });
})

app.get('/reg', function (req, res) {
  res.render('reg.njk')
});

app.post('/reg', function (req, res) {
  // console.log(req.body);
  const rules = {
    username  : 'required|alpha_numeric',
    email     : 'required|email',
    password  : 'required|min:6|max:30',
    password_confirm : 'same:password',
  }

  indicative
    .validate(req.body, rules)
    .then(function () {
      // validation passed
      res.end('success')
    })
    .catch(function (errors) {
      // validation failed
      res.end(errors)
    })

  res.end();
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server is running!');
});