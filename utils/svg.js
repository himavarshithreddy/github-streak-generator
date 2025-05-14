export function renderStreakSVG({ 
  currentStreak, currentStreakStart, currentStreakEnd,
  longestStreak, longestStreakStart, longestStreakEnd,
  totalContributions, username 
}) {
  // Format dates if they exist
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const currentStreakDates = currentStreak > 0 
    ? `${formatDate(currentStreakStart)} → ${formatDate(currentStreakEnd)}`
    : 'No current streak';

  const longestStreakDates = longestStreak > 0
    ? `${formatDate(longestStreakStart)} → ${formatDate(longestStreakEnd)}`
    : 'No streak data';

  return `
<svg width="495" height="185" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: bold 20px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58a6ff; }
    .label { font: bold 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }
    .value { font: 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }
    .bg { fill: #0d1117; }
    .card { stroke: #30363d; fill: #161b22; stroke-width: 1; rx: 6; }
    .fire { font-size: 24px; }
  </style>
  <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
  <rect x="10" y="10" width="475" height="165" class="card"/>
  
  <text x="25" y="35" class="title">🔥 GitHub Contribution Streaks</text>
  <text x="25" y="55" class="label">User:</text>
  <text x="90" y="55" class="value">${username}</text>
  
  <text x="25" y="85" class="label">Current Streak:</text>
  <text x="155" y="85" class="value fire">${currentStreak} days</text>
  <text x="25" y="105" class="value" font-size="13">${currentStreakDates}</text>
  
  <text x="25" y="135" class="label">Longest Streak:</text>
  <text x="155" y="135" class="value fire">${longestStreak} days</text>
  <text x="25" y="155" class="value" font-size="13">${longestStreakDates}</text>

  <text x="25" y="175" class="label">Total Contributions:</text>
  <text x="175" y="175" class="value fire">${totalContributions}</text>
</svg>
  `;
}
