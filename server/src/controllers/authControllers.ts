import { Request, Response } from "express";
import { usersDB } from "../utils/mocks";

export const signInUser = (req: Request, res: Response) => {
  try {
    const username = req.body?.username;
    const password = req.body?.password;

    if (!username || !password) {
      res.status(404).json({
        message: "Incorrect credentials",
      });
    }

    const user = usersDB?.find(
      (user) => user?.username === username
    );

    if (user) {
      if (password === user?.password) {
        res.status(200).json({
          message: "User Signed in successfully",
          user: { ...user, password: undefined },
        });
        return;
      } else {
        res.status(404).json({
          message: "Incorrect password",
        });
        return;
      }
    } else {
      res.status(404).json({
        message: "Failed to sign in. Unable to find user",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
    return;
  }
};

export const signUpUser = (req: Request, res: Response) => {
  const newUser = {
    username: req.body?.username,
    password: req.body?.password,
    email: req.body?.email,
    phoneNumber: req.body?.phoneNumber,
    name: req.body?.name,
  };

  if (
    !newUser?.name?.trim() ||
    !newUser?.username?.trim() ||
    !newUser?.password?.trim() ||
    !newUser?.email?.trim() ||
    !newUser?.phoneNumber?.trim()
  ) {
    res.status(400).json({
      message: "Missing required fields",
    });
    return;
  }

  const userExists = usersDB?.find(
    (user) => user?.username === newUser?.username
  );

  if (userExists) {
    res.status(400).json({
      message: "User already exists with this username",
    });
    return;
  }

  usersDB.push(newUser);

  const processedUsers = usersDB?.map(
    ({ password, ...user }) => user
  );

  res.status(200).json({
    message: "Account created successfully",
    users: processedUsers,
  });
  return;
};
