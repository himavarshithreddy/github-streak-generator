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

  // For total contributions, use the earliest date we have to current date
  const earliestDate = [currentStreakStart, longestStreakStart].filter(Boolean).sort()[0];
  const totalContributionsDates = earliestDate 
    ? `${formatDate(earliestDate)} → ${formatDate(currentStreakEnd || new Date())}`
    : 'All time';

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
    .label { font: 500 9px ui-monospace, SFMono-Regular, monospace; fill: #A2A0B3; }
    .sublabel { font: 400 8px ui-monospace, SFMono-Regular, monospace; fill: #6E6C7E; }
    .value { font: 700 22px ui-monospace, SFMono-Regular, monospace; fill: #E2E1E8; }
    .unit { font: 400 9px ui-monospace, SFMono-Regular, monospace; fill: #6E6C7E; }
    .total { fill: #66BB6A; }
    .current { fill: #FF7043; }
    .longest { fill: #FFD54F; }
  </style>

  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" />
  <rect x="8" y="8" width="384" height="144" class="card" />

  <!-- Stats circles -->
  <g transform="translate(67, 65)">
    <!-- Total contributions -->
    <circle cx="0" cy="0" r="40" class="stat-circle" />
    <text x="0" y="5" class="value total" text-anchor="middle">${totalContributions}</text>
    <text x="0" y="22" class="unit" text-anchor="middle">contributions</text>
  </g>

  <g transform="translate(200, 65)">
    <!-- Current streak -->
    <circle cx="0" cy="0" r="40" class="stat-circle" />
    <text x="0" y="5" class="value current" text-anchor="middle">${currentStreak}</text>
    <text x="0" y="22" class="unit" text-anchor="middle">days</text>
  </g>

  <g transform="translate(333, 65)">
    <!-- Longest streak -->
    <circle cx="0" cy="0" r="40" class="stat-circle" />
    <text x="0" y="5" class="value longest" text-anchor="middle">${longestStreak}</text>
    <text x="0" y="22" class="unit" text-anchor="middle">days</text>
  </g>

  <!-- Labels -->
  <text x="67" y="118" class="label" text-anchor="middle">Total Contributions</text>
  <text x="67" y="132" class="sublabel" text-anchor="middle" textLength="110" lengthAdjust="spacingAndGlyphs">${totalContributionsDates}</text>
  <text x="200" y="118" class="label" text-anchor="middle">Current Streak</text>
  <text x="200" y="132" class="sublabel" text-anchor="middle" textLength="110" lengthAdjust="spacingAndGlyphs">${currentStreakDates}</text>
  <text x="333" y="118" class="label" text-anchor="middle">Longest Streak</text>
  <text x="325" y="132" class="sublabel" text-anchor="middle" textLength="100" lengthAdjust="spacingAndGlyphs">${longestStreakDates}</text>
</svg>
  `;
}