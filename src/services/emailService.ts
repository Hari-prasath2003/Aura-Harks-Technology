/**
 * EmailJS Service
 * Sends email notifications using EmailJS
 * 
 * Configuration:
 * - Service ID: service_j9tn30v
 * - Template ID: template_tm9lov8
 * - Public Key: jtuJWQ6xh0JRjMIne
 */

import emailjs from '@emailjs/browser';
import type { PopupFormData } from '../components/PopupForm';

const EMAILJS_CONFIG = {
  serviceId: 'service_j9tn30v',
  templateId: 'template_tm9lov8',
  publicKey: 'jtuJWQ6xh0JRjMIne',
};

/**
 * Sends form data via EmailJS
 * @param data - Form submission data
 * @returns Promise that resolves when email is sent
 */
export async function sendEmailViaEmailJS(data: PopupFormData): Promise<void> {
  try {
    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // Prepare template parameters
    const templateParams = {
      services: data.services.join(', '),
      services_list: data.services.map(s => `• ${s}`).join('\n'),
      email: data.email,
      whatsapp: data.whatsapp,
      action_type: data.actionType === 'immediate' ? 'Immediate Action' : 'Just Enquiring',
      timestamp: new Date(data.timestamp).toLocaleString(),
      formatted_date: new Date(data.timestamp).toLocaleDateString(),
      formatted_time: new Date(data.timestamp).toLocaleTimeString(),
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ EmailJS: Email sent successfully', response);
  } catch (error) {
    console.error('❌ EmailJS: Failed to send email', error);
    throw error;
  }
}
