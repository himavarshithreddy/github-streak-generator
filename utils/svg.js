export function renderStreakSVG({
  currentStreak, currentStreakStart, currentStreakEnd,
  longestStreak, longestStreakStart, longestStreakEnd,
  totalContributions
}) {
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
<svg width="450" height="160" viewBox="0 0 450 160" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #1A1A1A; }
    .card { stroke: #3A3A3A; fill: #222222; stroke-width: 1; rx: 8; }
    .label { font: bold 12px 'Inter', 'Arial', sans-serif; fill: #60A5FA; }
    .value { font: bold 24px 'Inter', 'Arial', sans-serif; fill: #E5E5E5; }
    .dates { font: 9px 'Inter', 'Arial', sans-serif; fill: #F28A72; }
    .icon { fill: #F4D03F; }
    .divider { stroke: url(#grad); stroke-width: 1; }
    .footer { font: 9px 'Inter', 'Arial', sans-serif; fill: #888888; }
  </style>

  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3A3A3A;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#3A3A3A;stop-opacity:0.3" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" class="bg" rx="10"/>
  <rect x="10" y="10" width="430" height="140" class="card"/>

  <!-- Dividers -->
  <line x1="150" y1="20" x2="150" y2="140" class="divider"/>
  <line x1="300" y1="20" x2="300" y2="140" class="divider"/>

  <!-- Left: Total Contributions -->
  <text x="75" y="60" class="label" text-anchor="middle">Total</text>
  <text x="75" y="90" class="value" text-anchor="middle">${totalContributions}</text>
  <text x="75" y="115" class="dates" text-anchor="middle">Contributions</text>

  <!-- Center: Current Streak -->
  <path class="icon" transform="translate(215, 20) scale(0.04)" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"/>
  <text x="225" y="75" class="label" text-anchor="middle">Current Streak</text>
  <text x="225" y="100" class="value" text-anchor="middle">${currentStreak}</text>
  <text x="225" y="122" class="dates" text-anchor="middle" textLength="140" lengthAdjust="spacingAndGlyphs">${currentStreakDates}</text>

  <!-- Right: Longest Streak -->
  <text x="370" y="60" class="label" text-anchor="middle">Longest Streak</text>
  <text x="370" y="90" class="value" text-anchor="middle">${longestStreak}</text>
  <text x="370" y="115" class="dates" text-anchor="middle" textLength="120" lengthAdjust="spacingAndGlyphs">${longestStreakDates}</text>

  <!-- Footer -->
  <text x="225" y="145" class="footer" text-anchor="middle">GitHub Contribution Stats</text>
</svg>
  `;
}
