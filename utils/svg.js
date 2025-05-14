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

  <line x1="145" y1="20" x2="145" y2="140" class="divider"/>
  <line x1="295" y1="20" x2="295" y2="140" class="divider"/>

  <!-- Column 1: Current Streak -->
  <path class="icon" transform="translate(55, 30) scale(0.04)" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"/>
  <text x="72.5" y="80" class="label" text-anchor="middle">Current Streak</text>
  <text x="72.5" y="105" class="value" text-anchor="middle">${currentStreak}</text>
  <text x="77.5" y="128" class="dates" text-anchor="middle" textLength="120" lengthAdjust="spacingAndGlyphs">${currentStreakDates}</text>

  <!-- Column 2: Longest Streak -->
  <path class="icon" transform="translate(205, 30) scale(0.04)" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"/>
  <text x="220" y="80" class="label" text-anchor="middle">Longest Streak</text>
  <text x="220" y="105" class="value" text-anchor="middle">${longestStreak}</text>
  <text x="220" y="128" class="dates" text-anchor="middle" textLength="120" lengthAdjust="spacingAndGlyphs">${longestStreakDates}</text>

  <!-- Column 3: Total Contributions -->
  <path class="icon" transform="translate(355, 30) scale(0.04)" d="M448 64H384V32c0-17.67-14.33-32-32-32H160c-17.67 0-32 14.33-32 32v32H64C28.65 64 0 92.65 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V128c0-35.35-28.65-64-64-64zM160 32h192v32H160V32zm32 304l-56-56 22.63-22.63L192 281.38l101.38-101.38L316 202l-124 134z"/>
  <text x="370" y="80" class="label" text-anchor="middle">Total</text>
  <text x="370" y="105" class="value" text-anchor="middle">${totalContributions}</text>
  <text x="370" y="128" class="dates" text-anchor="middle">Contributions</text>

  <!-- Footer -->
  <text x="225" y="145" class="footer" text-anchor="middle">GitHub Contribution Stats</text>
</svg>
  `;
}
