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
<svg width="420" height="180" viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Modern color scheme */
    .bg { fill: #13111C; }
    .card { fill: #1A1825; rx: 12; }
    .stat-circle { fill: #22202D; }
    .label { font: 600 12px 'JetBrains Mono', 'Roboto Mono', monospace; fill: #A2A0B3; }
    .value { font: 700 28px 'JetBrains Mono', 'Roboto Mono', monospace; fill: #E2E1E8; }
    .dates { font: 400 10px 'JetBrains Mono', 'Roboto Mono', monospace; fill: #64657B; }
    .icon { fill: url(#icon-gradient); }
    .fire-icon { fill: url(#fire-gradient); }
    .trophy-icon { fill: url(#trophy-gradient); }
    .contrib-icon { fill: url(#contrib-gradient); }
    .footer { font: 400 10px 'JetBrains Mono', 'Roboto Mono', monospace; fill: #64657B; }
    .glow { filter: drop-shadow(0 0 3px #7E57C255); }
  </style>
  
  <!-- Define gradients for icons and elements -->
  <defs>
    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7E57C2" />
      <stop offset="100%" stop-color="#B388FF" />
    </linearGradient>
    
    <linearGradient id="fire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7043" />
      <stop offset="100%" stop-color="#FFAB91" />
    </linearGradient>
    
    <linearGradient id="trophy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD54F" />
      <stop offset="100%" stop-color="#FFECB3" />
    </linearGradient>
    
    <linearGradient id="contrib-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#66BB6A" />
      <stop offset="100%" stop-color="#A5D6A7" />
    </linearGradient>
    
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background and card -->
  <rect width="100%" height="100%" class="bg" rx="16" />
  <rect x="10" y="10" width="400" height="160" class="card" />

  <!-- Stats circles with glowing icons -->
  <g transform="translate(70, 60)">
    <!-- Contrib circle -->
    <circle cx="0" cy="0" r="50" class="stat-circle" />
    <path class="contrib-icon" transform="translate(-17, -17) scale(0.034)" d="M128 0c17.7 0 32 14.3 32 32v64h128v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h48c26.5 0 48 21.5 48 48v48h-480v-48c0-26.5 21.5-48 48-48h48v-64c0-17.7 14.3-32 32-32s32 14.3 32 32v64h128v-64c0-17.7 14.3-32 32-32zm-320 446.9v-319.9h480v319.9c0 35.8-29 65.1-64.9 65.1h-350.2c-35.9 0-64.9-29.3-64.9-65.1zm120-192.9h96c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16v-96c0-8.8 7.2-16 16-16z" />
    <text x="0" y="22" class="value" text-anchor="middle" dominant-baseline="middle">${totalContributions}</text>
    <text x="0" y="60" class="label" text-anchor="middle">Contributions</text>
  </g>

  <g transform="translate(210, 60)">
    <!-- Current streak circle -->
    <circle cx="0" cy="0" r="50" class="stat-circle" />
    <path class="fire-icon glow" transform="translate(-17, -25) scale(0.034)" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z" />
    <text x="0" y="22" class="value" text-anchor="middle" dominant-baseline="middle">${currentStreak}</text>
    <text x="0" y="50" class="label" text-anchor="middle">Current Streak</text>
    <text x="0" y="65" class="dates" text-anchor="middle">${currentStreakDates}</text>
  </g>

  <g transform="translate(350, 60)">
    <!-- Longest streak circle -->
    <circle cx="0" cy="0" r="50" class="stat-circle" />
    <path class="trophy-icon glow" transform="translate(-16, -20) scale(0.032)" d="M399.1 0c-26.5.2-50.9 10.8-69.7 28.7-18.1 17.3-28.4 40.8-29.4 65.7v2.8c0 4.4 3.5 8 8 8h47.8c5.3-28.2 29.3-49.6 59.2-49.6 33.1 0 60 27 60 60 0 20.9-10.8 39.3-27 50.1 11 8.9 24.9 14.3 40 14.3h88c8.8 0 16-7.2 16-16v-16c0-52.9-43.1-96-96-96h-8.3v-.7c-1-55.3-46.5-99.3-101.9-99.3-2.8 0-5.6.1-8.3.4-56.1 5-100.4 52.1-100.4 108.3v.3H224.4c-29.5 0-55 17.1-67.2 41.8l29.1 14.6C193.9 95.7 208 80 224.4 80h36.9c2-55.9 49-77.2 97.9-80h4.2c12.8 0 25.1 1.9 36.8 5.4 10.2-22 32.4-37.4 58.1-37.4 35.3 0 64 28.7 64 64 0 35.3-28.7 64-64 64-25.5 0-47.6-15-57.9-36.7-1.9-.6-3.8-1.2-5.8-1.7v1.1c0 3 .2 5.9.5 8.8.9 8.7 6.8 14.5 14.4 14.5h3.4c2.6-9.7 11.5-17 22.3-17s19.7 7.3 22.3 17h165.2l-66.2 177.6c-.5 1.3-1 2.7-1.6 4.1-1.4 3.5-3 7.1-4.7 10.7L423.5 384h-14.2l14.6-48.6c-16 5.3-69.9 25.9-132.1 71.2-4.6 3.4-8.1 8.1-10.8 13.3-2.6 5.2-4.1 11-4.1 17V464c0 26.5 21.5 48 48 48h160c26.5 0 48-21.5 48-48v-26.9c0-8.4-2.7-16.7-7.9-23.4l-37.5-48.9 45.5-140.8c2.8-8.8-1.8-18.3-10.3-21.7-1.7-.7-3.5-1.1-5.2-1.3V192c0-8.8-7.2-16-16-16h-16.4c-14.3 0-27.8-3.6-39.6-10zM353.1 477c-5.7-9.3-8.9-20-9.1-30.9v-3.6c0-5.7 1.6-11.3 4.5-16.2.2-.4.5-.8.7-1.1 2.1-3.2 4.8-6 8-8.2 70.5-51.5 131.8-75.9 143.2-80.2l11.8 15.3c3.5 4.4 5.4 9.9 5.4 15.6v48.4c0 13.3-10.7 24-24 24H353.1z" />
    <text x="0" y="22" class="value" text-anchor="middle" dominant-baseline="middle">${longestStreak}</text>
    <text x="0" y="50" class="label" text-anchor="middle">Longest Streak</text>
    <text x="0" y="65" class="dates" text-anchor="middle">${longestStreakDates}</text>
  </g>

  <!-- Footer -->
  <text x="210" y="160" class="footer" text-anchor="middle">GitHub Contribution Stats • Generated with ♥</text>
</svg>
  `;
}