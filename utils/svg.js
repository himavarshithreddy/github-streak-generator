function renderStreakSVG({ currentStreak, longestStreak, username }) {
    return `
  <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font: bold 18px sans-serif; fill: #ffffff; }
      .value { font: 16px sans-serif; fill: #ffffff; }
      .bg { fill: #0d1117; }
      .card { stroke: #30363d; stroke-width: 1; }
    </style>
    <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
    <text x="20" y="30" class="title">🔥 GitHub Streak for ${username}</text>
    <text x="20" y="60" class="value">Current Streak: ${currentStreak} days</text>
    <text x="20" y="80" class="value">Longest Streak: ${longestStreak} days</text>
  </svg>
    `;
  }
  
  module.exports = { renderStreakSVG };
  