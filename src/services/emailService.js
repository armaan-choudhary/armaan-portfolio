import emailjs from '@emailjs/browser';

/**
 * Sends an intake / contact enquiry email using EmailJS.
 * 
 * @param {Object} params
 * @param {string} params.name - Sender's name or organization
 * @param {string} params.email - Sender's return email address
 * @param {string} params.message - Details / message content
 * @returns {Promise<import('@emailjs/browser').EmailJSResponseStatus>}
 */
export async function sendEnquiryEmail({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (
    !serviceId ||
    !templateId ||
    !publicKey ||
    serviceId === 'your_service_id' ||
    templateId === 'your_template_id' ||
    publicKey === 'your_public_key'
  ) {
    throw new Error(
      'Email service configuration missing. Please configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.'
    );
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    message: message,
    to_name: 'Armaan Choudhary',
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
}
