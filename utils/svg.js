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
<svg width="480" height="180" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
    
    .bg { fill: #0D1117; rx: 12; }
    .card { fill: #161B22; rx: 8; filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25)); }
    .title { font: 700 14px 'Inter', sans-serif; fill: #E6EDF3; letter-spacing: 0.3px; }
    .subtitle { font: 400 12px 'Inter', sans-serif; fill: #8B949E; }
    .label { font: 500 12px 'Inter', sans-serif; fill: #8B949E; }
    .value { font: 700 28px 'Inter', sans-serif; fill: #E6EDF3; }
    .value-total { font: 700 32px 'Inter', sans-serif; fill: #E6EDF3; }
    .dates { font: 400 10px 'Inter', sans-serif; fill: #8B949E; }
    .highlight { fill: #1F6FEB; }
    .highlight-text { fill: #58A6FF; }
    .flame { fill: url(#flameGradient); }
    .trophy { fill: url(#trophyGradient); }
    .stats { fill: url(#statsGradient); }
    .card-border { fill: none; stroke: #30363D; stroke-width: 1; rx: 8; }
    .divider { stroke: #30363D; stroke-width: 1; }
    .footer { font: 400 10px 'Inter', sans-serif; fill: #8B949E; }
  </style>

  <!-- Gradients -->
  <defs>
    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FA8C16" />
      <stop offset="100%" stop-color="#F5222D" />
    </linearGradient>
    <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FADB14" />
      <stop offset="100%" stop-color="#FA8C16" />
    </linearGradient>
    <linearGradient id="statsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#52C41A" />
      <stop offset="100%" stop-color="#13C2C2" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="480" height="180" class="bg"/>
  
  <!-- Header -->
  <text x="24" y="32" class="title">GitHub Contribution Statistics</text>
  
  <!-- Main cards container -->
  <g transform="translate(24, 50)">
    <!-- Total Contributions Card -->
    <rect x="0" y="0" width="126" height="100" class="card"/>
    <rect x="0" y="0" width="126" height="100" class="card-border"/>
    <path class="stats" transform="translate(63, 22) scale(0.025)" d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z M600 395.8h-46.9c-10.2 0-19.9 4.9-25.9 13.2L454 512l-71.9-98.8c-6-8.3-15.6-13.2-25.9-13.2H310c-6.5 0-10.3 7.4-6.5 12.7l114.1 153.2-114.1 153.2c-3.9 5.3 0 12.7 6.5 12.7h44.3c10.3 0 19.9-4.9 25.9-13.2l73.8-101.3 73.8 101.3c6 8.3 15.7 13.2 25.9 13.2H600c6.5 0 10.3-7.4 6.5-12.7L492.3 566.2l114.1-153.2c3.9-5.2 0.1-12.7-6.4-12.7z"/>
    <text x="63" y="54" class="label" text-anchor="middle">Total Contributions</text>
    <text x="63" y="82" class="value-total" text-anchor="middle">${totalContributions}</text>
    
    <!-- Current Streak Card -->
    <rect x="138" y="0" width="146" height="100" class="card"/>
    <rect x="138" y="0" width="146" height="100" class="card-border"/>
    <path class="flame" transform="translate(211, 22) scale(0.025)" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"/>
    <text x="211" y="54" class="label" text-anchor="middle">Current Streak</text>
    <text x="211" y="82" class="value" text-anchor="middle">${currentStreak}</text>
    <text x="211" y="96" class="dates" text-anchor="middle">${currentStreakDates}</text>
    
    <!-- Longest Streak Card -->
    <rect x="296" y="0" width="146" height="100" class="card"/>
    <rect x="296" y="0" width="146" height="100" class="card-border"/>
    <path class="trophy" transform="translate(369, 22) scale(0.025)" d="M868 160h-92v-40c0-4.4-3.6-8-8-8H256c-4.4 0-8 3.6-8 8v40h-92c-4.4 0-8 3.6-8 8v112c0 101.6 29.6 180.5 89.4 222.7C284.1 534.6 351.5 547 350 547h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8h-40c-1.5 0 65.9-12.4 112.6-44.3C756.4 460.5 786 381.6 786 272V168c0-4.4-3.6-8-8-8zM305.7 510.9c-50.3-31.5-75.7-97.1-75.7-190.9V212h66v108c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8V212h177.6v108c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8V212h66v108c0 93.8-25.4 158.9-75.7 190.9C544.5 528.6 497.1 532 480 532s-64.5-3.4-174.3-21.1zM786 872H238c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h548c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z"/>
    <text x="369" y="54" class="label" text-anchor="middle">Longest Streak</text>
    <text x="369" y="82" class="value" text-anchor="middle">${longestStreak}</text>
    <text x="369" y="96" class="dates" text-anchor="middle">${longestStreakDates}</text>
  </g>
  
  <!-- Footer -->
  <text x="24" y="165" class="footer">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</text>
  <text x="456" y="165" class="footer" text-anchor="end">v1.0</text>
</svg>
  `;
}