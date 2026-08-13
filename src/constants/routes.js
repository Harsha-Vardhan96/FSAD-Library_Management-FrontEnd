/**
 * Application Route Paths
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // Authenticated User Routes
  DASHBOARD: '/dashboard',
  SEARCH: '/search',
  VIEW_RESOURCE: '/view/:id',
  getViewResourcePath: (id) => `/view/${id}`,

  // Category Pages
  JUDICIAL_RESOURCES: '/judicial-resources',
  SCHOOL_EDUCATION: '/school-education',
  RESEARCH_RESOURCES: '/research-resources',
  PATENTS_AND_STANDARDS: '/patents-and-standards',
  HIGHER_EDUCATION: '/higher-education',
  CAREER_DEVELOPMENT: '/career-development',
  CULTURAL_ARCHIVES: '/cultural-archives',
  NEWSPAPER_ARCHIVES: '/newspaper-archives',

  // Admin Routes
  ADMIN_DASHBOARD: '/admin-dashboard',
};

export default ROUTES;
