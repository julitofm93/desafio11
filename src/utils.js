import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';

//__dirname
const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
export default __dirname;

//BCRYPT
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);