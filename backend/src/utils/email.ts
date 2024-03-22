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
      user: "ankit2099shukla@gmail.com",
      pass: "fdr7vBwGWtPX5HRk",
    },
  });

  await transport.sendMail({
    from: "noreply@spurbayfashions.com",
    to: to,
    subject: subject,
    html: message,
  });
};
