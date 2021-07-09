const ROUTES = {
  collectionRoute: () => '/collection',
  newStudySetRoute: () => '/collection/newStudySet',
  studySetRoute: (id: string) => `/collecton/${id}`,
}

export default ROUTES
