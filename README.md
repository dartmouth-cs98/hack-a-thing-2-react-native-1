### Commit 1: This is the initial commit for the react-native demo using the expo managed workflow. I just changed the introductory message to say "Hello, World!" and got it working on my iPhone. 

### Commit 2: Save work
### Commit 3: This commit reflects most of the work I have done. Everything seems to be working and I have gone through the possible edge cases/behvaiors that I am used to. 
### Commit 4: Demo Images (see SignUpError.jpg, UserPage.jpg, and LoginPage.jpg)

### What I attempted to build
* Overall the purpose of this project was for me to get familiar with react-native and the tenets of mobile development, as well as take a first pass at some features we might want in our roommate app. I learned some basic javascript/react concepts for my first hackathing, and I recycled some of the same knowledge/frameworks I learned there to help me complete this hackathing. The general application is another full-stack app in react native that goes through the basic registration and login processes common to any app that needs to remember stuff from users. It has a sample login screen with username/password submissions, which will go through the normal behaviors you'd expect (wrong password, etc). If login is succesfull, it will bring the user to a new welcome page with a bit of information stored from a database page (similar to my first hackathing). In this case, the result is whether the user thinks the heat or lakers will win the nba finals. There is also a sign up page that has the typical username password confirm-password setup and the normal behavior (e.g. user exists, passwords don't match). The backend/db setup is almost identical to my first hackathing. I used express for the backend and recycled my MongoDB cloud db to store the information about users. I didn't follow a specific tutorial for how to do login/auth with react native, so I'm guessing a lot of the ways I do things are kinda hacky/not best practices. 
* Front-end was bootstrapped with `expo init`, backend was bootstraped in `./backend` with `npx express-generator`
* Most (I think all?) front-end changes are in `./App.js`, and most non-tutorial backend changes are in `./backend/routes/authBackend.js` (the route is added to `./backend/app.js` along with some other tutorial-driven changes like CORS). 

### Who Did What
* Worked alone 

### What you learned 
* I learned a lot about react-native and expo, both of which are awesome. I was really surprised at how easy it was for me to transition to mobile app development with expo, as I didn't even need to install any new dev environments (just VS code and npm). I learned the basics of navigation and got a little better at CSS/styling (though I still have a long ways to go)--through things like styling the text/text fields and putting some funny pictures in the app. 
* I spent some time researching backends for mobile, which isn't necessarily reflected in the code. I looked into firebase but I have a preference for open source stuff like express, so I ended up trying to make express work, which I was able to do eventually. The key was that using expo I could deploy the app to my iPhone over wifi, but then `localhost` wasn't my laptop (where the backend ran), it was my phone. After a while (and some google searching) I found out that it works if you find the IP address for your laptop on the local wifi network. That was really cool because it means I can deploy a simulated app to my whole house (roommates included) over my LAN. The database worked like normal because I have no authentication and it lives in the cloud. 

### How does this hack-a-thing inspire you or relate to possible project ideas?
* We know we want to do a mobile app, and I think this technology is the way to go, for a couple reasons: 
    * No native code (some of us have macs and some have pc's, and expo makes the code independent of that)
    * Really slick for deployment and testing (LAN backend)
    * Real time updates to my roommates phones!
    * The expo managed workflow has some limitations, but I don't think we will be hindered by them
* The actual login/signup workflow I prototyped here will be used in our app for sure, even if the implementation details change (I am sure there are all sorts of security/other flaws with my novice implementation)

### What didn't work
* I still struggle a good amount with CSS and styling, mostly using defaults and a few basic attributes I see in tutorials/docs. I had particular trouble getting the Picker/combobox to format correctly and look decent. I will be learning more about this for sure.
* Some js concepts are still a little challenging for me, especially in a full-stack context, particularly the asychronous stuff. The frontend talks to the backend with the fetch API, which uses some async functionality. I mostly just follow the format of the first demo fetch use I found in the docs in hackathing 1, even though there is probably a better way. On the backend side, I had even more trouble. For example, I wanted to have one POST check if a user exists, and if not, have the backend insert the user info into the db. However, I couldn't get two calls to the MongoDB api work in one backend code block, which I think is because the way the functions get called with the async nature of the DB requests. I ended up just doing two separate routes for checking the user existence and inserting, but I definitely want to get better with my understanding of how async things and networking requests to backends/dbs work in js. 

### Tutorials
* I didn't use a tutorial for the overall login setup, and I mostly used the actual react-native docs for information, but I did find some helpful pages and I revisited the backend page for my first project. 
* For navigation, I mostly followed the usage in the react-native navigation docs: https://reactnavigation.org/docs/navigating
* The backend tutorial I used is here: https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
* The solution to my localhost express problem was here: https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app
* This is how I learned to create the initial frontend (the section on expo): https://reactnative.dev/docs/environment-setup
* Basic react-native component learnings from: https://reactnative.dev/docs/components-and-apis#basic-components
* Other nits and references can be found in the code

### How to run: 
* (Maybe also need expo installed?)
* You'll need to `npm install` in both the main directory and in the backend folder
* Change the local IP const in ./App.js to your local IP
* `npm start` in this dir and in ./backend/*
* Install expo on your phone or try an emulator (I haven't tried that), then read the QR code
* Enjoy! (The backend should be able to connect to the db from anywhere using the password in the backend code). 