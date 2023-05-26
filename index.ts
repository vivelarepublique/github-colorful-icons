import { readdir } from 'fs';
import { promisify } from 'util';

const readdirPromise = promisify(readdir);

console.log(typeof readdirPromise);
