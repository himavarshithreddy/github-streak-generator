const { getContributionData, calculateStreaks } = require('../github');

module.exports = async (req, res) => {
  const {
    query: { from, to },
    method,
  } = req;

  const username = req.query.username || req.query.user || null;
  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }

  try {
    const data = await getContributionData(username, process.env.GITHUB_TOKEN, from, to);
    const streaks = calculateStreaks(data);
    res.status(200).json({ username, from, to, ...streaks });
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch streak data', details: err.message });
  }
};
