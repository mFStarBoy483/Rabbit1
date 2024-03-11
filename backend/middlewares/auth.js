import catchAsyncErrors from "./catchAsyncErrors.js"
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import Jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncErrors (async (req, res, next) => {
const { token } = req.cookies;
if (!token) {
    return next(new ErrorHandler('Login first to access this resource', 401));
}
const decoded = Jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id)
next();
});
// Authorize user roles
// Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403)
        );
      }
  
      next();
    };
  };
