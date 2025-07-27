import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import sanitizeHtml from 'sanitize-html';
import sgMail from '@sendgrid/mail';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

const router = express.Router();

// Rate limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});

// POST /api/contact
router.post(
  '/',
  limiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().matches(/^\+?\d{7,15}$/).withMessage('Valid phone number is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }

    const { name, email, phone, message } = req.body;
    const sanitizedData = {
      name: sanitizeHtml(name),
      email: sanitizeHtml(email),
      phone: sanitizeHtml(phone),
      message: sanitizeHtml(message),
    };

    let mongoSaved = false;
    try {
      // Verify MongoDB connection
      console.log('Checking MongoDB connection...');
      await mongoose.connection.db.admin().ping();
      console.log('MongoDB connection active');

      // Save to MongoDB with retry
      console.log('Saving to MongoDB:', sanitizedData);
      let saveAttempts = 0;
      const maxAttempts = 3;
      while (saveAttempts < maxAttempts) {
        try {
          const contact = new Contact(sanitizedData);
          await contact.save();
          console.log('MongoDB save successful');
          mongoSaved = true;
          break;
        } catch (saveError) {
          saveAttempts++;
          console.warn(`MongoDB save attempt ${saveAttempts} failed:`, saveError.message);
          if (saveAttempts === maxAttempts) {
            console.error('MongoDB save failed after max attempts:', saveError);
            break; // Proceed without throwing to attempt email
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Send email via SendGrid
      if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        try {
          console.log('Sending email to: yoheswaran.2108@gmail.com');
          await sgMail.send({
            from: process.env.SENDGRID_FROM_EMAIL || 'yoheswaran.2108@gmail.com',
            to: 'yoheswaran.2108@gmail.com',
            subject: `New Contact from ${sanitizedData.name}`,
            text: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nPhone: ${sanitizedData.phone}\nMessage: ${sanitizedData.message}`,
          });
          console.log('Email sent via SendGrid');
        } catch (emailError) {
          console.warn('Failed to send email via SendGrid:', emailError.message, emailError.response?.body);
        }
      } else {
        console.warn('Skipping email: Missing SendGrid API key');
      }

      // Return success even if MongoDB failed, but log the issue
      res.json({ 
        message: 'Message received successfully', 
        mongoStatus: mongoSaved ? 'Successfully Saved' : 'Database save failed, email sent'
      });
    } catch (error) {
      console.error('Contact form error:', {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({ error: 'Failed to process message', details: error.message });
    }
  }
);

export default router;