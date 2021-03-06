# Game of Life Client
This project is the client side of an application based on "Game of Life".<br />
The client is communicating with the server and is responsible for:
1. Allow the player<br />
    a. to select elements on the grid (aka “the initial state”)<br />
    b. to press “Next” Which update the state of life once<br />
    c. to press the “Reset” button, unsetting the initial state (only when the game is stopped)<br />
    d. to press the “Start” / “Stop” button (once the initial state is selected / once the same is started, respectively). Once started, the game will continue until there is no life left (or the “Stop” button is pressed)<br />
2. Show a number of generations (steps) of life
3. Show a popup when all the life is dead

# General Architecture of the application
The main technologies that were used are:<br />
Typescript<br />
React.js<br />
create react app<br />
Axios<br />
webpack

Using React Context API for board state management.<br />
Using React Query for sending requests to the server (wrapping axios).

The src folder is containing the main files of the application, a folder for each logic component and folder "Components" for generic components.
The Api.ts file is containing all the axios requests functions.
The messages.ts file is containing all the types that are defined in the server and are transferred through the requests. It must be synced with the server's file.

Index is rendering the App which is wrapping GameOfLife with React Query and the Board Context providers. GameOfLife is responsible for fetching the board from the server and displaying loading or error messages or the board / empty board on success according to the state.

# The Reasoning behing the main technical choices
I decided to use "create-react-app" for quick setup of the React application.<br />
I decided to use "axios" becuase it makes clean code for the requests to the server.<br />
I decided to use "webpack" in order to fix compiling and running errors.

# Things that wasn't implemented or trade-offs
Using typescript with react resulted compiling issues that were fixed by using webpack.<br />
Logic in some components is not fully separated due to lack of time since I spend most of it setting up the environment (for example I wanted to create an Actions component to render the buttons in Board and EmptyBoard).

If I could spend more time on the assignment, I would:
1. Create a more sophisticated and prettier UI.<br />
    a. Allow the player to use the /random endpoint for setting a random board state.<br />
    b. Add more colors and styling with CSS.<br />
    c. Add an option to toggle dark theme with React Context.<br />
    d. Allow the player to controll the speed of the run (with useState and setTimeout).<br />
2. Make more small components to separate logic and clean the code.
3. Deploy the app and implement production mode.

# Run project locally instructions
1. Clone the project
2. Inside the project folder Run:<br />
    a. "npm i"<br />
    b. "npm run dev"
