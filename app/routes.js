// TODO QUESTION est ce utile de distinguer GET et POST dans la définition des méthodes,
// pour l'instant je n'en vois pas le besoin, peut être que c'est aux routes de se comporter
// différemment suivant la méthode

module.exports = {
  "/": require("./home/home.js"),
  "/list-todos": require("./todos/list-todos.js"),
  "/add-todo": require("./todos/add-todo.js"),
  "/time": require("./time/time.js"),
};
