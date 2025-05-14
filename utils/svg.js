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
<svg width="450" height="160" viewBox="0 0 450 160" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #1A1A1A; }
    .card { stroke: #3A3A3A; fill: #222222; stroke-width: 1; rx: 8; }
    .label { font: bold 12px 'Inter', 'Arial', sans-serif; fill: #60A5FA; }
    .value { font: bold 24px 'Inter', 'Arial', sans-serif; fill: #E5E5E5; }
    .dates { font: 10px 'Inter', 'Arial', sans-serif; fill: #F28A72; }
    .icon { fill: #F4D03F; }
    .divider { stroke: url(#grad); stroke-width: 1; }
    .footer { font: 9px 'Inter', 'Arial', sans-serif; fill: #888888; }
  </style>

  <!-- Gradient for dividers -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3A3A3A;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#3A3A3A;stop-opacity:0.3" />
    </linearGradient>
  </defs>

  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" rx="10"/>
  <rect x="10" y="10" width="430" height="140" class="card"/>

  <!-- Vertical dividers -->
  <line x1="150" y1="20" x2="150" y2="140" class="divider"/>
  <line x1="300" y1="20" x2="300" y2="140" class="divider"/>

  <!-- Column 1: Current Streak - Flame icon -->
  <path class="icon" transform="translate(55, 30) scale(0.045)" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"/>
  <text x="75" y="80" class="label" text-anchor="middle">Current Streak</text>
  <text x="75" y="105" class="value" text-anchor="middle">${currentStreak}</text>
  <text x="75" y="125" class="dates" text-anchor="middle">${currentStreakDates}</text>

  <!-- Column 2: Longest Streak - Trophy icon -->
  <path class="icon" transform="translate(205, 30) scale(0.045)" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"/>
  <text x="225" y="80" class="label" text-anchor="middle">Longest Streak</text>
  <text x="225" y="105" class="value" text-anchor="middle">${longestStreak}</text>
  <text x="225" y="125" class="dates" text-anchor="middle">${longestStreakDates}</text>

  <!-- Column 3: Total Contributions - Code commit icon -->
  <path class="icon" transform="translate(355, 30) scale(0.045)" d="M128 0c35.35 0 64 28.65 64 64s-28.65 64-64 64-64-28.65-64-64S92.65 0 128 0zm89.72 83.88c1.85 19.68 15.52 36.83 34.89 44.11C213.31 234.7 124.68 300.4 24 296.11V288c0-36.18 25.5-66.56 59.45-73.96 28.28-6.17 47.255-32.82 45.178-61.39C57.25 146.8 0 199.76 0 256v48c0 10.6 2.86 20.72 7.97 29.82 1.18 2.11 2.5 4.14 3.92 6.07C28.32 359.8 48.36 384 74.5 384c-12.6-31.89 2.48-67.75 32.5-79.28C127.23 290.41 149.59 288 172.42 288c22.82 0 45.17 2.47 65.39 16.72 30.02 11.53 45.1 47.39 32.5 79.28 26.14 0 46.19-24.2 62.62-44.11 1.42-1.93 2.74-3.96 3.92-6.07 5.11-9.12 7.97-19.24 7.97-29.82v-25.73c56.22-35.17 91.2-100.35 81.47-173.15-2.24-16.81-5.24-32.72-9.98-48.49-58.09 2.72-112.44-36.82-120.97-97.75-53.21 36.42-91.32 11.85-91.32 11.85-7.93 18.25-11.72 38.43-11.69 59.13zM368 256c17.67 0 32 14.33 32 32s-14.33 32-32 32-32-14.33-32-32 14.33-32 32-32zM224 448c0-17.67 14.33-32 32-32s32 14.33 32 32-14.33 32-32 32-32-14.33-32-32zm-96 0c0-17.67 14.33-32 32-32s32 14.33 32 32-14.33 32-32 32-32-14.33-32-32z"/>
  <text x="375" y="80" class="label" text-anchor="middle">Total</text>
  <text x="375" y="105" class="value" text-anchor="middle">${totalContributions}</text>
  <text x="375" y="125" class="dates" text-anchor="middle">Contributions</text>

  <!-- Footer -->
  <text x="225" y="145" class="footer" text-anchor="middle">GitHub Contribution Stats</text>
</svg>
  `;
}