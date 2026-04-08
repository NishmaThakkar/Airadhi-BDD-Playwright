module.exports = {
  default: {
    require: [
      "tests/**/*.ts",
      "tests/hooks/**/*.ts"   
    ],
      strict: true, 
    paths: ["tests/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    format: [
      "progress",              
      "allure-cucumberjs/reporter"
    ],
     formatOptions: {
      resultsDir: 'allure-results'
    },

  }
};

