module.exports = {
  preset: 'ts-jest/presets/js-with-ts', 
  transform: {
    '^.+\\.tsx?$': 'ts-jest',          
    '^.+\\.jsx?$': 'babel-jest',       
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(axios)/)' 
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
