//requires contributors.js to function
const contributors = require('./contributors.js');
//uses the npm dotenv - https://www.npmjs.com/package/dotenv
require('dotenv').config();
// Takes the argv[2] as the user input and the argv[3] as the repo input
function getUserInput() {
  const userInput = process.argv;
  return { user: userInput[2], repo: userInput[3]};
}
//simplfiying the function
var userInput = getUserInput();

//runs the function of the script in node
contributors.get(userInput.user, userInput.repo, contributors.downloadAvatars);

//Log into Git with correct user/token
//check git users in repo - loop through all contributors
  //find avatar_urls
    //determine files and save correct types to /Avatars folder
