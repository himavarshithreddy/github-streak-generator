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
    .title { font: bold 20px 'Consolas', 'Courier New', monospace; fill: #569CD6; }
    .label { font: bold 16px 'Consolas', 'Courier New', monospace; fill: #9CDCFE; }
    .value { font: 16px 'Consolas', 'Courier New', monospace; fill: #D4D4D4; }
    .dates { font: 13px 'Consolas', 'Courier New', monospace; fill: #CE9178; }
    .fire { font-size: 24px; fill: #DCDCAA; }
    .bracket { fill: #D4D4D4; }
    .keyword { fill: #569CD6; }
    .function { fill: #DCDCAA; }
    .comment { fill: #6A9955; }
    .grid-line { stroke: #3E3E42; stroke-width: 0.5; stroke-dasharray: 2,2; }
  </style>
  
  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
  <rect x="10" y="10" width="475" height="175" class="card"/>
  
  <!-- Grid decoration in background (like IDE) -->
  <line x1="20" y1="45" x2="475" y2="45" class="grid-line" />
  <line x1="20" y1="110" x2="475" y2="110" class="grid-line" />
  
  <!-- Title with code style -->
  <text x="25" y="35" class="title">
    <tspan class="comment">// </tspan>
    <tspan>GitHub</tspan>
    <tspan class="function">.contributionStats</tspan>
    <tspan class="bracket">()</tspan>
  </text>
  
  <!-- Current Streak -->
  <text x="25" y="70" class="label">
    <tspan class="keyword">const</tspan> currentStreak = 
    <tspan class="bracket">{</tspan>
  </text>
  <text x="155" y="70" class="value fire">${currentStreak} days</text>
  <text x="30" y="90" class="dates">
    <tspan class="comment">// </tspan>${currentStreakDates}
  </text>
  
  <!-- Longest Streak -->
  <text x="25" y="130" class="label">
    <tspan class="keyword">const</tspan> longestStreak = 
    <tspan class="bracket">{</tspan>
  </text>
  <text x="155" y="130" class="value fire">${longestStreak} days</text>
  <text x="30" y="150" class="dates">
    <tspan class="comment">// </tspan>${longestStreakDates}
  </text>
  
  <!-- Total Contributions -->
  <text x="25" y="180" class="label">
    <tspan class="keyword">const</tspan> totalContributions = 
    <tspan class="bracket">{</tspan>
  </text>
  <text x="210" y="180" class="value fire">${totalContributions}</text>
</svg>
  `;
}
