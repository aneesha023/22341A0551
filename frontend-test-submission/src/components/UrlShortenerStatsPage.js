import React, { useEffect, useState } from 'react';
import { sendFrontendLog } from '../utils/logClient';

export default function UrlShortenerStatsPage() {
  const [statsList, setStatsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3000/shorturls/xyz12'); // Example shortcode or endpoint to get stats
        if (!res.ok) throw new Error('Failed to fetch statistics');
        
        const data = await res.json();
        setStatsList([data]);
        await sendFrontendLog("info", "api", "Fetched URL stats successfully");
      } catch (err) {
        setError(err.message);
        await sendFrontendLog("error", "api", `Error fetching stats: ${err.message}`);
      }
    };
    fetchStats();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Shortened URLs Statistics</h2>
      {statsList.length === 0 && <div>No URLs found.</div>}
      {statsList.map((stat) => (
        <div key={stat.shortLink} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <p><strong>Short Link:</strong> <a href={stat.shortLink}>{stat.shortLink}</a></p>
          <p><strong>Created At:</strong> {stat.createdAt}</p>
          <p><strong>Expiry:</strong> {stat.expiry}</p>
          <p><strong>Total Clicks:</strong> {stat.clickCount}</p>
          <p><strong>Click Details:</strong></p>
          <ul>
            {stat.clicks.length > 0 ? stat.clicks.map((click, idx) => (
              <li key={idx}>Time: {click.timestamp}, Source: {click.source}, Geo: {click.geo || 'N/A'}</li>
            )) : <li>No click data available</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}
