# Docs for function definitions and their locations.
- To check if the user is loggged in or not, the logic has been implemented inside `Layout.jsx` file under `layout` folder, so that it will check for each and every route. (Layout is rendered for each and every route). If the user is not logged in, then it will redirect to login page. SearchParam: `USERLOGINCHECK`

- Authentication with google is implemented in both Login and Signup page. `sb-access-token` and `sb-refresh-token` are the keys used to store the tokens in cookies. SearchParam: `AUTHENTICATION`.