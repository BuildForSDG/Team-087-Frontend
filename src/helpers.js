export const storageId = 'mHpTa11y';

export const isLoggedIn = (localStorage.getItem(storageId) !== null);

export const fetchToken = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).token : null);

export const fetchFirstName = () => (isLoggedIn ? JSON.parse(localStorage.getItem(storageId)).firstName : null);

export const registerAuth = ({ token, firstName = '' }) => {
  try {
    localStorage.setItem(storageId, JSON.stringify({ token, firstName }));
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

export const handleErrorResult = (result) => {
  let isJWTExpired = false;
  /* const errorPipe = result.errors.map((error) => {
    console.log('---', error);
    isJWTExpired = !isJWTExpired && ((error.includes('expired') || error.includes('invalid')) && error.toLowerCase().includes('token'));
    return error;
  }) */

  if (!isJWTExpired) {
    //throw new Error(errorPipe.join('|'));
    throw new MhappError(result.message, result.errors);
  }

  signOut();
};

export const fetchBot = async (endPoints, options) => {
  const response = await fetch(endPoints, options);
  const result = await response.json();

  if (!result.status) {
    handleErrorResult(result);
  }

  return result;
};

export const signOut = () => {
  localStorage.removeItem(storageId);
  window.location = '/';
};


// const url = process.env.API_BASE_URL;
const url = 'https://mental-ly.herokuapp.com/api/v1';// 'http://team-087-build4sdg.test:81/api/v1';

export const endPoints = {
  signIn: `${url}/auth/signin`,
  signUp: `${url}/auth/register`,
  verify: `${url}/auth/verify`,
  users: 
    {
      uri: `${url}/users`,
      paths: {
        appointments: '/appointments',
        reviews: '/reviews',
        chats: '/chats',
      }
    }
};

