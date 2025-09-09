import React, { useState } from 'react';
import { sendFrontendLog } from '../utils/logClient';

sendFrontendLog("some message");

export default function UrlShortenerPage() {
  const [input, setInput] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    try {
      try {
        await sendLog("backend", "info", "service", `Short URL created: ${code}`);
      } catch (e) {
        console.error("sendLog failed:", e && e.message ? e.message : e);
      }


      const response = await fetch('http://localhost:3000/shorturls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: input }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Unknown error');
      }
      const data = await response.json();
      setShortUrl(data.shortLink);
      setError('');
      await sendFrontendLog("info", "api", "Short URL created successfully");
    } catch (err) {
      setError(err.message);
      await sendFrontendLog("error", "api", `Failed to shorten URL: ${err.message}`);
    }
  };

  return (
    <div>
      <input
        placeholder="Enter URL to shorten"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "300px", marginRight:"10px" }}
      />
      <button onClick={handleShorten}>Shorten URL</button>
      {shortUrl && <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}
