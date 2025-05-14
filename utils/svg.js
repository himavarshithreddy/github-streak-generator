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
<svg width="495" height="195" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #1E1E1E; }
    .card { stroke: #3E3E42; fill: #252526; stroke-width: 1; rx: 6; }
    .label { font: bold 14px 'Consolas', 'Courier New', monospace; fill: #9CDCFE; }
    .value { font: bold 26px 'Consolas', 'Courier New', monospace; fill: #D4D4D4; }
    .dates { font: 12px 'Consolas', 'Courier New', monospace; fill: #CE9178; }
    .icon { fill: #DCDCAA; }
    .divider { stroke: #3E3E42; stroke-width: 1; stroke-dasharray: 4,2; }
  </style>
  
  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
  <rect x="10" y="10" width="475" height="175" class="card"/>
  
  <!-- Vertical dividers -->
  <line x1="165" y1="30" x2="165" y2="170" class="divider" />
  <line x1="330" y1="30" x2="330" y2="170" class="divider" />
  
  <!-- Column 1: Current Streak - Fire icon -->
  <svg x="50" y="45" width="64" height="64" viewBox="0 0 24 24" class="icon">
    <path d="M12 2c.9 2.5 0 4.5-1 6.5-.8 1.5-2 3-2 4.5 0 2.5 2 4 4 4s4-1.5 4-4c0-1.5-1.2-3-2-4.5-1-2 0-4-3-6.5zm0 10c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z"/>
  </svg>
  <text x="82" y="100" class="label" text-anchor="middle">Current Streak</text>
  <text x="82" y="130" class="value" text-anchor="middle">${currentStreak}</text>
  <text x="82" y="155" class="dates" text-anchor="middle">days</text>
  
  <!-- Column 2: Longest Streak - Trophy icon -->
  <svg x="215" y="45" width="64" height="64" viewBox="0 0 24 24" class="icon">
    <path d="M18 5h-2V3H8v2H6C4.9 5 4 5.9 4 7v1c0 2.3 1.5 4.2 3.6 4.8 0.6 1.9 2.1 3.3 4.1 3.9 0.1 0.7 0.2 1.3 0.3 2H8v2h8v-2h-4c0.1-0.7 0.2-1.3 0.3-2 2-0.6 3.5-2 4.1-3.9 2.1-0.6 3.6-2.6 3.6-4.8V7c0-1.1-0.9-2-2-2zm-1 3c0 1.7-1.3 3-3 3H10c-1.7 0-3-1.3-3-3H6V7h2h8h2v1h-1z"/>
  </svg>
  <text x="247" y="100" class="label" text-anchor="middle">Longest Streak</text>
  <text x="247" y="130" class="value" text-anchor="middle">${longestStreak}</text>
  <text x="247" y="155" class="dates" text-anchor="middle">days</text>
  
  <!-- Column 3: Total Contributions - Code icon -->
  <svg x="380" y="45" width="64" height="64" viewBox="0 0 24 24" class="icon">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
  <text x="412" y="100" class="label" text-anchor="middle">Total</text>
  <text x="412" y="130" class="value" text-anchor="middle">${totalContributions}</text>
  <text x="412" y="155" class="dates" text-anchor="middle">contributions</text>
</svg>
  `;
}
