import * as multerGoogleStorage from "multer-google-storage";
import * as uuid from 'uuid';
import {extname, resolve} from 'path';


export const googleStorage = multerGoogleStorage.storageEngine({
    projectId: "int-map-334413",
    keyFilename: 'src/google-files/int-map-334413-57e13c359441.json',
    bucket: 'int-map-storage',
    filename: (req, file, cb) => {
        console.log(file)
        const fileExt = extname(file.originalname);
        cb(null, `${uuid.v4()}${fileExt}`);
    },
});