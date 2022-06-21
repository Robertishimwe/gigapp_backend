import User from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  regiserValidation,
  loginValidation,
} from "../middleware/usersValidation";

class UserController {
  static async createUser(req, res) {
    try {
      const { error } = regiserValidation(req.body);
      if (error)
        return res
          .status(400)
          .send({ response: error.details[0].message.replace(/["\\]/g, "") });
      const user = await User.findOne({ userEmail: req.body.userEmail });
      const userName = await User.findOne({ userName: req.body.userName });
      if (user) return res.status(400).send({ message: "User already exists" });
      if (userName)
        return res.status(400).send({ message: "User name already taken" });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userRole: req.body.userRole,
      });
      const savedUser = await newUser.save();
      res.status(201).send({
        Message: "User created successfully",
        user: savedUser,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async login(req, res) {
    try {
      const { error } = loginValidation(req.body);
      if (error)
        return res
          .status(400)
          .send({ response: error.details[0].message.replace(/["\\]/g, "") });
      const user = await User.findOne({ userEmail: req.body.userEmail });
      if (!user)
        return res.status(400).send({ message: "User does not exist" });
      const validPass = await bcrypt.compare(
        req.body.userPassword,
        user.userPassword
      );
      if (!validPass)
        return res.status(400).send({ message: "Invalid password" });
      const token = jwt.sign(
        {
          _id: user._id,
          userEmail: user.userEmail,
          userRole: user.userRole,
          userName: user.userName,
        },
        process.env.TOKEN_SECRET
      );
      res.header("token", token).send({ message: token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async findAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async findOneUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async findUserByEmail(req, res) {
    try {
      const user = await User.findOne({ userEmail: req.params.email });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async findUserByName(req, res) {
    try {
      const user = await User.findOne({ userName: req.params.name });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async findUserByRole(req, res) {
    try {
      const user = await User.findOne({ userRole: req.params.role });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async assignBadge(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        badges: req.body.badges,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async assignRole(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        userRole: req.body.userRole,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async blockUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        blocked: req.body.blocked,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async unblockUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        blocked: req.body.blocked,
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async deleteUserBadges(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        badges: [],
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default UserController;
