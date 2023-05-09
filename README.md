# Flipbook
## Contributors
Developed by `lukegriley`, `bmaizes`, `oanders6`, `a0ng`, `dylansaunders23`

Github Repo: https://github.com/cs0320-s2023/final-project-flipbook

## Project Description
Project spec: https://docs.google.com/document/d/1Xc5Jg6texvkdbBEIs02idzjTLh9GLVPpc13pwhFhpEE/edit?usp=sharing


## Design Choices
**Frontend:** Our frontend was built using Typescript and React. Flipbook, our main component generates a FrameInterface consisting of a Google Slides-style UI of thumbnails for each frame, along with a main display for the currently selected frame. We heavily relied on React state variables to keep track of drawing data across all components and update them accordingly. This consisted of a large frameArray data structure containing a list of our own FrameData objects, which could be passed into Thumbnail and Whiteboard components.
 * Drawing functionality: We decided to use Javascript's CanvasRenderingContext2D object to draw on HTML canvas. The logic for this utilized React state variables, Typescript functions, and HTML input events. For color picking, we decided to use a third party component to allow users to select from a full range of colors
 * Drawing data: Despite being a visual tool, we decided to store our drawing data not as images, but in a numerical interface that we called Actions. Almost whenever we needed to replicate an image, we would simply pass these Actions to a function to be drawn on a canvas. This greatly reduced the size of our data, along with allowing for a more dynamic drawing functionality such as undo. 
 * Tracing functionality: Key to animation is the ability to replicate the previous frame with only minor, gradual changes to specific objects. Our application allows for the previous frame to be displaced at low opacity for the user to trace. Images can also be uploaded via URL to be traced. 
 **Backend:** Our backend relies on MongoDB to store our drawing data. As mentioned above, our numerical representation of drawing data greatly minimizes the size of each frame. Along with MongoDB, our app requires a express.js server to be run locally along with the frontend application to act as an intermediary between our Typescript based application and mongoose-based backend. While we do see this as a pitfall for what could have been a seamless front/backend user experience, the clash between our Typescript data and mongoose data models created unforeseen complications. 
 * Data transfer: We convert our drawing data, stored as FrameActionData (FrameData without any ImageData) to a json that is then sent to our express.js API server on the /data endpoint. This is then passed via mongoose to MongoDB.  
 * Data retrieval: If a pid is passed to the frontend url, our API server will search for the corresponding pid in the MongoDB database and load the project data into our frontend.


## File Architecture (contained in /src)
  * `Server` contains the backend functionality for saving animation projects to a MongoDB database
    * `mocks` contains mocked FrameData, and User data for testing and early backend development
    * `index.js` runs the express.js server locally on port :3001. **Although data is ultimately stored on MongoDB, this local server must also be run during use.**
  * `Frontend` 
           
## Tests
* `backend`
    * `unitTesting` tests the various commands accessed through qHandle, both individually, and in set sequences to ensure that state works properly
    * `fuzzTesting` generate random API calls roughly in the form expected by the backend and tests for non-200 result codes to ensure that all errors are handled properly by the API.


## API Endpoints
* `data` the only api endpoint - for data transfer between client and server
    * `pid`: a parameter representing a string of random digits, associated with the current project. To access a project already present in the database, the user must simply pass the associated pid in the url. If no pid is given, a blank project template is given and a new pid will be generated upon saving.
## Errors and Bugs
TODO

## Accessibility Considerations


## Running the Program
• `Frontend:` under the root directory, run **npm start**
• `Backend:` under the src/Server directory, in a separate terminal, run **node index.js**