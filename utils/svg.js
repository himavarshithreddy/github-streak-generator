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
    
  // Calculate percentage for streak bars
  const maxStreakValue = Math.max(currentStreak, longestStreak, 1);
  const currentStreakWidth = (currentStreak / maxStreakValue) * 100;
  const longestStreakWidth = (longestStreak / maxStreakValue) * 100;
  
  // Generate contribution history visualization (simplified)
  const generateContributionGraph = () => {
    let result = '';
    const today = new Date();
    const cellSize = 10;
    const cellGap = 2;
    const cols = 20; // Display 20 days
    
    for (let i = 0; i < cols; i++) {
      // Randomize intensity for demo visual (in real use would be based on actual data)
      const intensity = Math.floor(Math.random() * 5);
      const fillColor = intensity === 0 ? '#161b22' : 
                        intensity === 1 ? '#0e4429' :
                        intensity === 2 ? '#006d32' :
                        intensity === 3 ? '#26a641' : '#39d353';
                        
      result += `<rect x="${300 + i * (cellSize + cellGap)}" y="145" width="${cellSize}" height="${cellSize}" rx="2" fill="${fillColor}" />`;
    }
    return result;
  };

  return `
<svg width="495" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: bold 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58a6ff; }
    .subtitle { font: 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #8b949e; }
    .label { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }
    .value { font: 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }
    .dates { font: 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #8b949e; }
    .bg { fill: #0d1117; }
    .card { stroke: #30363d; fill: #0d1117; stroke-width: 1; rx: 6; }
    .section { fill: #161b22; stroke: #30363d; stroke-width: 1; rx: 4; }
    .bar-bg { fill: #161b22; rx: 4; }
    .bar-fill { fill: #39d353; rx: 4; }
    .current-streak { fill: #2ea043; }
    .longest-streak { fill: #58a6ff; }
    .total { fill: #c9d1d9; }
    .icon { font: 14px 'Segoe UI', Ubuntu, Sans-Serif; }
  </style>
  <rect width="100%" height="100%" class="bg" rx="6" />
  <rect x="5" y="5" width="485" height="190" class="card" />
  
  <text x="25" y="30" class="title">GitHub Contribution Stats</text>
  <text x="25" y="45" class="subtitle">Developer activity metrics and streak visualization</text>
  
  <!-- Current Streak Section -->
  <rect x="25" y="60" width="445" height="35" class="section" />
  <text x="35" y="82" class="label">Current Streak</text>
  <text x="170" y="82" class="value" fill="#2ea043">${currentStreak} days</text>
  <text x="240" y="82" class="dates">${currentStreakDates}</text>
  <!-- Current Streak Bar -->
  <rect x="35" y="90" width="190" height="4" class="bar-bg" />
  <rect x="35" y="90" width="${currentStreakWidth * 1.9}" height="4" class="bar-fill current-streak" />
  
  <!-- Longest Streak Section -->
  <rect x="25" y="105" width="445" height="35" class="section" />
  <text x="35" y="127" class="label">Longest Streak</text>
  <text x="170" y="127" class="value" fill="#58a6ff">${longestStreak} days</text>
  <text x="240" y="127" class="dates">${longestStreakDates}</text>
  <!-- Longest Streak Bar -->
  <rect x="35" y="135" width="190" height="4" class="bar-bg" />
  <rect x="35" y="135" width="${longestStreakWidth * 1.9}" height="4" class="bar-fill longest-streak" />
  
  <!-- Total Contributions Section -->
  <rect x="25" y="150" width="445" height="35" class="section" />
  <text x="35" y="172" class="label">Total Contributions</text>
  <text x="170" y="172" class="value">${totalContributions.toLocaleString()}</text>
  <text x="240" y="172" class="subtitle">Recent activity:</text>
  
  <!-- Simplified contribution graph -->
  ${generateContributionGraph()}
  
  <!-- Icons -->
  <text x="20" y="82" class="icon" fill="#2ea043">🔥</text>
  <text x="20" y="127" class="icon" fill="#58a6ff">🏆</text>
  <text x="20" y="172" class="icon" fill="#c9d1d9">📊</text>
</svg>
  `;
}