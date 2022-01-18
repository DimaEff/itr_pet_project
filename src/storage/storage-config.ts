import * as multerGoogleStorage from "multer-google-storage";
import {resolve} from 'path';


export const googleStorage = multerGoogleStorage.storageEngine({
    projectId: "int-map-334413",
    keyFilename: resolve(__dirname, 'int-map-334413-57e13c359441.json'),
    bucket: 'int-map-storage',
});