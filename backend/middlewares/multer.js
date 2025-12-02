import multer from 'multer'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, uploadDir)
    },
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload