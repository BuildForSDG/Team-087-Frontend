export const storageId = 'mHpTa11y';

export const isLoggedIn = (localStorage.getItem(storageId) !== null);

export const fetchToken = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).token : null);

export const fetchFirstName = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).firstName : null);

export const isPatient = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).authed.is_patient : false);

export const registerAuth = ({ token, firstName = '', user }) => {
  try {
    localStorage.setItem(storageId, JSON.stringify({ token, firstName, authed: user }));
    return true;
  } catch (error) {
    return false;
  }
};


// custom error-class
class MhappError extends Error {
  constructor(message, errors) {
    super(message);

    this.name = 'MhappError';
    this.errors = errors;

    Error.captureStackTrace(this, MhappError);
  }
}

const object2arrayconvertr = (o) => (o ? Object.entries(o).map(([k, v]) => ({ [k]: (typeof v === 'object' ? object2arrayconvertr(v) : v) })) : o);

export const handleErrorResult = (result, status) => {
  let isJWTExpired = ((status === 401) && (result.message.toLowerCase() === 'authentication failed'));

  if (!isJWTExpired) {
    const errorBag = result.errors.error ? [result.errors.error] : object2arrayconvertr(result.errors);
    throw new MhappError(result.message, errorBag);
  }

  signOut();
};

export const fetchBot = async (endPoints, options) => {
  const response = await fetch(endPoints, options);
  const result = await response.json();

  if (!result.status) {
    handleErrorResult(result, response.status);
  }

  return result;
};

export const signOut = () => {
  localStorage.removeItem(storageId);
  window.location = '/login';
};


// const url = process.env.API_BASE_URL;
const url = 'https://mental-ly.herokuapp.com/api/v1';

export const endPoints = {
  signIn: `${url}/auth/signin`,
  signUp: `${url}/auth/register`,
  verify: `${url}/auth/verify`,
  users: {
    uri: `${url}/users`,
    paths: {
      recommendations: '/recommendations',
      appointments: '/appointments',
      reviews: '/reviews',
      chats: '/chats',
    }
  }
};

