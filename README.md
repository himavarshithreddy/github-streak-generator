# GitHub Streak SVG Generator

This project generates a dynamic SVG image displaying your GitHub contribution streak statistics. It provides a simple web interface to generate the necessary Markdown to embed this SVG into your GitHub profile README or any other Markdown file.

## 🚀 How to Get Your GitHub Streak SVG

There are two main ways to use this service:

**1. Using a Publicly Hosted Service (If Available)**

If a public instance of this generator is available (e.g., hosted by the project owner or another user), you can use it directly:

1.  Navigate to the frontend URL of the hosted service (e.g., `https://your-instance-url.vercel.app/`).
2.  Enter your GitHub username.
3.  Optionally, select a "From Date" and "To Date" for the streak calculation.
4.  Click "Generate Markdown".
5.  You will see a live preview of your streak SVG and the Markdown code required to embed it.
6.  Copy the Markdown and paste it into your GitHub profile `README.md` or any other Markdown file.

    The Markdown will look something like this (using the public instance URL):
    ```markdown
    [![GitHub Streak](https://your-instance-url.vercel.app/api/streak/svg?username=your-username)](https://git.io/streak-stats)
    ```
    (Replace `your-instance-url.vercel.app` with the actual URL of the public service and `your-username` with your GitHub username. You can also add `&from=YYYY-MM-DD&to=YYYY-MM-DD` for date ranges to the image URL.)

**2. Deploying Your Own Instance**

If a public instance isn't available or you prefer to host your own, please see the "[Deploying Your Own Instance](#deploying-your-own-instance)" section below. Once deployed, you will use *your own* deployment URL in the steps outlined above.

## ✨ Features

*   **Dynamic SVG Generation:** Creates an SVG image showing your current streak, longest streak, and total contributions.
*   **Customizable Date Range:** Optionally specify a "from" and "to" date to calculate streaks within a particular period.
*   **Easy-to-Use Frontend:** A simple `index.html` page to input a GitHub username and desired date range.
*   **Live Preview:** See a live preview of the streak SVG as it's configured.
*   **Markdown Output:** Instantly get the Markdown code to embed the SVG.
*   **Copy to Clipboard:** Easily copy the generated Markdown.
*   **Vercel Deployable:** Designed for easy deployment on Vercel.

## ⚙️ API Endpoint Details

The core of this project is the SVG generation API endpoint, which your frontend will use:

*   `GET /api/streak/svg`

    **Query Parameters:**

    *   `username` (required): The GitHub username to fetch streak data for.
    *   `from` (optional): The start date for calculating streaks (format: `YYYY-MM-DD`).
    *   `to` (optional): The end date for calculating streaks (format: `YYYY-MM-DD`).

    **Example (if your service is at `https://your-instance-url.vercel.app/`):**
    `https://your-instance-url.vercel.app/api/streak/svg?username=octocat&from=2023-01-01&to=2023-12-31`

## <a name="deploying-your-own-instance"></a>🌐 Deploying Your Own Instance

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  **Fork/Clone this Repository:** Get a copy of the project files.
2.  **Connect to Vercel:** Link your GitHub repository (the fork/clone) to your Vercel account.
3.  **Set Environment Variable:** In your Vercel project settings, create an environment variable named `GITHUB_TOKEN`. This token is used to fetch contribution data from the GitHub API.
    *   You can generate a new [Personal Access Token (Classic)](https://github.com/settings/tokens/new) on GitHub.
    *   The token needs appropriate permissions (e.g., `public_repo` for public repositories, and `read:user` to read user profile data).
4.  **Deploy:** Vercel will automatically build and deploy the `index.html` frontend and the serverless function in the `api` directory based on the `vercel.json` configuration. Your instance will then be available at the URL Vercel provides.

## 🛠️ Project Structure (For Developers)

*   `index.html`: The frontend interface for generating the widget Markdown.
*   `api/svg.js`: The Vercel serverless function that generates the SVG image.
*   `utils/svg.js`: Utility function to render the SVG content based on streak data.
*   `github.js`: Module responsible for fetching contribution data from GitHub and calculating streaks.
*   `vercel.json`: Configuration file for Vercel deployment.
*   `package.json`: Project dependencies and scripts.

---

Enjoy showcasing your GitHub streaks!
