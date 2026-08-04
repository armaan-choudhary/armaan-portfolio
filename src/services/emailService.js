import emailjs from '@emailjs/browser';

/**
 * Sends an intake / contact enquiry email using EmailJS.
 * Optionally sends an auto-reply receipt if VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID is configured.
 * 
 * @param {Object} params
 * @param {string} params.name - Sender's name or organization
 * @param {string} params.email - Sender's return email address
 * @param {string} params.message - Details / message content
 * @returns {Promise<import('@emailjs/browser').EmailJSResponseStatus>}
 */
export async function sendEnquiryEmail({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_vi3b9ql';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_brpnqis';
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_i234nwn';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '5LZnJwBlnH4bUgy8L';

  if (!serviceId || !templateId || !publicKey) {
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

  // Primary notification to Armaan
  const primaryPromise = emailjs.send(serviceId, templateId, templateParams, publicKey);

  // Optional auto-reply to the inquirer if configured
  if (autoReplyTemplateId && autoReplyTemplateId.trim() !== '') {
    emailjs
      .send(serviceId, autoReplyTemplateId, templateParams, publicKey)
      .catch((err) => {
        console.warn('Auto-reply email dispatch failed (primary email still sent):', err);
      });
  }

  return primaryPromise;
}
