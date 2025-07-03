/* jshint esversion: 6 */

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    console.log('Form data:', { name, email });

    return res.status(200).json({ message: 'Success' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}