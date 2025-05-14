const { request, gql } = require("graphql-request");

const ENDPOINT = "https://api.github.com/graphql";
const query = gql`
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

async function getContributionData(username, token) {
  const headers = { Authorization: `Bearer ${token}` };
  const data = await request(ENDPOINT, query, { username }, headers);
  const days = data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap(week => week.contributionDays);

  const contributionMap = {};
  for (const { date, contributionCount } of days) {
    contributionMap[date] = contributionCount;
  }

  return contributionMap;
}

function calculateStreaks(contributionMap) {
    const allDates = Object.keys(contributionMap);
    if (allDates.length === 0) return {};
  
    const sortedDates = allDates.sort((a, b) => new Date(a) - new Date(b));
  
    const streaks = [];
  
    let currentStreak = 0;
    let streakStart = null;
    let prevDate = null;
  
    for (let dateStr of sortedDates) {
      const date = new Date(dateStr);
  
      if (contributionMap[dateStr] > 0) {
        if (prevDate) {
          const diff = (date - prevDate) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            currentStreak++;
          } else {
            // New streak
            if (currentStreak > 0 && streakStart) {
              streaks.push({ start: streakStart, end: sortedDates[sortedDates.indexOf(dateStr) - 1], length: currentStreak });
            }
            currentStreak = 1;
            streakStart = dateStr;
          }
        } else {
          // first contribution
          currentStreak = 1;
          streakStart = dateStr;
        }
      } else {
        if (currentStreak > 0 && streakStart) {
          streaks.push({ start: streakStart, end: sortedDates[sortedDates.indexOf(dateStr) - 1], length: currentStreak });
        }
        currentStreak = 0;
        streakStart = null;
      }
  
      prevDate = date;
    }
  
    // Add final streak if ended with contributions
    if (currentStreak > 0 && streakStart) {
      streaks.push({ start: streakStart, end: sortedDates[sortedDates.length - 1], length: currentStreak });
    }
  
    // Find longest and most recent streaks
    let longest = { start: null, end: null, length: 0 };
    let mostRecent = { start: null, end: null, length: 0 };
  
    for (const streak of streaks) {
      if (streak.length > longest.length) {
        longest = streak;
      }
  
      if (!mostRecent.end || new Date(streak.end) > new Date(mostRecent.end)) {
        mostRecent = streak;
      }
    }
  
    // Compute current streak from today backwards
    let current = new Date();
    let todayStr = current.toISOString().slice(0, 10);
    let currentStreakLength = 0;
    let currentStreakStart = null;
    let currentStreakEnd = null;
  
    while (true) {
      const dateStr = current.toISOString().slice(0, 10);
      if (contributionMap[dateStr] > 0) {
        currentStreakLength++;
        if (!currentStreakEnd) currentStreakEnd = dateStr;
        currentStreakStart = dateStr;
      } else {
        break;
      }
      current.setDate(current.getDate() - 1);
    }
  
    return {
      currentStreak: currentStreakLength,
      currentStreakStart,
      currentStreakEnd,
      longestStreak: longest.length,
      longestStreakStart: longest.start,
      longestStreakEnd: longest.end,
      mostRecentStreak: mostRecent.length,
      mostRecentStreakStart: mostRecent.start,
      mostRecentStreakEnd: mostRecent.end
    };
  }
  

module.exports = {
  getContributionData,
  calculateStreaks,
};
