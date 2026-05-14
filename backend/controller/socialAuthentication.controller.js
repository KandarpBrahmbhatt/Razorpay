import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleLogin = async (profile) => {
  const { id, displayName, emails, photos } = profile;

  const email = emails?.[0]?.value;

  let user = await User.findOne({ email });

  if (user) {
    user.providers.google = {
      id,
      email
    };

    if (!user.name) user.name = displayName;
    if (!user.avatar) user.avatar = photos?.[0]?.value;

    await user.save();
  } else {
    user = await User.create({
      name: displayName,
      email,
      avatar: photos?.[0]?.value,
      providers: {
        google: { id, email }
      }
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  return { user, token };
}; 

export const facebookLogin = async (profile) => {
  const { id, displayName, emails, photos } = profile;

  const email = emails?.[0]?.value || `${id}@facebook.com`;

  let user = await User.findOne({ email });

  if (user) {
    user.providers.facebook = {
      id,
      email
    };

    if (!user.name) user.name = displayName;
    if (!user.avatar) user.avatar = photos?.[0]?.value;

    await user.save();
  } else {
    user = await User.create({
      name: displayName,
      email,
      avatar: photos?.[0]?.value,
      providers: {
        facebook: { id, email }
      }
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  return { user, token };
}; 