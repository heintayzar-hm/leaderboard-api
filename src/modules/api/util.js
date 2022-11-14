/* eslint-disable import/prefer-default-export */
const encodeHTMLEntities = (rawStr) => rawStr.replace(/[\u00A0-\u9999<>&]/g, ((i) => `&#${i.charCodeAt(0)};`));
const onlySpaces = (str) => str.trim().length === 0;
export { encodeHTMLEntities, onlySpaces };