export const ROUTES = {
  TEST: '/test',
  FULL_EXAM: '/full-exam',
  GRAMMAR: '/grammar',
  VOCABULARY: '/vocabulary',
  PROFILE: '/profile',
  ANSWERS: '/answers',
  HOME: '/',
  NOT_FOUND: '/not-found',
  // ADMIN: '/admin',
};

/**
 * Navigation helper functions
 */
export const gettestRoute = () => ROUTES.TEST;
export const getHomeRoute = () => ROUTES.HOME;
export const getFullExamRoute = () => ROUTES.FULL_EXAM;
export const getGrammarRoute = () => ROUTES.GRAMMAR;
export const getVocabularyRoute = () => ROUTES.VOCABULARY;
export const getProfileRoute = () => ROUTES.PROFILE;
export const getAnswersRoute = () => ROUTES.ANSWERS;
export const getNotFoundRoute = () => ROUTES.NOT_FOUND;


// export const getAdminRoute = () => ROUTES.ADMIN;