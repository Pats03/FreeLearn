import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  // check cookie
  let token = req.cookies?.token;

  // if no cookie, check Authorization header
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  try {
    const payload = verifyJWT(token);

    const { userId, role, standard } = payload;

    req.user = { userId, role };
    if (role === 'user' && standard) {
      req.user.standard = standard;
    }

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};
