// api/maintenance.js
// Vercel Serverless Function — Returns 503 if maintenance mode is active
// Used by crawlers, uptime monitors, and SEO tools

export default async function handler(req, res) {
  // eslint-disable-next-line no-undef
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'huflit-test';
  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/siteConfig`;

  try {
    const response = await fetch(firestoreUrl);
    if (!response.ok) {
      // If Firestore read fails, assume no maintenance
      res.status(200).json({ isMaintenance: false, error: 'Could not check status' });
      return;
    }

    const data = await response.json();
    const fields = data.fields || {};
    const isMaintenance = fields.isMaintenance?.booleanValue === false ? false : !!fields.isMaintenance?.booleanValue;

    if (isMaintenance) {
      const retryAfter = 3600; // 1 hour default
      res.setHeader('Retry-After', retryAfter);
      res.status(503).json({
        status: 503,
        message: fields.message?.stringValue || 'System is under maintenance',
        retryAfter,
      });
      return;
    }

    // Cache for 30 seconds when not in maintenance
    res.setHeader('Cache-Control', 'public, max-age=30');
    res.status(200).json({ isMaintenance: false });
  } catch {
    res.status(200).json({ isMaintenance: false, error: 'Check failed' });
  }
}
