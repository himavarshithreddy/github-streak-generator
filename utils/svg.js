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
<svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg {
      fill: url(#bgGradient);
    }
    .card {
      fill: #1a1e26;
      stroke: #00ff88;
      stroke-width: 1.5;
      rx: 8;
      filter: url(#glow);
    }
    .title {
      font: bold 22px 'Fira Code', monospace;
      fill: #00ff88;
      text-anchor: middle;
    }
    .label {
      font: 14px 'Fira Code', monospace;
      fill: #8be9fd;
    }
    .value {
      font: 16px 'Fira Code', monospace;
      fill: #f1f1f1;
    }
    .fire {
      font-size: 18px;
      fill: #ff79c6;
      transition: transform 0.2s;
    }
    .fire:hover {
      transform: scale(1.1);
    }
    .icon {
      font-size: 20px;
    }
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
    .pulse {
      animation: pulse 2s infinite;
    }
  </style>

  <!-- Gradient Background -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0e17;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a2332;stop-opacity:1" />
    </linearGradient>
    <!-- Glow Effect -->
    <filter id="glow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" class="bg" rx="12" ry="12"/>

  <!-- Card -->
  <rect x="15" y="15" width="470" height="170" class="card"/>

  <!-- Title -->
  <text x="250" y="45" class="title">💾 GitHub Streak Dashboard</text>

  <!-- Current Streak -->
  <text x="30" y="90" class="label">🚀 Current Streak:</text>
  <text x="160" y="90" class="value fire"> ${currentStreak} days</text>
  <text x="30" y="110" class="value" font-size="12">${currentStreakDates}</text>

  <!-- Longest Streak -->
  <text x="30" y="140" class="label">🏆 Longest Streak:</text>
  <text x="160" y="140" class="value fire">${longestStreak} days</text>
  <text x="30" y="160" class="value" font-size="12">${longestStreakDates}</text>

  <!-- Total Contributions -->
  <text x="270" y="90" class="label">📊 Total Commits:</text>
  <text x="400" y="90" class="value fire pulse">${totalContributions}</text>

  <!-- Decorative Icon -->
  <text x="450" y="170" class="icon">⚡️</text>
</svg>
  `;
}