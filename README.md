# Getting started
- Install dependencies
```
npm install
```
- Start server
```
npm start
```
- The client app will run at http://localhost:3000

# Mock mode

You can also run the application in mock mode without connecting to the API server. The api requests/responses will be mocked.
```
npm run start:mock
```

# UI pages

The app contains 2 pages:
- Login Page
- Home Page

### Login Page
- Clear login form when clicking `Clear` button
- Submit login form when clicking `Submit` button
- Input validations:
  - `username`:
    - required
    - email format
  - `password`:
    - required
- Redirect user to Home Page if login is success
- Stay in Login Page and show error message if login fails

### Home Page
- App-bar:
  - Contain user menu button showing display name
  - Show `Log Out` option when clicking user menu
  - When loggin out:
    - Clear credentials (cookie `access_token`)
    - Redirect to Login Page after
- Welcome message:
  - Include username (email)
- Test button:
  - Send request GET /test

# Note
- Redirect to Home page instead of showing welcome message in Login page
- Not yet ready for production
- There is only 1 test suite, just to be an example
