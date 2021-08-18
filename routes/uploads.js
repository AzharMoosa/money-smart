import express from "express";
import multer from "multer";
import path from "path";
import Tesseract from "tesseract.js";
import colors from "colors";
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
  let name = "";

  for (let i = 0; i < splits.length; i++) {
    const line = splits[i].split(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)[0];
    if (line != "") {
      name = line;
      break;
    }
  }

  let amount = 0;

  for (let i = 0; i < splits.length; i++) {
    const line = splits[i];

    if (line.search(new RegExp("Total", "i")) >= 0) {
      amount = parseFloat(
        line.split(new RegExp("Total", "i"))[1].replace(/[^\d.-]/g, "")
      );
    }

    if (line.search(new RegExp("Subtotal", "i")) >= 0) {
      amount = parseFloat(
        line.split(new RegExp("Subtotal", "i"))[1].replace(/[^\d.-]/g, "")
      );
    }

    if (line.search(new RegExp("Balance", "i")) >= 0) {
      amount = parseFloat(
        line.split(new RegExp("Balance", "i"))[1].replace(/[^\d.-]/g, "")
      );
    }

    if (line.search(new RegExp("Sub-total", "i")) >= 0) {
      amount = parseFloat(
        line.split(new RegExp("Sub-total", "i"))[1].replace(/[^\d.-]/g, "")
      );
    }

    if (line.search(new RegExp("Amount", "i")) >= 0) {
      amount = parseFloat(
        line.split(new RegExp("Amount", "i"))[1].replace(/[^\d.-]/g, "")
      );
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
