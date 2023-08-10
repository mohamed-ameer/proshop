import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();
//before we even create our routes, we need to describe where we want our image to go, which storage we want to use.
//we can store our image in our disktop on the server OR we can store it on cloud server like amazon bucket.
//in this app we will store our static data in diskStorage on our server.
const storage = multer.diskStorage({
  destination(req, file, cb) {//this will describe where we want to save this static data
    cb(null, 'uploads/');//cb is the callback that we want to call within here
  },
  filename(req, file, cb) {//this will describe how we want our file names to be formatted.
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
});
//[upload.single('image')] we're using single because we only want to allow a single file.You can upload multiple files as an array.It's a little more advanced, but you can do that.
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded successfully',
    image: `/${req.file.path}`,
  });
});

export default router;