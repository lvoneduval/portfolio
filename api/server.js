const express = require('express');
const app = express();
const path = require('path');

// Définir le dossier des fichiers statiques
app.use(express.static(path.join(__dirname, '..', 'public')));

// Définir le moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Routes pour les différentes pages
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  console.log('GET /');
  res.render('home', { title: 'Home' });
});

app.get('/resume', (req, res) => {
  console.log('GET /');
  res.render('resume', { title: 'Resume' });
});

app.get('/skills', (req, res) => {
  console.log('GET /');
  res.render('skills', { title: 'Skills' });
});

app.get('/projects', (req, res) => {
  console.log('GET /');
  res.render('projects', { title: 'Projects' });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;