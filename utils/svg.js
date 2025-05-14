export function renderStreakSVG({ 
  currentStreak, currentStreakStart, currentStreakEnd,
  longestStreak, longestStreakStart, longestStreakEnd,
  totalContributions
}) {
  // Format dates if they exist
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const currentStreakDates = currentStreak > 0 
    ? `${formatDate(currentStreakStart)} - Present`
    : 'No current streak';

  const longestStreakDates = longestStreak > 0
    ? `${formatDate(longestStreakStart)} - ${formatDate(longestStreakEnd)}`
    : 'No streak data';
    
  // Calculate heights for vertical bars
  const maxStreakValue = Math.max(currentStreak, longestStreak, 1);
  const currentStreakHeight = Math.min(100, (currentStreak / maxStreakValue) * 100);
  const longestStreakHeight = Math.min(100, (longestStreak / maxStreakValue) * 100);

  return `
<svg width="400" height="160" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #0d1117; }
    .card { fill: #161b22; stroke: #30363d; stroke-width: 1; }
    .title { font: bold 16px -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; fill: #c9d1d9; }
    .column { stroke: #30363d; stroke-width: 1; }
    .current { fill: #238636; }
    .longest { fill: #1f6feb; }
    .stat { font: bold 18px -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; text-anchor: middle; fill: #e6edf3; }
    .label { font: 14px -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; text-anchor: middle; fill: #8b949e; }
    .dates { font: 11px -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; text-anchor: middle; fill: #8b949e; }
    .total { font: bold 16px -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; fill: #c9d1d9; }
  </style>

  <!-- Background -->
  <rect width="100%" height="100%" rx="6" class="bg" />
  <rect x="5" y="5" width="390" height="150" rx="6" class="card" />

  <!-- Title -->
  <text x="20" y="30" class="title">🔥 GitHub Contribution Streaks</text>
  
  <!-- Current Streak Column -->
  <rect x="60" y="${130 - currentStreakHeight}" width="80" height="${currentStreakHeight}" rx="3" class="column current" />
  <text x="100" y="${120 - currentStreakHeight}" class="stat">${currentStreak}</text>
  <text x="100" y="145" class="label">Current Streak</text>
  <text x="100" y="158" class="dates">${currentStreakDates}</text>
  
  <!-- Longest Streak Column -->
  <rect x="160" y="${130 - longestStreakHeight}" width="80" height="${longestStreakHeight}" rx="3" class="column longest" />
  <text x="200" y="${120 - longestStreakHeight}" class="stat">${longestStreak}</text>
  <text x="200" y="145" class="label">Longest Streak</text>
  <text x="200" y="158" class="dates">${longestStreakDates}</text>
  
  <!-- Total Contributions -->
  <text x="300" y="70" class="total">Total Contributions:</text>
  <text x="300" y="95" class="stat" style="font-size: 24px; text-anchor: start;">${totalContributions.toLocaleString()}</text>
</svg>
  `;
}