const banner = `
// ==UserScript==
// @name         github colorful icons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       vivelarepublique
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        window.onurlchange
// @run-at       document-idle
// ==/UserScript==
`;

const scriptFilename = `github-colorful-icons.user.js`;
module.exports = {
    banner,
    scriptFilename,
};
