import { request, gql } from "graphql-request";

const ENDPOINT = "https://api.github.com/graphql";

// GraphQL query to fetch contribution days in a given window
const contributionsQuery = gql`
  query ($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
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

/**
 * Fetch a single 1-year window of contributions
 */
async function fetchContributionWindow(username, token, from, to) {
  const headers = { Authorization: `Bearer ${token}` };
  const data = await request(ENDPOINT, contributionsQuery, { username, from, to }, headers);
  return data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap(week => week.contributionDays);
}

/**
 * Fetch contributions in a dynamic time window (max 1 year per chunk).
 * @param {string} username
 * @param {string} token
 * @param {string} [from] ISO date string; defaults to now minus 1 year
 * @param {string} [to] ISO date string; defaults to now
 */
export async function getContributionData(username, token, from, to) {
  const now = new Date();
  const endDate = to ? new Date(to) : now;
  const startDate = from ? new Date(from) : new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  // Build 1-year windows between startDate and endDate
  const windows = [];
  let windowStart = new Date(startDate);
  while (windowStart <= endDate) {
    const windowEnd = new Date(windowStart);
    windowEnd.setFullYear(windowEnd.getFullYear() + 1);
    if (windowEnd > endDate) windowEnd.setTime(endDate.getTime());
    windows.push({ from: windowStart.toISOString(), to: windowEnd.toISOString() });
    windowStart = new Date(windowEnd);
    windowStart.setDate(windowStart.getDate() + 1);
  }

  // Aggregate contributions
  const contributionMap = {};
  for (const { from: f, to: t } of windows) {
    const days = await fetchContributionWindow(username, token, f, t);
    days.forEach(({ date, contributionCount }) => {
      contributionMap[date] = (contributionMap[date] || 0) + contributionCount;
    });
  }

  return contributionMap;
}

/**
 * Calculate total contributions, current streak, and longest streak
 */
export function calculateStreaks(contributionMap) {
  const allDates = Object.keys(contributionMap);
  if (allDates.length === 0) {
    return {
      totalContributions: 0,
      currentStreak: 0,
      currentStreakStart: null,
      currentStreakEnd: null,
      longestStreak: 0,
      longestStreakStart: null,
      longestStreakEnd: null
    };
  }

  const totalContributions = allDates.reduce((sum, date) => sum + contributionMap[date], 0);

  const sortedDates = allDates.sort((a, b) => new Date(a) - new Date(b));
  const streaks = [];
  let streak = { start: null, end: null, length: 0 };

  for (let i = 0; i < sortedDates.length; i++) {
    const dateStr = sortedDates[i];
    const count = contributionMap[dateStr];

    if (count > 0) {
      if (streak.length === 0) streak.start = dateStr;
      streak.end = dateStr;
      streak.length++;
    }

    const next = sortedDates[i + 1];
    const gap = next ? (new Date(next) - new Date(dateStr)) / (1000 * 60 * 60 * 24) : null;
    if (count === 0 || gap > 1 || i === sortedDates.length - 1) {
      if (streak.length > 0) {
        streaks.push({ ...streak });
        streak = { start: null, end: null, length: 0 };
      }
    }
  }

  let longest = { start: null, end: null, length: 0 };
  streaks.forEach(s => { if (s.length > longest.length) longest = s; });

  const positiveDays = sortedDates.filter(d => contributionMap[d] > 0);
  const lastDay = positiveDays[positiveDays.length - 1];
  let cursor = new Date(lastDay);
  let currentCount = 0;
  let currentStart = null;

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (contributionMap[key] > 0) {
      currentCount++;
      currentStart = key;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalContributions,
    currentStreak: currentCount,
    currentStreakStart: currentStart,
    currentStreakEnd: lastDay,
    longestStreak: longest.length,
    longestStreakStart: longest.start,
    longestStreakEnd: longest.end
  };
}
