const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];



const isValid = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
// Filter the users array for any user with the same username and password
let validusers = users.filter((user) => {
  return (user.username === username && user.password === password);
});
// Return true if any valid user is found, otherwise false
if (validusers.length > 0) {
  return true;
} else {
  return false;
}

}









//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

// Check if username or password is missing
if (!username || !password) {
  return res.status(404).json({ message: "Error logging in" });
}

// Authenticate user
if (isValid(username, password)) {
  // Generate JWT access token
  let accessToken = jwt.sign({
      data: password
  }, 'access', { expiresIn: 60 * 60 });

  // Store access token and username in session
  req.session.authorization = {
      accessToken, username
  }
  return res.status(200).send("User successfully logged in");
} else {
  return res.status(208).json({ message: "Invalid Login. Check username and password" });
}
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
  const isbn = req.params.isbn;

 
 
  let book = books[isbn];  // Retrieve friend object associated with email

if (book) {  // Check if friend exists
  let review = req.body.review;
  // Add similarly for firstName
  // Add similarly for lastName

  // Update DOB if provided in request body
  if (review) {
      book["reviews"]= {review}
  }
  // Add similarly for firstName
  // Add similarly for lastName

  books[isbn] = book;  // Update friend details in 'friends' object
  res.send(`review with the book of the isbn ${isbn} and user name ${req.session.authorization.username} has been updated .`);
} else {
  // Respond if friend with specified email is not found
  res.send("Unable to find book!");
}
  return res.status(300).json({message: "Yet to be implemented"});
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Extract email parameter from request URL
  const isbn = req.params.isbn;

if (isbn) {
  // Delete friend from 'friends' object based on provided email
  delete books[isbn]['reviews'].review;
}

// Send response confirming deletion of friend
res.send(`review with the book of the isbn ${isbn} and user name ${req.session.authorization.username} has been deleted.`);
});

//  Get book review
regd_users.get('/auth/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    res.send(books[isbn]['reviews'].review);
 
  return res.status(300).json({message: "This is the review"+`books[isbn]['reviews'].review`});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
