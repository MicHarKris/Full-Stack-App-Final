# Full-Stack-App-with-React-and-a-REST-API
 React client for school database using REST API

# About the Project
The project uses PUT, GET, SET and DELETE API operations to maintain a database relationship between Client and Server. Visual parts (Buttons) and allowed API actions (Create) are sectioned off, and only available for authorized users registered with the Server, and some actions (Update and Delete) only when the authorized user is also the associated owner of the course in question.
The page allows for the user to Sign Up, Sign In and Sign Out, storing the authorization in a cookie, and retains the login state between uses of the page. 

- Could not find an elegant way of minimizing the amount of Code in regards to the Error Handling, but refactoring the error handling would be a definite area of improvement for the project, in further iterations. 

  ### Tools and Technologies
 JavaScript, 
 Express, 
 React, 
 Node.js, 
 Sequelize,
 REST API,
 Postman,
 DB Browser for SQLite

 ### Accreditation
 I have used a very liberal reference to all the older project of TeamTreeHouse that I have been through, and used ChatGPT as a sort of 'Paired Programming Buddy / Rubber Duck' to bounce my understanding and solutions off of; if any of the solutions I have found, are very similar to solutions that should be accredited to a certain developer, I must sadly admit that I do not know how ChatGPT references content - And, I have worked to understand and formulate my own answers to each method I have discovered, so should anything appear to be plagiarism, I will claim it to be a coincidence or at best unknowing and unintentional. 

 I will directly reference; 
 https://reactrouter.com/en/main/components/link#state - for my understanding of using the useLocation method of passing state information between Links
 https://www.npmjs.com/package/react-markdown#markdown - for the way I formatted the Markdown areas of text in the Course Details
 https://expressjs.com/en/guide/routing.html - for the way that I pass parameters through the route, to the Server-side User comparison between the Client-side AuthUser, and the Course.User.Id of the database.
