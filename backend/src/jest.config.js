
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript
    testEnvironment: 'node', // Set the test environment to Node.js
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore these paths
    moduleFileExtensions: ['js', 'json', 'ts'], // Specify file extensions
    transform: {
        '^.+\\.(ts)$': 'ts-jest', // Transform TypeScript files
    },
    collectCoverage: true, // Enable coverage collection
    coverageDirectory: 'coverage', // Output directory for coverage reports
    coverageProvider: 'v8', // Use v8 for coverage collection
};