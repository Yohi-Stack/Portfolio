// server/test-email.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+919489450566',
    message: 'This is a test message.',
  };
  sgMail
    .send({
      from: process.env.EMAIL_USER || 'yoheswaran.2108@gmail.com',
      to: 'yoheswaran.2108@gmail.com',
      subject: `Test Contact from ${testData.name}`,
      text: `Name: ${testData.name}\nEmail: ${testData.email}\nPhone: ${testData.phone}\nMessage: ${testData.message}`,
    })
    .then(() => console.log('Email sent via SendGrid'))
    .catch(error => console.error('Failed to send email via SendGrid:', error.message));
} else {
  console.warn('Skipping email: Missing SendGrid API key');
}