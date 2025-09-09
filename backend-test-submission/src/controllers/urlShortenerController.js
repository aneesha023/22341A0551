const { sendLog } = require('../../../logging-middleware/logMiddleware');

const urlStore = {}; // In-memory store for demo

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) throw new Error('URL is required');

    const code = shortcode || Math.random().toString(36).substring(2, 7);

    urlStore[code] = {
      url,
      validity,
      createdAt: new Date().toISOString(),
      expiry: new Date(Date.now() + validity * 60000).toISOString(),
      clicks: [],
    };

    await sendLog("backend", "info", "service", `Short URL created: ${code}`);

    res.status(201).json({
      shortLink: `http://localhost:3000/shorturls/${code}`,
      expiry: urlStore[code].expiry,
    });
  } catch (err) {
    await sendLog("backend", "error", "service", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const code = req.params.shortcode;
    if (!urlStore[code]) throw new Error('Shortcode not found');

    await sendLog("backend", "info", "service", `Stats retrieved for: ${code}`);

    res.status(200).json({
      shortLink: `http://localhost:3000/shorturls/${code}`,
      createdAt: urlStore[code].createdAt,
      expiry: urlStore[code].expiry,
      clickCount: urlStore[code].clicks.length,
      clicks: urlStore[code].clicks,
    });
  } catch (err) {
    await sendLog("backend", "error", "service", err.message);
    res.status(404).json({ error: err.message });
  }
};
