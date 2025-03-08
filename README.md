# GitHub User Search

A simple web application that allows you to search for GitHub users using the GitHub API and display their profile information.

## Features

- Search for any GitHub user by username
- Display user profile information including:
  - Profile picture
  - Name
  - Username with link to GitHub profile
  - Bio
  - Join date
  - Location (if available)
  - Email (if public)
  - Website (if available)
- View user statistics:
  - Number of public repositories
  - Number of followers
  - Number of users they're following
- Responsive design that works on mobile and desktop

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub REST API

## How It Works

This application uses the GitHub API to fetch user data based on the username entered by the user. It's a client-side only application with no backend requirements, making it easy to deploy and use.

The main API endpoint used is:
```
https://api.github.com/users/{username}
```

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Erangamadhushan/GitHub-Users.git
   ```

2. Navigate to the project directory:
   ```bash
   cd github-user-search
   ```

3. Open `index.html` in your web browser or use a local server.

No additional dependencies or build steps are required!

## Usage

1. Enter a GitHub username in the search box
2. Click the "Search" button or press Enter
3. View the user's profile information and statistics

## API Rate Limiting

Please note that the GitHub API has rate limiting:
- For unauthenticated requests, the rate limit is 60 requests per hour.
- If you need to make more requests, consider implementing GitHub OAuth authentication.

## Future Enhancements

- Add the ability to view user repositories
- Implement authentication to increase API rate limits
- Add dark mode toggle
- Create a favorites system to save frequent searches

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
<!--This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.-->

## Acknowledgements

- [GitHub API Documentation](https://docs.github.com/en/rest)
