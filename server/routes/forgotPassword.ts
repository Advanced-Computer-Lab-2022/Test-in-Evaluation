import { hash } from "argon2";
import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { User } from "../mongo";
import { Request, Response } from "../types/express";
import { UserTypes } from "../types/user";

const path = "/api/forgot_password" as const;

const Input = Record({
  email: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
  app.post(
    path,
    validateInput(Input),
    async (req: Request<Input>, res: Response) => {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user || user.userType == UserTypes.admin) {
        return res.status(400).send("Invalid User");
      }
      const newPassword = randomlyGeneratePassword();
      user.passwordHash = await hash(newPassword);
      user.save();
      sendEmail(email, user.firstName ?? "", newPassword);
      res.send({ success: true });
    }
  );
};

function randomlyGeneratePassword(): string {
  var password = "";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const upperCase = lowerCase.toUpperCase();
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";

  for (let i = 0; i < 16; i++) {
    var random = Math.floor(Math.random() * 4);
    switch (random) {
      case 0:
        password += lowerCase[Math.floor(Math.random() * 26)];
        break;

      case 1:
        password += upperCase[Math.floor(Math.random() * 26)];
        break;

      case 2:
        password += numbers[Math.floor(Math.random() * 10)];
        break;

      default:
        password += symbols[Math.floor(Math.random() * 10)];
        break;
    }
  }
  return password;
}

const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.TEAM_EMAIL,
    pass: process.env.TEAM_PASSWORD,
  },
});

function sendEmail(
  email: string,
  firstName: string,
  newPassword: string
): void {
  const mail = {
    from: process.env.TEAM_EMAIL,
    to: email,
    subject: "Password Change",
    text: `Dear ${firstName},\nYour new password is ${newPassword}`,
  };

  mailer.sendMail(mail);
}
