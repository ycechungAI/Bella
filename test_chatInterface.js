import fs from 'fs';

const code = fs.readFileSync('chatInterface.js', 'utf8').replace('export { ChatInterface };', '');
global.document = {
    createElement: () => ({
        style: {},
        classList: { add: () => {}, remove: () => {} },
        appendChild: () => {},
        querySelector: () => ({ addEventListener: () => {} }),
        addEventListener: () => {}
    }),
    body: { appendChild: () => {}, removeChild: () => {}, contains: () => false }
};
global.window = { getComputedStyle: () => ({ opacity: 1, transform: 'none' }) };

let Context = {};
eval(`
  ${code}
  Context.ChatInterface = ChatInterface;
`);

// Bypass constructor init logic for tests
const chat = Object.create(Context.ChatInterface.prototype);

console.log("Testing escapeHtml:");
console.log("null:", chat.escapeHtml(null) === '');
console.log("undefined:", chat.escapeHtml(undefined) === '');
console.log("0:", chat.escapeHtml(0) === '0');
console.log("object bypass:", chat.escapeHtml({ replace: () => '<script>alert(1)</script>' }) === '[object Object]');

console.log("\nTesting formatMessage:");
console.log("null:", chat.formatMessage(null) === '');
console.log("0:", chat.formatMessage(0) === '0');
console.log("object bypass:", chat.formatMessage({ replace: () => '<script>alert(1)</script>' }) === '[object Object]');
