
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { googleLogin, facebookLogin } from "../controller/socialAuthentication.controller.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

// google
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/social/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const data = await googleLogin(profile);
          done(null, data);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// facebook
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/api/social/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const data = await facebookLogin(profile);
          done(null, data);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

export default passport;
