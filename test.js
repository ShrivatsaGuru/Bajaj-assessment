// Test script to verify API functionality
const testCases = [
    {
        name: "Example A",
        data: ["a", "1", "334", "4", "R", "$"]
    },
    {
        name: "Example B", 
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
    },
    {
        name: "Example C",
        data: ["A", "ABcD", "DOE"]
    }
];

async function testAPI() {
    const baseURL = 'http://localhost:3000';
    
    console.log('Testing API endpoints...\n');
    
    for (const testCase of testCases) {
        console.log(`--- ${testCase.name} ---`);
        console.log('Input:', JSON.stringify(testCase.data));
        
        try {
            const response = await fetch(`${baseURL}/bfhl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: testCase.data })
            });
            
            const result = await response.json();
            console.log('Response:', JSON.stringify(result, null, 2));
            console.log('\n');
            
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    // Add fetch polyfill for Node.js
    const fetch = require('node-fetch');
    global.fetch = fetch;
    
    testAPI().catch(console.error);
}

module.exports = { testAPI };