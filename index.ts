/// <reference path="./custom-tampermonkey.d.ts" />

import { icons } from './json/icons';
import { file } from './rule/file';
import { folder } from './rule/folder';
import { language } from './rule/language';

import { fileEntity } from './rule/fileEntity';
import { folderEntity } from './rule/folderEntity';
import { languageEntity } from './rule/languageEntity';

console.log('%cgithub-colorful-icons%c1.4', 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

const delay = 500;
const maxTimes = 21;
let times = 0;
let isDone = 0;

if (window.onurlchange === null) {
    window.addEventListener('urlchange', _ => (isDone = 0));
}

entry();
const debouncedPareElement = debounce(parseElement, delay);

function entry(): void {
    const id = setInterval(() => {
        const container = document.body;
        times++;
        if (container) {
            clearInterval(id);

            const observer = new MutationObserver(_ => {
                if (isDone <= 2 && document.querySelectorAll('header.Header-old.header-logged-out.js-details-container').length !== 0) {
                    debouncedPareElement();
                }
            });

            observer.observe(container, {
                attributes: false,
                characterData: false,
                childList: true,
                subtree: true,
            });
        } else if (times === maxTimes) {
            clearInterval(id);
        }
    }, delay);
}

function parseElement() {
    const svgsElements = document.querySelectorAll('div.react-directory-filename-column');
    const namesElements = document.querySelectorAll('div.react-directory-truncate');

    const types = Array.from(svgsElements).map(el => {
        const classes = Array.from(el.firstElementChild?.classList || []);
        return classes.includes('icon-directory');
    });
    const names = Array.from(namesElements).map(el => el.firstElementChild?.textContent?.toLowerCase() || '');

    console.log(types, names);

    svgsElements.forEach((el, index) => {
        if (types[index]) {
            const filename = (folder as Array<folderEntity>).find(el => el.folderNames.includes(names[index]))?.name;
            if (filename && el.firstElementChild) {
                const svg = (icons as any)[filename];
                el.firstElementChild.innerHTML = svg;
            }
        } else {
            const extension = names[index].substring(names[index].indexOf('.') + 1);
            const lastExtension = names[index].substring(names[index].lastIndexOf('.') + 1);

            const fileFullName = (file as Array<fileEntity>).find(el => el.fileNames?.includes(names[index]))?.name;
            const fileExtension = (file as Array<fileEntity>).find(el => el.fileExtensions?.includes(extension))?.name;
            const fileLanguageType = (language as Array<languageEntity>).find(el => el.extension?.includes(lastExtension))?.name;

            const filename = fileFullName ?? fileExtension ?? fileLanguageType;

            if (filename && el.firstElementChild) {
                const svg = (icons as any)[filename];
                el.firstElementChild.innerHTML = svg;
            }
        }
    });

    isDone++;
}

function debounce(func: Function, delay: number) {
    let timerId: any;
    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(() => func(), delay);
    };
}
