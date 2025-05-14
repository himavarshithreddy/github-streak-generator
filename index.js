require("dotenv").config();
const express = require("express");
const { getContributionData, calculateStreaks } = require("./github");
const { renderStreakSVG } = require("./utils/svg");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * JSON endpoint for streak data, with optional from/to query parameters
 */
app.get("/api/streak/:username", async (req, res) => {
  const { username } = req.params;
  const { from, to } = req.query;
  try {
    // Pass optional from/to to support dynamic windows; defaults to last year
    const data = await getContributionData(username, process.env.GITHUB_TOKEN, from, to);
    const streaks = calculateStreaks(data);
    res.json({ username, from: from || null, to: to || null, ...streaks });
  } catch (err) {
    console.error("Error fetching streak data:", err);
    res.status(500).json({ error: "Unable to fetch streak data", details: err.message });
  }
});

/**
 * SVG badge endpoint for streak data, with optional from/to query parameters
 */
app.get("/api/streak/:username/svg", async (req, res) => {
  const { username } = req.params;
  const { from, to } = req.query;
  try {
    // getContributionData now returns an object: { contributionMap, overallStartDate }
    const contributionData = await getContributionData(username, process.env.GITHUB_TOKEN, from, to);
    // calculateStreaks expects this object and will return contributionsStartDate in its result
    const stats = calculateStreaks(contributionData);
    const {
      totalContributions,
      currentStreak,
      currentStreakStart,
      currentStreakEnd,
      longestStreak,
      longestStreakStart,
      longestStreakEnd,
      contributionsStartDate // Destructure contributionsStartDate from stats
    } = stats;

    const svg = renderStreakSVG({
      username, // username is from req.params, not from stats
      totalContributions,
      currentStreak,
      currentStreakStart,
      currentStreakEnd,
      longestStreak,
      longestStreakStart,
      longestStreakEnd,
      contributionsStartDate // Pass it here
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (err) {
    console.error("SVG generation error:", err);
    res.status(500).send(`<svg><text>Error: ${err.message}</text></svg>`);
  }
});

app.get("/", (req, res) => {
  res.send("GitHub Streak API is running.");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
