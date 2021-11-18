# utac

A minimalist take on web app development

## En 2 mots

L'objectif idéal est de faire un outil qui puisse être présenté en une conf à l'issue de laquelle un non développeur puisse se dire "j'ai juste à apprendre les rudiments de HTML, faire 2-3 copier coller et je vais arriver à faire mon site"

## Envies

### Vues et actions

- Centré autour des VUES (app => user) et des actions (user => app)
- Vues = GET, Actions = POST
- Pas de paramètres dans les URLs de type `/toto/1234/titi` mais l'utilisation des queryparams en GET et des form-data en POST
- Les noms de route sont compréhensibles par les humains, par exemple :
    - la vue "/telechargement-des-news-en-cours" au lieu de "/news/downloading"
    - l'action "/telecharger-les news" au lieu de "/news/download"

### Agnostique

- Ne pas être lié à un seul serveur back, par exemple expressjs (request handler agnostique)
- Ne pas être lié à un seul un moteur de template, par exemple ejs (génération du markup HTML agnostique)
- Dans les vues et actions, renvoyer des objets Response le plus standard possible (ce que fetch renverrait) pour faciliter le fait d'être agnostique

### Almost no JS

- Fonctionner avec un minimum de JS qui interagit avec le markup HTML (idéalement aucun)
- Utiliser <form> pour faire des appels HTTP paramétrés avec GET pour naviguer vers une autre vue et POST pour appeler une action

### Offline first

- Fonctionner en mode client/serveur avec un serveur local
- Fonctionner en mode PWA offline

### Stockage

- Persister les données dans des fichiers textes compréhensibles et éditables par tous
- un double saut de ligne pour séparer chaque record
- format text + possibilité d'avoir des tags @toto et des tags avec valeur @titi(toto)... et c'est tout !

### Style classless

- Utiliser un framework CSS classless

### Pas encore certain que ce soit une bonne idée

- Aller chercher la vue ou l'action à l'endroit pointé par l'URL (`/toto/titi` va chercher `titi.js` dans le dossier `toto`)

## Inspirations

- (Remix)[https://remix.run/features] pour leur approche centrée sur les technos existantes (navigateur, HTTP et HTML)
- (Event modelling)[https://eventmodeling.org/posts/what-is-event-modeling/] pour leur approche de modélisation simple
- (browser-express)[https://github.com/williamcotton/browser-express#readme] et (Nighthawk)[https://github.com/wesleytodd/nighthawk] pour la façon d'intercepter les comportements navigateur et les surcharger
- (Todo.txt)[http://todotxt.org/] et (TaskPaper)[https://www.taskpaper.com/] pour le format simple de stockage en texte
- (Pico.css)[https://picocss.com/examples/classless/], (MVP.css)[https://andybrewer.github.io/mvp/] et (Tacit)[https://yegor256.github.io/tacit/] pour l'appoche classless
