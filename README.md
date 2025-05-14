# GitHub Streak Generator

A service that generates GitHub contribution streak data and visualizations for any GitHub user. 

## Features

- Get streak information as JSON data
- Generate SVG images showing current and longest streak information
- Display streak dates and visualization

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/github-streak-generator.git
   cd github-streak-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your GitHub personal access token:
   ```
   GITHUB_TOKEN=your_personal_access_token
   PORT=3000
   ```

   To create a personal access token, visit [GitHub > Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).

## Usage

### Running the server

```
npm start
```

For development with auto-restart:
```
npm run dev
```

### API Endpoints

1. Get streak data as JSON:
   ```
   GET /api/streak/:username
   ```

2. Get streak visualization as SVG:
   ```
   GET /api/streak/:username/svg
   ```

## Example

1. To get streak data for a user named 'octocat':
   ```
   GET http://localhost:3000/api/streak/octocat
   ```

2. To get streak visualization for 'octocat':
   ```
   GET http://localhost:3000/api/streak/octocat/svg
   ```

## Contributing

Contributions are welcome! Feel free to submit a pull request.

## Author

Himavarshith Reddy
