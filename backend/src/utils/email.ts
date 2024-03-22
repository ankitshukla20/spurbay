import nodemailer from "nodemailer";

interface SendEmailProps {
  to: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({ to, subject, message }: SendEmailProps) => {
  const transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: "noreply@spurbayfashions.com",
    to: to,
    subject: subject,
    html: message,
  });
};
