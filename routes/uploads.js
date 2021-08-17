import express from "express";
import multer from "multer";
import path from "path";
import Tesseract from "tesseract.js";
import fs from "fs";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const extractData = (text) => {
  const splits = text.split(/\r?\n/);
  const name = splits[0].split(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)[0];

  let amount = 0;

  for (let i = 0; i < splits.length; i++) {
    if (splits[i].search(new RegExp("Total", "i")) == 0) {
      amount = parseFloat(splits[i].replace(/[^\d.-]/g, ""));
    }
  }

  return {
    name,
    amount,
  };
};

router.post("/", upload.single("image"), async (req, res) => {
  const file = await fs.readFileSync(`./${req.file.path}`);
  let textData = "";

  await Tesseract.recognize(file, "eng").then(({ data: { text } }) => {
    textData = text;
  });

  const { name, amount } = extractData(textData);
  res.json({
    name,
    amount,
    type: "",
    image: `/${req.file.path}`,
  });
});

export default router;
