import { ChatInterface } from './chatInterface.js';

// Since ChatInterface touches the DOM in constructor, we will just instantiate an object with the prototype to test its methods
const chat = Object.create(ChatInterface.prototype);

const payload = {
    replace: () => "<script>alert(1)</script>"
};

try {
    const result1 = chat.escapeHtml(payload);
    console.log("escapeHtml with payload:", result1);

    const result2 = chat.escapeHtml(0);
    console.log("escapeHtml with 0:", result2);

    const result3 = chat.formatMessage(payload);
    console.log("formatMessage with payload:", result3);

    const result4 = chat.formatMessage(0);
    console.log("formatMessage with 0:", result4);
} catch(e) {
    console.error("Error:", e);
}
