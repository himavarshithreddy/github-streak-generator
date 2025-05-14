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
<svg width="495" height="195" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #1E1E1E; }
    .card { stroke: #3E3E42; fill: #252526; stroke-width: 1; rx: 6; }
    .label { font: bold 14px 'Consolas', 'Courier New', monospace; fill: #9CDCFE; }
    .value { font: bold 26px 'Consolas', 'Courier New', monospace; fill: #D4D4D4; }
    .dates { font: 12px 'Consolas', 'Courier New', monospace; fill: #CE9178; }
    .icon { fill: #DCDCAA; }
    .divider { stroke: #3E3E42; stroke-width: 1; stroke-dasharray: 4,2; }
  </style>
  
  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
  <rect x="10" y="10" width="475" height="175" class="card"/>
  
  <!-- Vertical dividers -->
  <line x1="165" y1="30" x2="165" y2="170" class="divider" />
  <line x1="330" y1="30" x2="330" y2="170" class="divider" />
  
  <!-- Column 1: Current Streak - Calendar with fire icon -->
  <path class="icon" transform="translate(82, 55) scale(0.9)" d="M6.75 0a.75.75 0 0 1 .75.75V3h3.75a.75.75 0 0 1 0 1.5H7.5v2.25a.75.75 0 0 1-1.5 0V4.5H3.75a.75.75 0 0 1 0-1.5H6V.75A.75.75 0 0 1 6.75 0Z" />
  <text x="82" y="100" class="label" text-anchor="middle">Current</text>
  <text x="82" y="130" class="value" text-anchor="middle">${currentStreak}</text>
  <text x="82" y="155" class="dates" text-anchor="middle">days</text>
  
  <!-- Column 2: Longest Streak - Trophy icon -->
  <path class="icon" transform="translate(247, 55) scale(0.045)" d="M408 144c0-40.3-16.9-76.7-44-102.1-27.1-25.4-64.6-41.9-106-41.9H244c-41.4 0-78.9 16.5-106 41.9C110.9 67.3 94 103.7 94 144c0 43.7 19.8 82.3 51 107.7-11.9 11.5-21.3 25.3-27.5 40.7-6.6 16.4-9.5 34.3-9.5 52.7V480c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V345c0-18.3-2.9-36.3-9.5-52.7-6.2-15.4-15.5-29.2-27.5-40.7 31.1-25.4 51-64 51-107.7zm-97 107.6c2.6 1.7 4.9 3.7 7 5.8 11.7 11.7 20.4 26.7 25.6 43.6 5 16.4 7.4 34 7.4 51.8V464H149v-111.2c0-17.8 2.4-35.4 7.4-51.8 5.2-16.9 13.9-31.9 25.6-43.6 2.1-2.1 4.4-4 7-5.8 17-11.2 37.1-17.6 58.3-17.6h5.5c21.2 0 41.2 6.4 58.3 17.6h0zm9-86.9c-17-20.7-41.8-31.7-68.9-31.7h-5.5c-27.2 0-51.9 11-68.9 31.7C162.4 182.3 152 203.9 152 228v8H360v-8c0-24.1-10.4-45.7-24.7-63.3z" />
  <text x="247" y="100" class="label" text-anchor="middle">Longest</text>
  <text x="247" y="130" class="value" text-anchor="middle">${longestStreak}</text>
  <text x="247" y="155" class="dates" text-anchor="middle">days</text>
  
  <!-- Column 3: Total Contributions - Code/commit icon -->
  <path class="icon" transform="translate(412, 55) scale(0.045)" d="M400 44.8c3.2-9 0-32-4-32s-15 5-18 10l-5-10c-9 0-19 5-21 14l-38.2 115.8C293.7 131.5 268.7 128 256 128s-37.7 3.5-57.8 14.6L160 26.6c-2-9-12-14-21-14l-5 10c-3-5-14-10-18-10s-7.2 23-4 32l48 160H144c-11 0-24 3-32 13L48 60.4C46 53.3 33 48 24 48c-7.6 0-16 1-22 6.8V142.5c0 8.8 1.5 10.5 8.7 18.8 1.3 1.5 3.2 3.5 5.5 6C22.7 173.9 32 192 32 228v123c0 35 6 66 22 71l.1.2c.3.9 1 2.2 2.1 3.8 2.6 3.7 6.9 8.1 13.9 9.7 0 .2-.1.5-.1.8V488c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V436.5c23.7 3.2 48.2 3.5 72 3.5s48.3-.3 72-3.5V488c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V436.5c0-.3 0-.6-.1-.8 7-1.6 11.3-6 13.9-9.7 1.1-1.6 1.8-2.9 2.1-3.8l.1-.2c16-5 22-36 22-71V228c0-36 9.3-54.1 15.8-60.8 2.3-2.4 4.2-4.4 5.5-6 7.2-8.3 8.7-10 8.7-18.8V54.8c-6-5.8-14.4-6.8-22-6.8-9 0-22 5.3-24 12.4l-64 147.2c-8-10-21-13-32-13H352l48-160zm-48 256c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16v16z" />
  <text x="412" y="100" class="label" text-anchor="middle">Total</text>
  <text x="412" y="130" class="value" text-anchor="middle">${totalContributions}</text>
  <text x="412" y="155" class="dates" text-anchor="middle">contributions</text>
</svg>
  `;
}
