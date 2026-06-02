import fs from 'fs';

const code = fs.readFileSync('chatInterface.js', 'utf8');
const evalCode = code.replace(/export \{ ChatInterface \};/, 'globalThis.ChatInterface = ChatInterface;');

globalThis.document = {
    createElement: () => ({
        className: '',
        innerHTML: '',
        querySelector: () => ({ addEventListener: () => {} }),
        classList: { add: () => {}, remove: () => {} },
        style: {},
        appendChild: () => {},
        focus: () => {},
        addEventListener: () => {}
    }),
    body: { appendChild: () => {} }
};
globalThis.window = {
    getComputedStyle: () => ({})
};

// Instead of creating a real instance which fails on DOM methods, let's just create an empty object and borrow the methods
eval(evalCode);
const chat = Object.create(globalThis.ChatInterface.prototype);

try {
    const maliciousObject = {
        replace: function() { return "<img src=x onerror=alert(1)>"; },
        toString: function() { return "malicious"; }
    };
    const result = chat.formatMessage(maliciousObject);
    console.log("Result for malicious object:", result);
    if (result.includes("<img")) {
        console.log("VULNERABLE!");
    } else {
        console.log("SAFE!");
    }
} catch (e) {
    console.log("Error:", e.message);
}

try {
    const result0 = chat.formatMessage(0);
    console.log("formatMessage(0):", result0 === '' ? "BUG: suppressed 0" : result0);
    const resultEscape0 = chat.escapeHtml(0);
    console.log("escapeHtml(0):", resultEscape0 === '' ? "BUG: suppressed 0" : resultEscape0);
} catch (e) {
    console.log("Error 0:", e.message);
}
