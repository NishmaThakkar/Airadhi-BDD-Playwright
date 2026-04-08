module.exports = {
  default: {
    require: [
      "tests/bdd/**/*.ts",
      "tests/bdd/hooks/**/*.ts"   
    ],
      strict: true, 
    paths: ["tests/bdd/features/**/*.feature"],
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

