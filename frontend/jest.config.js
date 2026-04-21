// Jest configuration for the frontend using ts-jest with jsdom environment, CSS module mocking, and custom TypeScript transform settings.
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { 
        tsconfig: {
            jsx: 'react-jsx',
            isolatedModules: true,
            module: 'esnext',
            moduleResolution: 'node',
            ignoreDeprecations: '6.0'
        },
        diagnostics: {
            ignoreCodes: [151001, 1295, 17004]
        }
    }],
  },
};
