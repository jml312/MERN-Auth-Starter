
# MERN Authentication Starter

Fully functional MERN stack authentication starter code. I left all of the css for you 👍.


## Tech Stack

**Client:** React, Redux Toolkit, Google Login, Axios

**Server:** Node, Express, MongoDB, SendGrid Email API, JWT

  
## Installation 

```bash 
  cd MERN-Auth-Starter
  cd client && npm install
  cd ../server && npm install
  npm run dev
```
    
## Environment Variables

See "example.env" files for variables needed

  
## API Reference

#### Login
```http
  POST /api/auth/login
```
Input: email and password

Output: JWT token

#### Google Login
```http
  POST /api/auth/googlelogin
```
Input: email and username

Output: JWT token

#### Register
```http
  POST /api/auth/register
```
Input: email, username, and password

Output: JWT token

#### Forgot Password
```http
  POST /api/auth/forgotpassword
```
Input: email

Output: isEmailSent (whether or not the password reset email has been sent)

#### Reset Password
```http
  PUT /api/auth/resetpassword/:resetToken
```
Input: password

Output: isPasswordReset (whether or not the password has been reset)
  
## Acknowledgements

 - [LloydJanseVanRensburg/AdvancedNodeAuth](https://github.com/LloydJanseVanRensburg/AdvancedNodeAuth)
 - [flaviuse/mern-authentication](https://github.com/flaviuse/mern-authentication)
 - [paolodelia99/MERN-Boilerplate](https://github.com/paolodelia99/MERN-Boilerplate)
