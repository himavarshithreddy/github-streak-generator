require("dotenv").config();
const express = require("express");
const { getContributionData, calculateStreaks } = require("./github");
const { renderStreakSVG } = require("./utils/svg");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/streak/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const data = await getContributionData(username, process.env.GITHUB_TOKEN);
    const streaks = calculateStreaks(data);
    res.json({ username, ...streaks });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch streak data" });
  }
});

app.get("/api/streak/:username/svg", async (req, res) => {
  const { username } = req.params;
  try {
    const data = await getContributionData(username, process.env.GITHUB_TOKEN);
    const streaks = calculateStreaks(data);
    const svg = renderStreakSVG({ ...streaks, username });
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (err) {
    res.status(500).send("<svg><text>Error loading SVG</text></svg>");
  }
});

app.get("/", (req, res) => {
  res.send("GitHub Streak API is running.");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
