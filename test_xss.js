import { ChatInterface } from './chatInterface.js';

// Create a mock prototype to test methods without DOM dependencies
const chatInterface = Object.create(ChatInterface.prototype);

const tests = [
  { name: "Null", input: null, expected: "" },
  { name: "Undefined", input: undefined, expected: "" },
  { name: "Number 0", input: 0, expected: "0" },
  { name: "Object with custom replace", input: { replace: () => "<script>alert(1)</script>" }, expected: "[object Object]" },
  { name: "Object with custom toString", input: { toString: () => "<script>alert(1)</script>" }, expected: "&lt;script&gt;alert(1)&lt;/script&gt;" },
  { name: "Normal string", input: "<b>hello</b>", expected: "&lt;b&gt;hello&lt;/b&gt;" },
];

let allPassed = true;
for (const test of tests) {
  try {
    const result = chatInterface.formatMessage(test.input);
    if (result !== test.expected) {
      console.error(`FAILED ${test.name}: Expected '${test.expected}', got '${result}'`);
      allPassed = false;
    } else {
      console.log(`PASSED ${test.name}`);
    }
  } catch(e) {
     console.error(`FAILED ${test.name} with error:`, e);
     allPassed = false;
  }
}

if (allPassed) {
  console.log("All tests passed successfully.");
} else {
  process.exit(1);
}
