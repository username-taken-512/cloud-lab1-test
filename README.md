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
