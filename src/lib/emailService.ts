/**
 * Email Service for sending notifications
 *
 * In a real application, this would connect to an email service provider
 * like SendGrid, Mailgun, AWS SES, etc.
 */

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

interface TextMessageOptions {
  to: string;
  message: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  // This is a mock function that simulates sending an email
  // In a real application, you would use an email service API

  console.log("Sending email:");
  console.log(`To: ${options.to}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Body: ${options.body}`);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return true to indicate success
  return true;
};

export const sendTextMessage = async (
  options: TextMessageOptions,
): Promise<boolean> => {
  // This is a mock function that simulates sending a text message
  // In a real application, you would use a service like Twilio, Nexmo, etc.

  console.log("Sending text message:");
  console.log(`To: ${options.to}`);
  console.log(`Message: ${options.message}`);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return true to indicate success
  return true;
};

export const sendBookingConfirmation = async (
  email: string,
  phone: string,
  name: string,
  service: string,
  date: Date,
  time: string,
): Promise<void> => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  // Send email confirmation
  await sendEmail({
    to: email,
    subject: "Your IT Service Appointment Confirmation",
    body: `
      Hello ${name},

      Thank you for booking an appointment with OC Tech Support!

      Your appointment details:
      Service: ${service}
      Date: ${formattedDate}
      Time: ${time}

      If you need to reschedule or cancel, please contact us at (949) 555-1234.

      Best regards,
      OC Tech Support Team
    `,
  });

  // Send text message confirmation
  await sendTextMessage({
    to: phone,
    message: `OC Tech Support: Your appointment for ${service} is confirmed for ${formattedDate} at ${time}. Questions? Call (949) 555-1234.`,
  });
};
