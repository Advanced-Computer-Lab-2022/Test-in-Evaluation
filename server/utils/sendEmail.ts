import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.TEAM_EMAIL,
        pass: process.env.TEAM_PASSWORD,
    },
});

export function sendEmail(email: string, subject: string, body: string) {
    const mail = {
        from: process.env.TEAM_EMAIL,
        to: email,
        subject,
        text: body,
    };

    return mailer.sendMail(mail);
}
