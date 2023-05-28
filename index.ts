/// <reference path="./custom-tampermonkey.d.ts" />

import { icons } from './json/icons';
import { file } from './rule/file';
import { folder } from './rule/folder';
import { language } from './rule/language';

import { fileEntity } from './rule/fileEntity';
import { folderEntity } from './rule/folderEntity';
import { languageEntity } from './rule/languageEntity';

console.log('%cgithub-colorful-icons%c1.3', 'padding: 3px; color: #fff; background: #00918a', 'padding: 3px; color: #fff; background: #002167');

const delay = 520;
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
                if (isDone <= 2 && document.querySelectorAll(".js-details-container.Details > div[role='grid'] > div[role='row'].Box-row div.flex-auto.min-width-0.d-none.d-md-block.col-5.mr-3 span").length !== 0) {
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
                    const extension = name.substring(name.indexOf('.') + 1);
                    const lastExtension = name.substring(name.lastIndexOf('.') + 1);

                    const fileFullName = (file as Array<fileEntity>).find(el => el.fileNames?.includes(name))?.name;
                    const fileExtension = (file as Array<fileEntity>).find(el => el.fileExtensions?.includes(extension))?.name;
                    const fileLanguageType = (language as Array<languageEntity>).find(el => el.extension?.includes(lastExtension))?.name;

                    const filename = fileFullName ?? fileExtension ?? fileLanguageType;

                    if (filename) {
                        const svg = (icons as any)[filename];
                        el.children[0].firstElementChild.innerHTML = svg;
                    }
                }
            }
        });
    }
    isDone++;
}

function debounce(func: Function, delay: number) {
    let timerId: any;
    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(() => func(), delay);
    };
}
