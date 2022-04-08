### cloud-lab1-test ###

<h1># Lab 1 #</h1>
<p>
  <strong>URL: </strong>https://cloud-lab1.herokuapp.com/<br>
  <strong>Custom Route: </strong>https://cloud-lab1.herokuapp.com/lab1/ <br>
  <strong>Database Route: </strong>https://cloud-lab1.herokuapp.com/db/
</p>

I started off by creating a heroku account. Before I installed the Heroku CLI, I made sure to update my NodeJS and Git installations to current releases. Next, I installed the Heroku CLI. I continued by following the "getting started" guide to clone a starting project and then deploy it to heroku using the Heroku CLI commands in the guide. The app was deployed successfully and could be accessed by the remote URL. 

I tried to familiarize myself with running the app locally for testing. The first attempt failed because of an 'ejs' dependency missing, which was solved by running 'npm install' to download the necessary dependencies into my local node_modules. 

To integrate the Heroku deployment with Github, I created an empty repository on Github, pushed the same content to this Github and then changed the deployment on Heroku to connect to this reposityory. I enabled automatic deployments. To confirm the changes, I pushed a change to Github instead of through the Heroku Git and observed the changes to the site. 

Cleaning up the default page from earlier, I removed the frontend files and replaced with my own simple index.ejs. I also added my own routes, creating an express router and simply adding a couple of other routes. Using ejs, the html delivered to the client has a custom message displayed depending on the route. 

Lastly, I installed PostGres locally on my computer and then added PostGres to my Heroku project. The local installation had issues related to the environment variables in Windows, which I had to add manually for the PostGre program files folder. Then, when I got my database running, I could add a route that would return the results of an SQL query to verify the database connection. As the database is hosted on heroku, I had to add a database URL when there is no environment variable to get the database URL from when testing the application locally. 

Hover pictures for description:<br>
<img src="https://user-images.githubusercontent.com/79512058/161391868-2c0cc6fc-8392-4b47-9dda-de62c3bf4f8f.png" title="Lab 1 - Start page" width="40%">
<img src="https://user-images.githubusercontent.com/79512058/161391881-5c29631d-a033-4222-9d7d-72474a750086.png" title="Lab 1 - Route added to express" width="40%">
<img src="https://user-images.githubusercontent.com/79512058/161391886-e9f14aeb-bb32-4102-996b-318ea7ca018d.png" title="Lab 1 - Db route: SELECT * FROM test_table" width="40%">
<img src="https://user-images.githubusercontent.com/79512058/161421152-9e0aaf1d-d6e3-4e13-8b5b-7a64a75a9427.png" title="Lab 1 - Db: Access to the db hosted on Heroku" width="40%">

<h2>Instructions to run locally</h2>
<ol>
  <li>Run <strong>npm install</strong></li>
  <li>Run <strong>npm start</strong></li>
  <li>Connect to <strong>127.0.0.1:5000</strong> or <strong>127.0.0.1:5000/lab1</strong> or <strong>127.0.0.1:5000/db</strong></li>
</ol>

<h1># Lab 2 # </h1>
<p>
  <strong>Frontend calculator: </strong>https://cloud-lab1.herokuapp.com/lab2<br>
  <strong>Calc route: </strong>https://cloud-lab1.herokuapp.com/lab2/calc <br>
  <strong>Example calc request: </strong>https://cloud-lab1.herokuapp.com/lab2/calc?operation=mul&numberOne=3&numberTwo=2
</p>

<ol>
  <li>The frontend client (https://cloud-lab1.herokuapp.com/lab2) gathers the form input to use as parameters</li>
  <li>The frontend sends a GET request to the REST route (https://cloud-lab1.herokuapp.com/lab2/calc?operation=mul&numberOne=3&numberTwo=2)</li>
  <li>The REST api calls the backend lab2Calc.js with the parameters and receives a result from the backend</li>
  <li>The result (or error) is returned to the client and presented on the page</li>
</ol>

<img src="https://user-images.githubusercontent.com/79512058/161429946-480b5eff-55cb-4257-8abc-ddc25e75f754.png" title="Lab 2 - Frontend" width="40%"> <img src="https://user-images.githubusercontent.com/79512058/161429965-997aef4c-703a-4a5e-a3a8-fa4956d3d2aa.png" title="Lab 2 - REST call result, without using frontend" width="40%"> <img src="https://user-images.githubusercontent.com/79512058/161430009-70af4908-157a-48c8-8389-ea7dd099a974.png" title="Lab 2 - REST call with error from invalid parameter, without using frontend" width="40%">

<h2>Instructions to run locally</h2>
<ol>
  <li>Run <strong>npm install</strong></li>
  <li>Run <strong>npm start</strong></li>
  <li>Connect to <strong>127.0.0.1:5000/lab2</strong></li>
</ol>

<h1># Lab 3 # </h1>
<p>
  <strong>Word Length Frequency Calculator: </strong>https://cloud-lab1.herokuapp.com/lab3<br>
</p>

<p>First, I created additional routes necessary for lab 3: One POST route to receive a word string to count and one GET route to render the frontend client (webpage). I added backend logic called by the POST route, calculating the word length frequencies and returning a result string back to the router, which in turn will send it to the client. The frontend webpage is my client for this lab. A text area receives input from the user to send to submit to the server to the POST route. 
<br><br>
As an extra feature, I added the possibility to attach a text file, which the client will read and use to fill the text area. Additionally, I added token based (JWT) security. To acccess the /lab3/getWordLengthFrequency route, the user must now submit a valid access token. This is validated by an authentication middleware in the route. To get a valid access token, the user must use the /login route with a valid username and password. The frontend will display an error when the authentication has failed.</p>

Hover pictures for description:<br>
<img src="https://user-images.githubusercontent.com/79512058/162522449-a9cf1f9f-9b57-4dcd-95ca-6506bd2d465b.png" title="Lab 3 - Start page" width="40%">
<img src="https://user-images.githubusercontent.com/79512058/162522627-19b75672-b61b-4d38-9548-cbb7b0bdd66c.png" title="Lab 3 - On successful login, an access token and a refresh token is stored in the session" width="40%">
<img src="https://user-images.githubusercontent.com/79512058/162522782-68081d32-6933-45e6-99e7-e05fd1f27864.png" title="Lab 3 - Results in a table below after submitting a string of words" width="40%">
<img src="https://user-images.githubusercontent.com/79512058/162522985-6f195478-eec5-4c5e-b53f-886aa917943b.png" title="Lab 3 - Failure when attempting to submit without authentication" width="40%">

<h2>Instructions to run (not locally) </h2>
<p>This app should not be tested locally as it requires environment variables for JWT private keys</p>
<ol>
  <li>Connect to <strong>https://cloud-lab1.herokuapp.com/lab3</strong></li>
  <li>Login with username <strong>jo</strong> and password <strong>123</strong></li>
  <li>Upload a text file or enter words in text area</li>
  <li>Press <strong>submit</strong></li>
  <li>A table with the results will be generated below</li>
</ol>
