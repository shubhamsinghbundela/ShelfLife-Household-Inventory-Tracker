import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //It tells Nodemailer Which email server should I connect to?  for ex: Gmail → smtp.gmail.comm, Mailgun → smtp.mailgun.org
  port: 465, // This is the network port used to connect to SMTP server.
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    //This is login credentials for SMTP server
    //Gmail: app password required (not normal password)
    // Mailgun/SendGrid: usually API key used as password
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `${process.env.SMTP_FROM_EMAIL}`,
    to,
    subject,
    html,
  });
};

export { sendMail };
