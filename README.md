# GitHub Streak SVG Generator

This project generates a dynamic SVG image displaying your GitHub contribution streak statistics. It provides a simple web interface to generate the necessary Markdown to embed this SVG into your GitHub profile README or any other Markdown file.

## ✨ Features

*   **Dynamic SVG Generation:** Creates an SVG image showing your current streak, longest streak, and total contributions.
*   **Customizable Date Range:** Optionally specify a "from" and "to" date to calculate streaks within a particular period.
*   **Easy-to-Use Frontend:** A simple `index.html` page to input your GitHub username and desired date range.
*   **Live Preview:** See a live preview of your streak SVG as you configure it.
*   **Markdown Output:** Instantly get the Markdown code to embed the SVG.
*   **Copy to Clipboard:** Easily copy the generated Markdown.
*   **Vercel Deployable:** Designed for easy deployment on Vercel.

## 🚀 Live Demo & Usage

Once deployed, you can access the frontend by visiting the root URL of your deployment (e.g., `https://your-deployment-url.vercel.app/`).

1.  Enter your GitHub username.
2.  Optionally, select a "From Date" and "To Date" for the streak calculation.
3.  Click "Generate Markdown".
4.  You will see a live preview of your streak SVG and the Markdown code required to embed it.
5.  Click "Copy to Clipboard" and paste the Markdown into your GitHub profile `README.md` or any other Markdown file.

Example Markdown to embed:

```markdown
[![GitHub Streak](https://your-deployment-url.vercel.app/api/streak/svg?username=your-username)](https://git.io/streak-stats)
```

(Replace `your-deployment-url.vercel.app` with your actual deployment URL and `your-username` with the desired GitHub username. You can also add `&from=YYYY-MM-DD&to=YYYY-MM-DD` for date ranges.)

##  API Endpoint

The core of this project is the SVG generation API endpoint:

*   `GET /api/streak/svg`

    **Query Parameters:**

    *   `username` (required): The GitHub username to fetch streak data for.
    *   `from` (optional): The start date for calculating streaks (format: `YYYY-MM-DD`).
    *   `to` (optional): The end date for calculating streaks (format: `YYYY-MM-DD`).

    **Example:**
    `/api/streak/svg?username=octocat&from=2023-01-01&to=2023-12-31`

## 🛠️ Project Structure

*   `index.html`: The frontend interface for generating the widget Markdown.
*   `api/svg.js`: The Vercel serverless function that generates the SVG image.
*   `utils/svg.js`: Utility function to render the SVG content based on streak data.
*   `github.js`: Module responsible for fetching contribution data from GitHub and calculating streaks.
*   `vercel.json`: Configuration file for Vercel deployment.
*   `package.json`: Project dependencies and scripts.

## 部署 (Deployment)

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  Fork/clone this repository.
2.  Connect your GitHub repository to Vercel.
3.  Ensure you have a `GITHUB_TOKEN` environment variable set up in your Vercel project settings. This token needs appropriate permissions (e.g., `public_repo`, `read:user`) to access GitHub contribution data.
4.  Vercel will automatically build and deploy the `index.html` frontend and the serverless function in the `api` directory based on the `vercel.json` configuration.

---

Enjoy showcasing your GitHub streaks!
