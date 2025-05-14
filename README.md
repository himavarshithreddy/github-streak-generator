# My GitHub Streak SVG Generator

Welcome! With this project, I've created a tool to generate a dynamic SVG image displaying your GitHub contribution streak statistics. I also provide a simple web interface to help you get the Markdown needed to embed this SVG into your GitHub profile README or any other Markdown file.

## 🚀 How to Get Your GitHub Streak SVG

There are two main ways you can use this generator:

**1. Use My Hosted Instance**

I host a public instance of this generator which you are welcome to use:

*   **Live Generator:** https://github-streak-generator.vercel.app/

To use it:
1.  Navigate to the link above.
2.  Enter the target GitHub username.
3.  Optionally, select a "From Date" and "To Date" for the streak calculation.
4.  Click "Generate Markdown".
5.  You'll see a live preview of the streak SVG and the Markdown code.
6.  Copy this Markdown and paste it into your GitHub profile `README.md` or any other Markdown file.

    The Markdown will look like this:
    ```markdown
    [![GitHub Streak]([https://github-streak-generator.vercel.app/]/api/streak/svg?username=your-username)(https://github.com/username)]
    ```
    (Just replace `your-username` with the GitHub username. You can also add `&from=YYYY-MM-DD&to=YYYY-MM-DD` for date ranges to the image URL.)

**2. Deploy Your Own Instance**

If you prefer to host your own version, you can! See the "[Deploying Your Own Instance](#deploying-your-own-instance)" section below. Once deployed, you'll use *your own* deployment URL in the steps outlined above.

## ✨ Features I've Included

*   **Dynamic SVG Generation:** The service creates an SVG image showing current streak, longest streak, and total contributions.
*   **Customizable Date Range:** You can optionally specify a "from" and "to" date to calculate streaks within a particular period.
*   **Easy-to-Use Frontend:** I've built a simple `index.html` page to input a GitHub username and desired date range.
*   **Live Preview:** You can see a live preview of the streak SVG as it's configured.
*   **Markdown Output:** The tool instantly gives you the Markdown code to embed the SVG.
*   **Copy to Clipboard:** Easily copy the generated Markdown.
*   **Vercel Optimized:** I've designed it for easy deployment on Vercel.

## ⚙️ API Endpoint Details

The core of this project is the SVG generation API endpoint that my frontend (and yours, if you deploy it) uses:

*   `GET /api/streak/svg`

    **Query Parameters:**

    *   `username` (required): The GitHub username to fetch streak data for.
    *   `from` (optional): The start date for calculating streaks (format: `YYYY-MM-DD`).
    *   `to` (optional): The end date for calculating streaks (format: `YYYY-MM-DD`).

    **Example (if your service is at `https://your-instance-url.vercel.app/`):
    `https://your-instance-url.vercel.app/api/streak/svg?username=octocat&from=2023-01-01&to=2023-12-31`

## <a name="deploying-your-own-instance"></a>🌐 Deploying Your Own Instance

I've optimized this project for deployment on [Vercel](https://vercel.com/). Here's how you can deploy your own:

1.  **Fork/Clone My Repository:** Get a copy of the project files.
2.  **Connect to Vercel:** Link your GitHub repository (your fork/clone) to your Vercel account.
3.  **Set Environment Variable:** In your Vercel project settings, create an environment variable named `GITHUB_TOKEN`. This token is used to fetch contribution data from the GitHub API.
    *   You can generate a new [Personal Access Token (Classic)](https://github.com/settings/tokens/new) on GitHub.
    *   The token needs appropriate permissions (e.g., `public_repo` for public repositories, and `read:user` to read user profile data).
4.  **Deploy:** Vercel will automatically build and deploy the `index.html` frontend and the serverless function in the `api` directory based on the `vercel.json` configuration I've set up. Your instance will then be available at the URL Vercel provides.

## 🛠️ Project Structure (For Developers)

Here's a quick look at the main files I've included:

*   `index.html`: The frontend interface I built for generating the widget Markdown.
*   `api/svg.js`: The Vercel serverless function that generates the SVG image.
*   `utils/svg.js`: The utility function to render the SVG content based on streak data.
*   `github.js`: The module I wrote that's responsible for fetching contribution data from GitHub and calculating streaks.
*   `vercel.json`: The configuration file for Vercel deployment.
*   `package.json`: Project dependencies and scripts.

---

I hope you enjoy showcasing your GitHub streaks with this tool!
