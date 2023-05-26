/// <reference path="./custom-tampermonkey.d.ts" />

import * as icons from './json/icons.json';

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
    // const elements = document.querySelectorAll(".js-details-container.Details > div[role='grid'] > div[role='row'].Box-row");
    // if (elements.length) {
    //     elements.forEach(el => {
    //         el.children?.[0]?.firstElementChild?.getAttribute('aria-label');
    //         el.children?.[1]?.firstElementChild?.getAttribute('aria-label');
    //     });
    // }
}
