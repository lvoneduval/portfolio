const express = require('express');
const app = express();

// Définir le dossier des fichiers statiques
app.use(express.static('public'));

// Définir le moteur de template
app.set('view engine', 'ejs');

// Routes pour les différentes pages
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/resume', (req, res) => {
  res.render('resume', { title: 'Resume' });
});

app.get('/skills', (req, res) => {
  res.render('skills', { title: 'Skills' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;
