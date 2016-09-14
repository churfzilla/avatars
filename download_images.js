module.exports = {
  gitHubURL: function(url, path) {
    const fs = require('fs');
    const request = require('request');
    //Authenticates user with github using the user token
    var options = {
      url: url,
      headers: {
    'User-Agent': process.env['USER'],
    'Authorization': 'token ' + process.env['GIT_API_TOKEN']
      },
    };
    //makes a path to the parent folder
    var pFolder = path.substr(0, path.lastIndexOf('/')+1);
    // syncs directory - Checks if there is a duplicate dir and uses it instead of creating a new one
    function mkDirSync(path) {
      try {
        fs.mkdirSync(path);
      } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
      }
    }
    // Create folder in parentdir if not present
    mkDirSync(pFolder);
    // checks what kind of image it is to decide on file naming - uses all major image types
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
      //The pipe() function reads data from a readable stream as it becomes available and writes it to a destination writable stream.
      imgType.pipe(fs.createWriteStream(path + extension))
    });
  }
}
    //docs used for API Auth - https://developer.github.com/guides/getting-started/#authentication
// docs used for npm fs - https://www.npmjs.com/package/file-system
// docs used npm request - https://www.npmjs.com/package/request
// docs used for creating file paths - https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
      //docs used - http://stackoverflow.com/questions/10549504/obtain-name-from-absolute-path-substring-from-last-slash-java-android
      //docs used for write streams - https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
      //docs mkdirsync - https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_mode
      //docs used http://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist
