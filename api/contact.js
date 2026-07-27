/**
 * VERCEL SERVERLESS FUNCTION: Contact Form API
 * =============================================
 * This file handles POST requests to /api/contact on Vercel.
 * It forwards contact form submissions to your email via Web3Forms.
 *
 * HOW TO SET UP EMAIL DELIVERY (One-time, free):
 * 1. Go to https://web3forms.com
 * 2. Enter your email (anubhavsaini2506@gmail.com) and click "Create Access Key"
 * 3. You'll get an access key — copy it
 * 4. Go to your Vercel project → Settings → Environment Variables
 * 5. Add a new variable:
 *      Name:  WEB3FORMS_KEY
 *      Value: <paste your access key here>
 * 6. Redeploy your project — contact form submissions will now arrive in your Gmail!
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  // Forward to Web3Forms (free email delivery service — no server needed)
  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    // If no key set, still return success (fallback — form data is logged)
    console.log('[Contact Form Submission]', { name, email, message, time: new Date().toISOString() });
    return res.status(200).json({ success: true, message: 'Message received.' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject: `New Portfolio Contact from ${name.trim()}`
      })
    });

    const result = await response.json();

    if (result.success) {
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } else {
      console.error('[Web3Forms Error]', result);
      return res.status(500).json({ success: false, error: 'Failed to send message.' });
    }
  } catch (err) {
    console.error('[Contact API Error]', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
}
