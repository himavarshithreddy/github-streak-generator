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
<svg width="400" height="160" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #13111C; rx: 10; }
    .card { fill: #1A1825; rx: 8; }
    .stat-circle { fill: #22202D; }
    .label { font: 500 12px ui-monospace, SFMono-Regular, monospace; fill: #A2A0B3; }
    .value { font: 700 26px ui-monospace, SFMono-Regular, monospace; fill: #E2E1E8; }
    .fire-icon { fill: #FF7043; }
    .trophy-icon { fill: #FFD54F; }
    .contrib-icon { fill: #66BB6A; }
  </style>

  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" />
  <rect x="8" y="8" width="384" height="144" class="card" />

  <!-- Stats circles -->
  <g transform="translate(67, 65)">
    <!-- Contributions -->
    <circle cx="0" cy="0" r="40" class="stat-circle" />
    <path class="contrib-icon" transform="translate(-11, -12) scale(0.022)" d="M128 0c17.7 0 32 14.3 32 32v64h128v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h48c26.5 0 48 21.5 48 48v48h-480v-48c0-26.5 21.5-48 48-48h48v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h128v-64c0-17.7 14.3-32 32-32z" />
    <text x="0" y="18" class="value" text-anchor="middle">${totalContributions}</text>
  </g>

  <g transform="translate(200, 65)">
    <!-- Current streak -->
    <circle cx="0" cy="0" r="40" class="stat-circle" />
    <path class="fire-icon" transform="translate(-10, -15) scale(0.02)" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z" />
    <text x="0" y="18" class="value" text-anchor="middle">${currentStreak}</text>
  </g>

  <g transform="translate(333, 65)">
    <!-- Longest streak -->
    <circle cx="0" cy="0" r="40" class="stat-circle" />
    <path class="trophy-icon" transform="translate(-10, -10) scale(0.02)" d="M256 0c17.7 0 32 14.3 32 32v64h128v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h48c26.5 0 48 21.5 48 48v48h-480v-48c0-26.5 21.5-48 48-48h48v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h128v-64c0-17.7 14.3-32 32-32z" />
    <text x="0" y="18" class="value" text-anchor="middle">${longestStreak}</text>
  </g>

  <!-- Labels -->
  <text x="67" y="120" class="label" text-anchor="middle">Total</text>
  <text x="200" y="120" class="label" text-anchor="middle">Current</text>
  <text x="333" y="120" class="label" text-anchor="middle">Longest</text>
</svg>
  `;
}