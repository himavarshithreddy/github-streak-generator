const { getContributionData, calculateStreaks } = require('../github');
const { renderStreakSVG } = require('../utils/svg');

module.exports = async (req, res) => {
  const username = req.query.username;
  const { from, to } = req.query;

  if (!username) {
    res.status(400).send('<svg><text>Username is required</text></svg>');
    return;
  }

  try {
    const data = await getContributionData(username, process.env.GITHUB_TOKEN, from, to);
    const stats = calculateStreaks(data);

    const svg = renderStreakSVG({ username, ...stats });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (err) {
    res.status(500).send(`<svg><text>Error: ${err.message}</text></svg>`);
  }
};
