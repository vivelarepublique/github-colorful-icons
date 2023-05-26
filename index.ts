/// <reference path="./custom-tampermonkey.d.ts" />

import { icons } from './json/icons';
import { file } from './rule/file';
import { folder } from './rule/folder';
import { fileEntity } from './rule/fileEntity';
import { folderEntity } from './rule/folderEntity';

console.log('%cgithub-colorful-icons%c1.0', 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

const delay = 520;
const maxTimes = 210;
let times = 0;

entry();

function entry(): void {
    const id = setInterval(() => {
        const container = document.querySelector('#repo-content-turbo-frame');
        times++;
        if (container) {
            clearInterval(id);
            parseElement();

            if (container) {
                const observer = new MutationObserver(() => parseElement());
                observer.observe(container, {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: false,
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
                const name = el.children?.[1]?.firstElementChild?.textContent;
                if (name) {
                    const filename = (folder as Array<folderEntity>).find(el => el.folderNames.includes(name))?.name;
                    if (filename) {
                        const svg = (icons as any)[filename];
                        el.children[0].firstElementChild.innerHTML = svg;
                    }
                }
            } else if (el.children?.[0]?.firstElementChild?.getAttribute('aria-label') === 'File') {
                const name = el.children?.[1]?.firstElementChild?.textContent;
                if (name) {
                    const filename = (file as Array<fileEntity>).find(el => el.fileNames?.includes(name) || el.fileNames?.includes(name.substring(name.lastIndexOf('.'))))?.name;
                    if (filename) {
                        const svg = (icons as any)[filename];
                        el.children[0].firstElementChild.innerHTML = svg;
                    }
                }
            }
        });
    }
}
