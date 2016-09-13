module.exports = {
  get: function(repoOwner, repoName, callBack) {
    this.connectToGit('repos/' + repoOwner + '/' + repoName + '/contributors', callBack);
  },
  connectToGit: function(path, callBack) {
    const request = require('request');
    var gitLogIn = {
      url: 'https://api.github.com/' + path,
      headers: {
        'User-Agent': process.env.USER,
        'Authorization': 'token ' + process.env.GIT_API_TOKEN
      },
      json: true
    };
    request(gitLogIn, callBack);
  },
  // gets the avatar info and logs how many user avatars were saved - Requires download_images.js to function
  downloadAvatars: function(err, contributors, html) {
    const downloadImage = require('./download_images.js');
    if (err) {
      console.log(err)
    } else if (contributors.statusCode === 404) {
      console.log("404 - REPO NOT FOUND");
      process.exit();
    } else {
      console.log('Downloading ' + html.length + ' contributor avatars.');
      //loop through the user content for the avatars - creates an avatar folder and names the avatars by user name
       for (contributor in html) {
        var contributorCalled = html[contributor];
        downloadImage.gitHubURL(contributorCalled.avatar_url, './avatars/' + contributorCalled.login);
      }
    }
  }
}
