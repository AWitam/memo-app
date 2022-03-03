const ROUTES = {
  collectionRoute: () => '/collection',
  newStudySetRoute: () => '/collection/newStudySet',
  studySetRoute: (id: string) => `/collection/${id}`,
}

export default ROUTES
