import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if environment variables are configured
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX || !process.env.MAILCHIMP_LIST_ID) {
      console.error('Mailchimp environment variables are not configured');
      return NextResponse.json(
        { error: 'Newsletter service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Add subscriber to Mailchimp
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });

    console.log('New subscriber added to Mailchimp:', email);

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully subscribed to newsletter' 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Mailchimp subscription error:', error);
    
    // Handle specific Mailchimp errors
    if (error.status === 400) {
      // Check if email already exists
      if (error.response?.body?.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      }
      // Handle invalid email
      if (error.response?.body?.title === 'Invalid Resource') {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Handle authentication errors
    if (error.status === 401) {
      console.error('Mailchimp authentication failed. Check your API key.');
      return NextResponse.json(
        { error: 'Newsletter service configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
