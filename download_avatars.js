const contributors = require('./contributors.js');
require('dotenv').config();
//Checks if the user correctly set the user and token in their .env file
if (process.env.USER === undefined || process.env.GIT_API_TOKEN === undefined) {
  console.log('GitHub API user and token not defined. (AGENT, GIT_API_TOKEN). Enter correct User and Token in .env file');
  console.log('Refer to README.txt file - Exiting.');
  process.exit();
}
// Takes the argv[2] as the user input and the argv[3] as the repo input
function getUserInput() {
  const userInput = process.argv;
  var err = '';
// handeling errors with switch and case
  switch (userInput.length) {
    case 4: return { user: userInput[2], repo: userInput[3]};
    break;
    default: err = 'Unknown user input - ';
  }
  console.log(err,'Please provide *ONLY* a username and repository:');
  console.log('node download_avatars.js <userName> <repositoryName>');
  process.exit();
}
//simplfiying the function
var userInput = getUserInput()
//runs the function of the script in node
contributors.get(userInput.user, userInput.repo, contributors.downloadAvatars);


// Error handling docs - http://benno.id.au/blog/2011/08/08/nodejs-exceptions
// docs used - https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch
// uses the npm dotenv - https://www.npmjs.com/package/dotenv