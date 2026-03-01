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
    ? `${formatDate(contributionsStartDate)} – ${formatDate(totalContributionsEndDate)}`
    : 'All time';

  const currentStreakDates = currentStreak > 0
    ? `${formatDate(currentStreakStart)} – ${formatDate(currentStreakEnd)}`
    : 'No current streak';

  const longestStreakDates = longestStreak > 0
    ? `${formatDate(longestStreakStart)} – ${formatDate(longestStreakEnd)}`
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
    .stat-ring-active { fill: none; stroke-width: 2.5; stroke-dasharray: 120 200; stroke-linecap: round; } /* 120px visible arc out of ~251px circumference for decorative partial ring */
    .stat-circle { fill: #21262D; }
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

  <!-- Total contributions -->
  <g transform="translate(83, 87)">
    <circle cx="0" cy="0" r="36" class="stat-circle" />
    <circle cx="0" cy="0" r="40" class="stat-ring total-ring" />
    <circle cx="0" cy="0" r="40" class="stat-ring-active total-ring" transform="rotate(-90)" /> <!-- Rotate to start arc from top -->
    <text x="0" y="-2" class="value total-val" text-anchor="middle" filter="url(#glow)">${totalContributions}</text>
    <text x="0" y="14" class="unit" text-anchor="middle">contributions</text>
  </g>

  <!-- Separator -->
  <line x1="167" y1="35" x2="167" y2="155" class="separator" />

  <!-- Current streak -->
  <g transform="translate(250, 87)">
    <circle cx="0" cy="0" r="36" class="stat-circle" />
    <circle cx="0" cy="0" r="40" class="stat-ring current-ring" />
    <circle cx="0" cy="0" r="40" class="stat-ring-active current-ring" transform="rotate(-90)" /> <!-- Rotate to start arc from top -->
    <text x="0" y="-2" class="value current-val" text-anchor="middle" filter="url(#glow)">${currentStreak}</text>
    <text x="0" y="14" class="unit" text-anchor="middle">days</text>
  </g>

  <!-- Separator -->
  <line x1="333" y1="35" x2="333" y2="155" class="separator" />

  <!-- Longest streak -->
  <g transform="translate(417, 87)">
    <circle cx="0" cy="0" r="36" class="stat-circle" />
    <circle cx="0" cy="0" r="40" class="stat-ring longest-ring" />
    <circle cx="0" cy="0" r="40" class="stat-ring-active longest-ring" transform="rotate(-90)" /> <!-- Rotate to start arc from top -->
    <text x="0" y="-2" class="value longest-val" text-anchor="middle" filter="url(#glow)">${longestStreak}</text>
    <text x="0" y="14" class="unit" text-anchor="middle">days</text>
  </g>

  <!-- Labels -->
  <text x="83" y="140" class="label" text-anchor="middle">Total Contributions</text>
  <text x="83" y="153" class="sublabel" text-anchor="middle">${totalContributionsDates}</text>
  <text x="250" y="140" class="label" text-anchor="middle">Current Streak</text>
  <text x="250" y="153" class="sublabel" text-anchor="middle">${currentStreakDates}</text>
  <text x="417" y="140" class="label" text-anchor="middle">Longest Streak</text>
  <text x="417" y="153" class="sublabel" text-anchor="middle">${longestStreakDates}</text>
</svg>
  `;
}