const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const indicative = require('indicative');
const session = require('express-session');
const flash = require('connect-flash');

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
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'secret code',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

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
  const errors = req.flash('errors');
  const old_data = req.flash('old_data');

  res.render('reg.njk', {
    errors,
    old_data,
  })
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
    .validateAll(req.body, rules)
    .then(function () {
      // validation passed
      // console.log('success')
      res.redirect('/hello/siker');
      res.end();
    })
    .catch(function (errors) {
      // validation failed
      console.log(errors)
      req.flash('errors', errors);
      req.flash('old_data', req.body);
      res.redirect('/reg');
      res.end();
    });
})

// Start the webserver
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server is running!');
});