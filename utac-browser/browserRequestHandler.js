module.exports = async function (fetchRequest) {
  // TODO PARAMS 2 choix :
  // - utiliser fetch() pour taper le serveur (ou le serviceworker)
  const fetchResponse = await fetch(fetchRequest);
  // - utiliser le fetchRequestHandler de utac-core pour rester en local
  // TODO PWA

  return fetchResponse;
};
