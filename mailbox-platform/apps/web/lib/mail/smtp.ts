import nodemailer from "nodemailer";

export async function sendViaSmtp(
  host: string,
  port: number,
  email: string,
  password: string,
  to: string,
  subject: string,
  body: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: email, pass: password },
  });

  await transporter.sendMail({
    from: email,
    to,
    subject,
    html: body,
  });
}
