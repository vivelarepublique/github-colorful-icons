import { readdir, readFile, writeFile } from 'fs';
import { promisify, inspect } from 'util';
import { join } from 'path';

const readdirPromise = promisify(readdir);
const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

async function loadIcons(): Promise<object> {
    const folderPath = './icons';
    const files = await readdirPromise(folderPath);
    const svgs: string[] = [];
    for (let i = 0; i < files.length; i++) {
        const result = await readFilePromise(`${folderPath}/${files[i]}`, { encoding: 'utf-8' });
        svgs.push(result);
    }
    return files.reduce((acc, cur, index) => {
        const key = cur.substring(0, cur.lastIndexOf('.'));
        const value = svgs[index];
        Object.assign(acc, {
            [key]: value,
        });
        return acc;
    }, {});
}

async function writeIconsObject() {
    const obj = await loadIcons();
    const objString = inspect(obj, { depth: null, maxStringLength: Infinity });

    writeFilePromise(join('json/', 'icons.ts'), 'export const icons = '+objString);
}

writeIconsObject();
