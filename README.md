
# Ticket Earner


## Program Description:
This program was created in light of recent issues with Ticketmaster for artists such as Zach Bryan and Taylor Swift going on tour. Simply put, resellers and bots are being blamed for the lack of access of tickets for the artists' true fans and exponentially driving up prices. This website is one version of a solution for this problem by requiring users to match a random Zach Bryan lyric to its corresponding song and album. If the user gets 60% or better, they are redirected to Zach Bryan's Ticketmaster page to be given the opportunity to purchase tickets. If not, they lose that opportunity.

![Screenshot of Landing Page](./client/src/imgs/first_page.png)
![Screenshot of Game Page](./client/src/imgs/second_page.png)
*Song dropdown list generated based on selected album*

## Technologies Used:
This program was developed using a React front-end with some components from [Ant Design](https://ant.design/) and [Material UI](https://mui.com/) and styled using [Sass](https://sass-lang.com/). It connects with a Node.js backend using the Express framework.

## How to Run:
**Important:** *You will need to create a developer account for Musixmatch to run this program.* 

To run this program, first clone the code onto your computer using git.

Next, `cd` into the `/server` folder and run `npm install` to install the packages for the backend.

Then, do `cd ../client` and run `npm install` to install the packages for the frontend.

Once all of the packages are installed, go into the `/server` folder and run `npm start` to begin the backend server. This is hosted on `localhost:3001`.

To launch the React App, go to the `/client` folder and run `npm start`. This should open up the React web app in your default browser once it boots up. It is hosted on `localhost:3000`.

In order for the program to work, you need access to musixmatch's API. To do so, go to [Musixmatch's developer portal](https://developer.musixmatch.com/) and create an account. Once you get an API Key, create a file called `.env` in `/server`. In this file put

    API_KEY: YOUR_API_KEY
    
After this is included, the backend will be able to access lyrics from musixmatch's API. 


  


##### Developer: Bobby Miller
##### Email: robert.p.miller@vanderbilt.edu