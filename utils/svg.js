export function renderStreakSVG({ 
  currentStreak, currentStreakStart, currentStreakEnd,
  longestStreak, longestStreakStart, longestStreakEnd,
  totalContributions
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
    .title { font: bold 20px 'Consolas', 'Courier New', monospace; fill: #00A0FF; }
    .label { font: bold 16px 'Consolas', 'Courier New', monospace; fill: #ABB2BF; }
    .value { font: 16px 'Consolas', 'Courier New', monospace; fill: #E0E0E0; }
    .bg { fill: #282C34; }
    .card { stroke: #1C1E24; fill: #21252B; stroke-width: 1; rx: 6; }
    .fire { font-size: 24px; fill: #FFD700; }
  </style>
  <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
  <rect x="10" y="10" width="475" height="165" class="card"/>
  
  <text x="25" y="35" class="title">🔥 GitHub Contribution Streaks</text>
  
  <text x="25" y="80" class="label">Current Streak:</text>
  <text x="180" y="80" class="value fire">${currentStreak} days</text>
  <text x="25" y="100" class="value" font-size="13">${currentStreakDates}</text>
  
  <text x="25" y="130" class="label">Longest Streak:</text>
  <text x="180" y="130" class="value fire">${longestStreak} days</text>
  <text x="25" y="150" class="value" font-size="13">${longestStreakDates}</text>

  <text x="25" y="170" class="label">Total Contributions:</text>
  <text x="200" y="170" class="value fire">${totalContributions}</text>
</svg>
  `;
}
