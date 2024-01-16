const multer = require("multer");
const path = require("path");
const parseError = (err) => {
    return err.errors.map(e => ({
        [e.path]: replaceField(e)
    })).reduce((p,c)=> Object.assign(p,c), {});
}

const replaceField = (err => {
    return  err.path+ " " + err.message.split(" ").slice(1).join(" ");
})

const convertpath = (path) => {
    return  "http://localhost:3000/" +  path.split("\\").join("/");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      // Use the original file name, but change the extension to match the file's mimetype
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, name + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const uploader = multer({ storage: storage });

module.exports = {parseError, uploader, convertpath};