const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;


function getListOfBooks(url){

  
  const req = axios.get(url);
 
  console.log(req);

  req.then(resp => {
    let listOfBooks = resp.data;
    console.log(JSON.stringify(listOfBooks, null, 4))
    return resp.status(300).json({message: "books succesfully retrieved"});
  })
.catch(err => {
  //Logging the error message
  console.log(err.toString())
})

}


function getBookISBN(isbn){


  const req = axios.get('http://localhost:5000/isbn/'+`${isbn}`);
  
  console.log(req);

  req.then(resp => {
    let book = books[isbn];
    console.log(JSON.stringify(book,null,4));
    
  })
.catch(err => {
  //Logging the error message
  console.log(err.toString())
})

}



getBookISBN(2)


// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


public_users.post("/register", (req,res) => {
     const username = req.body.username;
     const password = req.body.password;

// Check if both username and password are provided
    if (username && password) {
    // Check if the user does not already exist
    if (!doesExist(username)) {
        // Add the new user to the users array
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
        return res.status(404).json({message: "User already exists!"});
    }
}
  return res.status(404).json({message: "Unable to register"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "books succesfully retrieved"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
  return res.status(300).json({message: "The book with the isbn number"+`$isbn` + "is added"});
 });
  
// Get book details based on author

function getBookAuthor(author){


  const req = axios.get('http://localhost:5000/author/'+`${author}`);

  req.then(resp => {
    let book = (author) => {
    
    for (let i = 0; i < 10; i++) {
      if (books[i+1]['author'] === author){
        return books[i+1];
        
      }
      
    }

  } 

  if (book(author)){
    console.log(book(author))
    
  }})
  
  
.catch(err => {
  //Logging the error message
  console.log(err.toString())
})

}


//getBookAuthor('Jane Austen')




public_users.get('/author/:author',function (req, res) {
   
      const author = req.params.author;
    
     let book = (author) => {
      
      for (let i = 0; i < 10; i++) {
        if (books[i+1]['author'] === author){
          return books[i+1];
          
        }
        
      }

    } 

    if (book(author)){
      res.send(book(author))
      return res.status(300).json({message: "book added"});
    }
    else{
      res.send("Unable to find book!")
    }
   

})


function getBookTitle(title){


  const req = axios.get('http://localhost:5000/title/'+`${title}`);

  req.then(resp => {
    let book = (title) => {
    
    for (let i = 0; i < 10; i++) {
      if (books[i+1]['title'] === title){
        return books[i+1];
        
      }
      
    }

  } 

  if (book(title)){
    console.log(book(title))
    
  }})
  
  
.catch(err => {
  //Logging the error message
  console.log(err.toString())
})

}

getBookTitle('Fairy tales')

  
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   const title = req.params.title;
    
     let book = (title) => {

      for (let i = 0; i < 10; i++) {
        if (books[i+1]['title'] === title){
          return books[i+1];

    }

      }

    } 

if (book(title)){
      res.send(book(title))
      return res.status(300).json({message: "book added"});
    }
    else{
      res.send("Unable to find book!")
      return res.status(300).json({message: "No Fuc* book!"});
    }
     

  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    res.send(books[isbn]['reviews'].review);
 
  return res.status(300).json({message: "This is the review"+`books[isbn]['reviews'].review`});
});

module.exports.general = public_users;
