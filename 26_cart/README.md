# React App: Cart

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Idea source
Idea from:
https://www.youtube.com/watch?v=a_7Z7C_JCyo
(6:41:55) Cart

Completed independently and then watched their implementation.

## Additional packages
1. react-icons (https://www.npmjs.com/package/react-icons)
    > npm install react-icons --save

2. Easy Peasy Redux
    > npm install easy-peasy

3. abort-controller (https://www.npmjs.com/package/abort-controller)
    > npm install abort-controller -s

## To run
1. Install dependencies
    > npm install

2. start json-server (Didn't need a db, but wanted to write fetching)
    > npm run server

3. run the app
    > npm start

# Sources
## Logo
1. https://logoipsum.com/



- CRUD. 
    Overwrite with (GET from items_original and then PUT to replace an item back OR POST to add an item if missing to cart). Need to replace individually due to json-server limitations. https://github.com/typicode/json-server#routes
    Read (fetch, refetch with GET - done)
    Update (PUT - done)
    delete (DELETE - done)