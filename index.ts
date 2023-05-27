/// <reference path="./custom-tampermonkey.d.ts" />

import { icons } from './json/icons';
import { file } from './rule/file';
import { folder } from './rule/folder';
import { fileEntity } from './rule/fileEntity';
import { folderEntity } from './rule/folderEntity';

console.log('%cgithub-colorful-icons%c1.0', 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

const delay = 520;
const maxTimes = 21;
let times = 0;
let isDone = false;

if (window.onurlchange === null) {
    window.addEventListener('urlchange', _ => (isDone = false));
}

entry();

function entry(): void {
    const id = setInterval(() => {
        const container = document.body;
        times++;
        if (container) {
            clearInterval(id);
            parseElement();

            if (container) {
                const observer = new MutationObserver(_ => {
                    if (!isDone) parseElement();
                });
                observer.observe(container, {
                    attributes: false,
                    characterData: false,
                    childList: true,
                    subtree: true,
                });
            }
        } else if (times === maxTimes) {
            clearInterval(id);
        }
    }, delay);
}

function parseElement() {
    const elements = document.querySelectorAll(".js-details-container.Details > div[role='grid'] > div[role='row'].Box-row");
    if (elements.length) {
        elements.forEach(el => {
            if (el.children?.[0]?.firstElementChild?.getAttribute('aria-label') === 'Directory') {
                const name = el.children?.[1]?.firstElementChild?.textContent?.toLowerCase();
                if (name) {
                    const filename = (folder as Array<folderEntity>).find(el => el.folderNames.includes(name))?.name;
                    if (filename) {
                        const svg = (icons as any)[filename];
                        el.children[0].firstElementChild.innerHTML = svg;
                    }
                }
            } else if (el.children?.[0]?.firstElementChild?.getAttribute('aria-label') === 'File') {
                const name = el.children?.[1]?.firstElementChild?.textContent?.toLowerCase();
                if (name) {
                    const filenames = (file as Array<fileEntity>).find(el => el.fileNames?.includes(name))?.name;

                    const filename = filenames ?? (file as Array<fileEntity>).find(el => el.fileExtensions?.includes(name.substring(name.lastIndexOf('.'))) || el.fileExtensions?.includes(name.substring(name.indexOf('.') + 1)))?.name;

                    if (filename) {
                        const svg = (icons as any)[filename];
                        el.children[0].firstElementChild.innerHTML = svg;
                    }
                }
            }
        });
    }
    isDone = true;
}
