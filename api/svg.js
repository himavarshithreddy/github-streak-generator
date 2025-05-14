import { getContributionData, calculateStreaks } from '../github.js';
import { renderStreakSVG } from '../utils/svg.js';

export default async function handler(req, res) {
  const { username, from, to } = req.query;

  if (!username) {
    res.status(400).send('<svg><text>Username is required</text></svg>');
    return;
  }

  try {
    const data = await getContributionData(username, process.env.GITHUB_TOKEN, from, to);
    const stats = calculateStreaks(data);

    const svg = renderStreakSVG({ ...stats });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (err) {
    res.status(500).send(`<svg><text>Error: ${err.message}</text></svg>`);
  }
}
