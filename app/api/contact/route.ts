import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      
      // Log to console for now (can be replaced with email service)
      console.log('=== NEW CONTACT FORM SUBMISSION ===');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Subject:', subject);
      console.log('Message:', message);
      console.log('Timestamp:', new Date().toISOString());
      console.log('===================================');

      return NextResponse.json(
        { 
          success: true,
          message: 'Message received! We will get back to you soon.',
          note: 'Email service not configured - message logged to console'
        },
        { status: 200 }
      );
    }

    // Send email using SendGrid
    const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: process.env.NOTIFICATION_EMAIL || 'kwybrow@apexnutraus.com' }],
          subject: `Contact Form: ${subject}`
        }],
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'noreply@apexnutraus.com',
          name: 'Apex Nutra Website'
        },
        reply_to: {
          email: email,
          name: name
        },
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #3b9032 0%, #81c029 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
              </div>
              <div style="padding: 30px; background-color: #f9fafb;">
                <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h2 style="color: #3b9032; margin-top: 0;">Contact Information</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  <p><strong>Subject:</strong> ${subject}</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px;">
                  <h2 style="color: #3b9032; margin-top: 0;">Message</h2>
                  <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-left: 4px solid #3b9032; border-radius: 4px;">
                  <p style="margin: 0; font-size: 14px; color: #666;">
                    <strong>Received:</strong> ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        }]
      })
    });

    if (!sendGridResponse.ok) {
      const errorData = await sendGridResponse.text();
      console.error('SendGrid error:', errorData);
      throw new Error('Failed to send email via SendGrid');
    }

    console.log('Contact form email sent successfully to:', process.env.NOTIFICATION_EMAIL);

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.'
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or contact us directly at kwybrow@apexnutraus.com',
        details: error.message
      },
      { status: 500 }
    );
  }
}
