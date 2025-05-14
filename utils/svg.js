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
    
  // Calculate percentage for progress bars
  const maxValue = Math.max(currentStreak, longestStreak, 100);
  const currentStreakPercentage = Math.min(100, (currentStreak / maxValue) * 100);
  const longestStreakPercentage = Math.min(100, (longestStreak / maxValue) * 100);
  const contributionsPercentage = Math.min(100, (totalContributions / (maxValue * 10)) * 100);

  return `
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d1117" />
      <stop offset="100%" stop-color="#161b22" />
    </linearGradient>
    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#21262d" />
      <stop offset="100%" stop-color="#30363d" />
    </linearGradient>
    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ef4444" />
    </linearGradient>
    <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <linearGradient id="commitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
    <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#22c55e" />
    </linearGradient>
    <linearGradient id="pullRequestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <linearGradient id="issueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#d946ef" />
    </linearGradient>
    
    <!-- Drop shadow -->
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    
    <!-- Progress bar filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Clip paths for rounded corners -->
    <clipPath id="roundedRect">
      <rect x="0" y="0" width="100%" height="100%" rx="12" ry="12" />
    </clipPath>
  </defs>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&amp;display=swap');
    
    .bg { fill: url(#bgGradient); }
    .card { 
      fill: url(#cardGradient); 
      stroke: #444c56; 
      stroke-width: 1;
      rx: 12;
      filter: url(#dropShadow);
    }
    .card-header { 
      font: bold 16px 'JetBrains Mono', monospace; 
      fill: #e6edf3; 
      letter-spacing: -0.5px;
    }
    .label { 
      font: 600 14px 'JetBrains Mono', monospace; 
      fill: #adbac7; 
      letter-spacing: -0.2px;
    }
    .value { 
      font: 800 28px 'JetBrains Mono', monospace; 
      fill: #e6edf3; 
      letter-spacing: -1px;
    }
    .dates { 
      font: 400 12px 'JetBrains Mono', monospace; 
      fill: #768390; 
    }
    .icon-flame { fill: url(#flameGradient); }
    .icon-trophy { fill: url(#trophyGradient); }
    .icon-commit { fill: url(#commitGradient); }
    .icon-calendar { fill: url(#calendarGradient); }
    .icon-pr { fill: url(#pullRequestGradient); }
    .icon-issue { fill: url(#issueGradient); }
    .progress-bg { 
      fill: #2d333b; 
      rx: 6;
      ry: 6;
    }
    .progress-flame { 
      fill: url(#flameGradient); 
      rx: 6;
      ry: 6;
      filter: url(#glow);
    }
    .progress-trophy { 
      fill: url(#trophyGradient); 
      rx: 6;
      ry: 6;
      filter: url(#glow);
    }
    .progress-commit { 
      fill: url(#commitGradient); 
      rx: 6;
      ry: 6;
      filter: url(#glow);
    }
    .divider { 
      stroke: #444c56; 
      stroke-width: 1; 
    }
    .footer { 
      font: 400 12px 'JetBrains Mono', monospace; 
      fill: #768390; 
    }
    .github-logo {
      fill: #e6edf3;
    }
  </style>
  
  <!-- Background -->
  <rect width="100%" height="100%" class="bg" rx="16" ry="16"/>
  
  <!-- Header with GitHub logo -->
  <g transform="translate(36, 40)">
    <!-- GitHub logo -->
    <path class="github-logo" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12" transform="scale(1.2)"/>
    
    <!-- Title text -->
    <text x="40" y="16" class="card-header">GitHub Contribution Dashboard</text>
  </g>
  
  <!-- Main Card -->
  <rect x="20" y="60" width="760" height="320" class="card"/>
  
  <!-- GitHub contribution graph (mini calendar visualization) -->
  <g transform="translate(40, 90)">
    <!-- Mini contribution calendar -->
    <rect x="0" y="0" width="720" height="55" fill="#242b33" rx="8" ry="8"/>
    
    <!-- Calendar cells - first row (darker to lighter green representing contribution intensity) -->
    <g transform="translate(10, 10)">
      ${generateCalendarGrid()}
    </g>
    
    <!-- Calendar legend -->
    <g transform="translate(560, 42)">
      <text x="0" y="10" class="dates" text-anchor="end">Less</text>
      <rect x="65" y="3" width="10" height="10" fill="#0e4429" rx="2" ry="2"/>
      <rect x="80" y="3" width="10" height="10" fill="#006d32" rx="2" ry="2"/>
      <rect x="95" y="3" width="10" height="10" fill="#26a641" rx="2" ry="2"/>
      <rect x="110" y="3" width="10" height="10" fill="#39d353" rx="2" ry="2"/>
      <text x="130" y="10" class="dates">More</text>
    </g>
  </g>
  
  <!-- Row 1: Main stats with improved icons and progress bars -->
  <g transform="translate(40, 170)">
    <!-- Current Streak -->
    <g>
      <!-- Flame icon (improved with gradient) -->
      <path class="icon-flame" d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z" transform="translate(10, 5) scale(0.06)"/>
      <text x="50" y="20" class="label">Current Streak</text>
      <text x="50" y="55" class="value">${currentStreak}</text>
      <text x="50" y="75" class="dates">days (${currentStreakDates})</text>
      
      <!-- Progress bar -->
      <rect x="150" y="42" width="80" height="12" class="progress-bg"/>
      <rect x="150" y="42" width="${(currentStreakPercentage/100) * 80}" height="12" class="progress-flame"/>
    </g>
    
    <!-- Longest Streak -->
    <g transform="translate(250, 0)">
      <!-- Trophy icon (with gradient) -->
      <path class="icon-trophy" d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" transform="translate(10, 5) scale(0.06)"/>
      <text x="50" y="20" class="label">Longest Streak</text>
      <text x="50" y="55" class="value">${longestStreak}</text>
      <text x="50" y="75" class="dates">days (${longestStreakDates})</text>
      
      <!-- Progress bar -->
      <rect x="150" y="42" width="80" height="12" class="progress-bg"/>
      <rect x="150" y="42" width="${(longestStreakPercentage/100) * 80}" height="12" class="progress-trophy"/>
    </g>
    
    <!-- Total Contributions -->
    <g transform="translate(500, 0)">
      <!-- Commit icon (with gradient) -->
      <path class="icon-commit" d="M 50,10 C 60,10 70,10 75,10 75,15 75,25 75,30 70,30 60,30 50,30 50,25 50,15 50,10 Z M 0,20 50,20 M 75,20 125,20" transform="translate(10, 12) scale(0.8)" stroke-width="10" stroke-linecap="round" stroke="url(#commitGradient)" fill="none"/>
      <text x="50" y="20" class="label">Total Contributions</text>
      <text x="50" y="55" class="value">${totalContributions}</text>
      <text x="50" y="75" class="dates">commits to repositories</text>
      
      <!-- Progress bar -->
      <rect x="150" y="42" width="80" height="12" class="progress-bg"/>
      <rect x="150" y="42" width="${(contributionsPercentage/100) * 80}" height="12" class="progress-commit"/>
    </g>
  </g>
  
  <!-- Row 2: Additional stats -->
  <g transform="translate(40, 270)">
    <!-- Issues Created -->
    <g>
      <!-- Issue icon -->
      <path class="icon-issue" d="M12 7a5 5 0 100 10 5 5 0 000-10zm-8 5a8 8 0 1116 0 8 8 0 01-16 0zm8-3a1 1 0 011 1v2a1 1 0 01-2 0V10a1 1 0 011-1zm0 6a1 1 0 100 2 1 1 0 000-2z" transform="translate(12, 10) scale(1.5)"/>
      <text x="50" y="20" class="label">Issues Created</text>
      <text x="50" y="45" class="value">${Math.round(totalContributions * 0.2)}</text>
    </g>
    
    <!-- Pull Requests -->
    <g transform="translate(180, 0)">
      <!-- PR icon -->
      <path class="icon-pr" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 6a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm6.5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-3.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm-12.27.47a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" transform="translate(12, 10) scale(1.5)"/>
      <text x="50" y="20" class="label">Pull Requests</text>
      <text x="50" y="45" class="value">${Math.round(totalContributions * 0.4)}</text>
    </g>
    
    <!-- Code Reviews -->
    <g transform="translate(360, 0)">
      <!-- Review icon (custom) -->
      <path class="icon-calendar" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm2.917 11.417l-3.375-2.2a.4.4 0 01-.167-.325V4.667a.417.417 0 01.833 0V8.7l3.125 2.03a.417.417 0 01-.416.687z" transform="translate(12, 10) scale(1.5)"/>
      <text x="50" y="20" class="label">Code Reviews</text>
      <text x="50" y="45" class="value">${Math.round(totalContributions * 0.3)}</text>
    </g>
    
    <!-- Weekly Average -->
    <g transform="translate(540, 0)">
      <!-- Calendar icon -->
      <path class="icon-calendar" d="M4.75 0A.75.75 0 014 .75V1h-.75a2.25 2.25 0 00-2.25 2.25v2.5A2.25 2.25 0 003.25 8h9.5A2.25 2.25 0 0015 5.75v-2.5A2.25 2.25 0 0012.75 1H12V.75A.75.75 0 0111.25 0h-.5A.75.75 0 0110 .75V1H6V.75A.75.75 0 015.25 0h-.5zm5.69 3a.75.75 0 01.75.75v2.59l1.95 1.95a.75.75 0 01-1.06 1.06L10 7.28l-2.08 2.07a.75.75 0 01-1.06-1.06l1.95-1.95V3.75a.75.75 0 01.75-.75h.83z" transform="translate(12, 10) scale(1.5)"/>
      <text x="50" y="20" class="label">Weekly Average</text>
      <text x="50" y="45" class="value">${Math.round(totalContributions / 52)}</text>
    </g>
  </g>
  
  <!-- Footer -->
  <g transform="translate(400, 360)">
    <text class="footer" text-anchor="middle">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • Developer Productivity Dashboard</text>
  </g>
</svg>
  `;
  
  // Helper function to generate a calendar grid of contribution cells
  function generateCalendarGrid() {
    const cellSize = 8;
    const cellSpacing = 2;
    const numWeeks = 53;
    const days
}