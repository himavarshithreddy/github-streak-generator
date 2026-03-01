export function renderStreakSVG({
  currentStreak, currentStreakStart, currentStreakEnd,
  longestStreak, longestStreakStart, longestStreakEnd,
  totalContributions, contributionsStartDate
}) {
  // Format dates if they exist
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // For total contributions, use contributionsStartDate if provided
  const totalContributionsEndDate = currentStreakEnd || new Date();
  const totalContributionsDates = contributionsStartDate
    ? `${formatDate(contributionsStartDate)} - ${formatDate(totalContributionsEndDate)}`
    : 'All time';

  const currentStreakDates = currentStreak > 0
    ? `${formatDate(currentStreakStart)} - ${formatDate(currentStreakEnd)}`
    : 'No current streak';

  const longestStreakDates = longestStreak > 0
    ? `${formatDate(longestStreakStart)} - ${formatDate(longestStreakEnd)}`
    : 'No streak data';

  return `
<svg width="625" height="250" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1117;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#161B22;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#56D364" />
      <stop offset="100%" style="stop-color:#3FB950" />
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F0883E" />
      <stop offset="100%" style="stop-color:#DB6D28" />
    </linearGradient>
    <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E3B341" />
      <stop offset="100%" style="stop-color:#D29922" />
    </linearGradient>
  </defs>
  <style>
    .bg { fill: url(#bgGrad); }
    .stat-ring { fill: none; stroke-width: 2.5; opacity: 0.15; }
    .stat-ring-active { fill: none; stroke-width: 2.5; stroke-dasharray: 120 200; stroke-linecap: round; }
    .stat-circle { fill: #21262D; }
    .title { font: 600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; fill: #E6EDF3; }
    .label { font: 600 9.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; fill: #C9D1D9; }
    .sublabel { font: 400 7px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; fill: #6E7681; }
    .value { font: 700 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; }
    .unit { font: 500 7.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; fill: #8B949E; }
    .separator { stroke: #30363D; stroke-width: 1; }
    .total-val { fill: #56D364; }
    .current-val { fill: #F0883E; }
    .longest-val { fill: #E3B341; }
    .total-ring { stroke: url(#greenGrad); }
    .current-ring { stroke: url(#orangeGrad); }
    .longest-ring { stroke: url(#yellowGrad); }
    .border { fill: none; stroke: #30363D; stroke-width: 1; }
  </style>

  <!-- Background -->
  <rect width="500" height="200" rx="12" class="bg" />
  <rect width="500" height="200" rx="12" class="border" />

  <!-- Title bar with GitHub icon -->
  <g transform="translate(20, 28)">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B949E">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    <text x="22" y="13" class="title">GitHub Streak Stats</text>
  </g>

  <!-- Divider line under title -->
  <line x1="20" y1="46" x2="480" y2="46" class="separator" />

  <!-- Total contributions -->
  <g transform="translate(83, 112)">
    <circle cx="0" cy="0" r="36" class="stat-circle" />
    <circle cx="0" cy="0" r="40" class="stat-ring total-ring" />
    <circle cx="0" cy="0" r="40" class="stat-ring-active total-ring" transform="rotate(-90)" />
    <text x="0" y="-2" class="value total-val" text-anchor="middle" filter="url(#glow)">${totalContributions}</text>
    <text x="0" y="14" class="unit" text-anchor="middle">contributions</text>
  </g>

  <!-- Separator -->
  <line x1="167" y1="60" x2="167" y2="180" class="separator" />

  <!-- Current streak -->
  <g transform="translate(250, 112)">
    <circle cx="0" cy="0" r="36" class="stat-circle" />
    <circle cx="0" cy="0" r="40" class="stat-ring current-ring" />
    <circle cx="0" cy="0" r="40" class="stat-ring-active current-ring" transform="rotate(-90)" />
    <text x="0" y="-2" class="value current-val" text-anchor="middle" filter="url(#glow)">${currentStreak}</text>
    <text x="0" y="14" class="unit" text-anchor="middle">days</text>
  </g>

  <!-- Separator -->
  <line x1="333" y1="60" x2="333" y2="180" class="separator" />

  <!-- Longest streak -->
  <g transform="translate(417, 112)">
    <circle cx="0" cy="0" r="36" class="stat-circle" />
    <circle cx="0" cy="0" r="40" class="stat-ring longest-ring" />
    <circle cx="0" cy="0" r="40" class="stat-ring-active longest-ring" transform="rotate(-90)" />
    <text x="0" y="-2" class="value longest-val" text-anchor="middle" filter="url(#glow)">${longestStreak}</text>
    <text x="0" y="14" class="unit" text-anchor="middle">days</text>
  </g>

  <!-- Labels -->
  <text x="83" y="165" class="label" text-anchor="middle">Total Contributions</text>
  <text x="83" y="178" class="sublabel" text-anchor="middle">${totalContributionsDates}</text>
  <text x="250" y="165" class="label" text-anchor="middle">Current Streak</text>
  <text x="250" y="178" class="sublabel" text-anchor="middle">${currentStreakDates}</text>
  <text x="417" y="165" class="label" text-anchor="middle">Longest Streak</text>
  <text x="417" y="178" class="sublabel" text-anchor="middle">${longestStreakDates}</text>
</svg>
  `;
}