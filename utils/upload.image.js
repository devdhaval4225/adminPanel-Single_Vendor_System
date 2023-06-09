 const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(":::::!#$%^%%#@!#$%^$#@!#$%::::", file);
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        console.log(":::::::::::::::", file);
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let opopop = "";
        for (let i = 1; i <= 6; i++) {
            const nCode = Math.floor(Math.random() * chars.length);
            opopop += chars[nCode];
        }

        cb(null, Date.now() + '-' + opopop + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("::UPLOAD-MULTER_FILE::", file);
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/apng" || file.mimetype == "image/avif" || file.mimetype == "image/gif" || file.mimetype == "image/svg+xml" || file.mimetype == "image/webp" || file.mimetype == "application/octet-stream") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Not all photo formats are allowed'));
        }
    }
});




module.exports = upload;