const multer=require("multer");
const path = require("path");

//configur storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

//file filter
const fileFilter=(req,file,cb)=>{
    const allowedTypes=["image/jpeg","image/png","image/jpg"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("File type not allowed. Only jpg,jpeg,png formats allowed"),false);
    }
};

const upload=multer({storage,fileFilter});

module.exports=upload;
