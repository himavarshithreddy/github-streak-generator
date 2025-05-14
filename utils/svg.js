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
    .title { font: bold 20px 'Consolas', 'Courier New', monospace; fill: #569CD6; }
    .label { font: bold 14px 'Consolas', 'Courier New', monospace; fill: #9CDCFE; }
    .value { font: bold 22px 'Consolas', 'Courier New', monospace; fill: #D4D4D4; }
    .dates { font: 12px 'Consolas', 'Courier New', monospace; fill: #CE9178; }
    .icon { fill: #DCDCAA; }
    .divider { stroke: #3E3E42; stroke-width: 1; stroke-dasharray: 4,2; }
  </style>
  
  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" rx="10" ry="10"/>
  <rect x="10" y="10" width="475" height="175" class="card"/>
  
  <!-- Title with GitHub icon -->
  <path class="icon" transform="translate(25, 22) scale(0.7)" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  <text x="50" y="35" class="title">GitHub Contribution Stats</text>
  
  <!-- Vertical dividers -->
  <line x1="165" y1="50" x2="165" y2="170" class="divider" />
  <line x1="330" y1="50" x2="330" y2="170" class="divider" />
  
  <!-- Column 1: Current Streak -->
  <path class="icon" transform="translate(85, 70) scale(0.04)" d="M256,0C116.5,0,0,116.5,0,256s116.5,256,256,256s256-116.5,256-256S395.5,0,256,0z M381.9,293.3 c-2.6,59.8-33.8,100.9-48,112.7c-9.9,8.3-19.3,9.3-27.8,6.3c-17.8-6.1-20.6-21.1-26.8-41.4c-4.7-14.6-9.8-24.1-24.7-35.8 c-17.4-12.3-20.4-29.3-19.4-43.7c1.1-14.5,7-26.8,17.5-35.9c8.2-7.2,14.9-16.8,19.8-28.9c2.3-5.6,4.7-10.5,8.5-14.5 c2.9-3,8.4-4.8,17-4.8c8.7,0,16.3,2,23.2,6.1c7.1,4.2,13.1,9.5,17.8,16.1c6.4,9.1,12.2,16.5,19.3,22.6 c19.3,16.4,26.1,33.8,21.6,59.9" />
  <text x="82" y="110" class="label" text-anchor="middle">Current</text>
  <text x="82" y="130" class="value" text-anchor="middle">${currentStreak}</text>
  <text x="82" y="150" class="dates" text-anchor="middle">days</text>
  
  <!-- Column 2: Longest Streak -->
  <path class="icon" transform="translate(247, 70) scale(0.04)" d="M392,105c0-20-16-37-36-37H36C16,68,0,85,0,105v37c0,20,16,30,36,30h27c15,120,135,206,152,206h12c17,0,137-86,152-206h27 c20,0,36-10,36-30V105z M45,158c-5,0-9-4-9-9v-40c0-5,4-9,9-9h302c5,0,9,4,9,9v40c0,5-4,9-9,9h-27c-2-20-7-40-16-59 c-2-5-8-7-13-5c-5,2-7,8-5,13c9,18,13,37,15,51h-30c-15-53-54-94-57-97c-1-1-2-1-2-2c-0,0,0,0,0,0c0,0,0,0,0,0c0,0-1,1-2,2 c-3,3-42,44-57,97h-30c2-14,6-33,15-51c2-5,0-11-5-13c-5-2-11,0-13,5c-8,18-13,39-16,59H45z" />
  <text x="247" y="110" class="label" text-anchor="middle">Longest</text>
  <text x="247" y="130" class="value" text-anchor="middle">${longestStreak}</text>
  <text x="247" y="150" class="dates" text-anchor="middle">days</text>
  
  <!-- Column 3: Total Contributions -->
  <path class="icon" transform="translate(412, 70) scale(0.04)" d="M416,160c0,35.3-28.7,64-64,64c-24.6,0-46.1-13.9-56.9-34.3c-2.2,1.5-4.9,2.3-7.1,2.3h-96c-26.5,0-48-21.5-48-48V79.9 c-17.4-10.9-29-30.3-29-52.4C115,12.4,127.4,0,143.4,0s28.4,12.4,28.4,27.5c0,15.1-12.4,27.5-28.4,27.5c-2,0-4-0.6-5.9-0.8v81.3 c0,17.7,14.3,32,32,32h96c5.9,0,11.2-1.6,15.9-4.3c-0.6-5.1-0.9-10.5-0.9-15.7c0-35.3,28.7-64,64-64S416,124.7,416,160z M176,144 c0-8.8-7.2-16-16-16s-16,7.2-16,16s7.2,16,16,16S176,152.8,176,144z" />
  <text x="412" y="110" class="label" text-anchor="middle">Total</text>
  <text x="412" y="130" class="value" text-anchor="middle">${totalContributions}</text>
  <text x="412" y="150" class="dates" text-anchor="middle">contributions</text>
</svg>
  `;
}
