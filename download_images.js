//exporting code to d_a.js - avoiding callback hell
module.exports = {
  gitHubURL: function(url, path) {
    // docs used - https://www.npmjs.com/package/file-system
    const fs = require('fs');
    // docs used - https://www.npmjs.com/package/request
    const request = require('request');
    //creates github server communication for the client
    //docs used - https://developer.github.com/guides/getting-started/#authentication
    var options = {
      url: url,
      headers: {
    'User-Agent': process.env['USER'],
    'Authorization': 'token ' + process.env['GIT_API_TOKEN']
      },
    };
    //makes a path to the parent folder
    //extract the name of an absolute path -
    //docs used - http://stackoverflow.com/questions/10549504/obtain-name-from-absolute-path-substring-from-last-slash-java-android
    var pFolder = path.substr(0, path.lastIndexOf('/')+1);

    // syncs directory - Checks if there is a duplicate dir and uses it instead of creating a new one
    //docs used http://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist
    function mkDirSync(path) {
      try {
        fs.mkdirSync(path);
      } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
      }
    }

    // Create folder in parentdir if not present - https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_mode
    mkDirSync(pFolder);

    // checks what kind of image it is to decide on file naming - uses all major image types
    // docs used - https://www.npmjs.com/package/file-system
    var imgType = request(options).on('response', function (response) {
      var contentType = response.headers['content-type'];
      if (contentType === 'image/jpeg') {
        extension = '.jpg';
      } else if (contentType === 'image/png') {
        extension = '.png';
      } else if (contentType === 'image/gif') {
        extension ='.gif';
      } else if (contentType === 'image/bmp') {
        extension ='.bmp'
      }
      //docs used - https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
      //The pipe() function reads data from a readable stream as it becomes available and writes it to a destination writable stream.
      imgType.pipe(fs.createWriteStream(path + extension))
    });
  }
}
//connect with auth to GitHub
  //create directory for downloaded files
    //save images with apropriate extensions