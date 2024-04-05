const multer = require("multer");
const fs = require("fs");
const path = require("path");

/** Image upload using disk storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "image") {
      fs.mkdirSync(path.join(__dirname, "../public/images"), {
        recursive: true,
      });
      cb(null, path.join(__dirname, "../public/images"));
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const originalname = path.basename(file.originalname, ext);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      cb("Only .png, .jpg and .jpeg format are allowed!");
    }
    cb(null,originalname  + ext);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload };