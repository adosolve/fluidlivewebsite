import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, company, message, captchaToken } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Verify reCAPTCHA
  if (!captchaToken) {
    return res.status(400).json({ error: 'Please complete the CAPTCHA verification.' });
  }

  try {
    const captchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
      }
    );

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ error: 'CAPTCHA verification failed. Please try again.' });
    }

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"FluidLive Contact Form" <${process.env.SMTP_USER}>`,
      to: 'sodhi@fluid.live',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This message was sent from the Fluid.Live website contact form.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

export default router;
