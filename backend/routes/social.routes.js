import express from "express";
import passport from "../config/passport.js";


const socialRouter = express.Router();

// GOOGLE 
socialRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

socialRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.json({
      message: "Google login success",
      ...req.user,
    });
  }
);

// FACEBOOK 
socialRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

socialRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.json({
      message: "Facebook login success",
      ...req.user,
    });
  }
);

export default socialRouter;
