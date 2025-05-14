export function renderStreakSVG({ 
  currentStreak, currentStreakStart, currentStreakEnd,
  longestStreak, longestStreakStart, longestStreakEnd,
  totalContributions
}) {
  // Format dates if they exist
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const currentStreakDates = currentStreak > 0 
    ? `${formatDate(currentStreakStart)} - ${formatDate(currentStreakEnd)}`
    : 'No current streak';

  const longestStreakDates = longestStreak > 0
    ? `${formatDate(longestStreakStart)} - ${formatDate(longestStreakEnd)}`
    : 'No streak data';
    
  // Calculate metrics for vertical columns
  const maxHeight = 100; // Max height for columns
  const maxStreakValue = Math.max(currentStreak, longestStreak, 1);
  const currentStreakHeight = (currentStreak / maxStreakValue) * maxHeight;
  const longestStreakHeight = (longestStreak / maxStreakValue) * maxHeight;
  
  // Generate fake contribution grid (in real implementation would be based on actual data)
  const generateContributionGrid = () => {
    const rows = 7; // Days of week
    const cols = 15; // Last 15 weeks
    const cellSize = 8;
    const cellGap = 2;
    let result = '';
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create intensity levels similar to GitHub's contribution graph
        // In a real implementation, this would be based on actual contribution counts
        const intensity = Math.floor(Math.random() * 5); 
        const fillColor = [
          '#161b22', // No contributions
          '#0e4429', // Level 1
          '#006d32', // Level 2 
          '#26a641', // Level 3
          '#39d353'  // Level 4
        ][intensity];
        
        result += `<rect 
          x="${25 + col * (cellSize + cellGap)}" 
          y="${65 + row * (cellSize + cellGap)}" 
          width="${cellSize}" 
          height="${cellSize}" 
          rx="1.5" 
          fill="${fillColor}" 
        />`;
      }
    }
    return result;
  };

  return `
<svg width="495" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495 200">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&amp;display=swap');
    * { font-family: 'JetBrains Mono', monospace; }
    .bg { fill: #0d1117; }
    .card { fill: #161b22; stroke: #30363d; stroke-width: 1; }
    .section { fill: #0d1117; stroke: #30363d; stroke-width: 1; }
    .title { font-size: 16px; font-weight: 700; fill: #e6edf3; }
    .subtitle { font-size: 12px; fill: #8b949e; }
    .label { font-size: 12px; font-weight: 600; fill: #c9d1d9; }
    .stat { font-size: 20px; font-weight: 700; text-anchor: middle; }
    .stat-label { font-size: 11px; fill: #8b949e; text-anchor: middle; }
    .dates { font-size: 9px; fill: #8b949e; text-anchor: middle; }
    .column-current { fill: #238636; }
    .column-longest { fill: #1f6feb; }
    .column-total { fill: #6e7681; }
    .grid-label { font-size: 9px; fill: #8b949e; }
    .divider { stroke: #30363d; stroke-width: 1; stroke-dasharray: 4 2; }
  </style>

  <!-- Background -->
  <rect width="100%" height="100%" rx="6" class="bg" />
  <rect x="5" y="5" width="485" height="190" rx="6" class="card" />
  
  <!-- Header -->
  <text x="25" y="28" class="title">GitHub Contribution Stats</text>
  <line x1="25" y1="40" x2="470" y2="40" class="divider" />
  
  <!-- Left Section: Contribution Grid -->
  <rect x="20" y="50" width="165" height="140" rx="4" class="section" />
  <text x="25" y="60" class="label">Contribution Activity</text>
  ${generateContributionGrid()}
  <text x="25" y="175" class="grid-label">Total: ${totalContributions.toLocaleString()} contributions</text>
  
  <!-- Vertical divider -->
  <line x1="195" y1="50" x2="195" y2="190" class="divider" />
  
  <!-- Right Section: Stats with Vertical Columns -->
  <rect x="205" y="50" width="270" height="140" rx="4" class="section" />
  
  <!-- Current Streak Column -->
  <rect x="250" y="${145 - currentStreakHeight}" width="40" height="${currentStreakHeight}" rx="3" class="column-current" />
  <text x="270" y="160" class="stat-label">CURRENT</text>
  <text x="270" y="172" class="stat-label">STREAK</text>
  <text x="270" y="${135 - currentStreakHeight}" class="stat" fill="#238636">${currentStreak}</text>
  <text x="270" y="185" class="dates" style="font-size: 8px;">${currentStreakDates}</text>
  
  <!-- Longest Streak Column -->
  <rect x="320" y="${145 - longestStreakHeight}" width="40" height="${longestStreakHeight}" rx="3" class="column-longest" />
  <text x="340" y="160" class="stat-label">LONGEST</text>
  <text x="340" y="172" class="stat-label">STREAK</text>
  <text x="340" y="${135 - longestStreakHeight}" class="stat" fill="#1f6feb">${longestStreak}</text>
  <text x="340" y="185" class="dates" style="font-size: 8px;">${longestStreakDates}</text>
  
  <!-- Total Column (static height but visually balanced) -->
  <rect x="390" y="75" width="40" height="70" rx="3" class="column-total" />
  <text x="410" y="160" class="stat-label">TOTAL</text>
  <text x="410" y="172" class="stat-label">COMMITS</text>
  <text x="410" y="65" class="stat" fill="#6e7681">${totalContributions.toLocaleString()}</text>
</svg>
  `;
}