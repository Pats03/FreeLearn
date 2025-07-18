import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  // check cookie
  let token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

  // if no cookie, check Authorization header
  if (!token)
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });

 console.log('Received Token in Middleware:', token);

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
