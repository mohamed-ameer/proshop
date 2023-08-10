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

function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
}
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');
//[upload.single('image')] we're using single because we only want to allow a single file.You can upload multiple files as an array.It's a little more advanced, but you can do that.
router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
      if (err) {
        res.status(400).send({ message: err.message });
      }
  
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    });
});

export default router;