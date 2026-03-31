module.exports = {
  default: {
    require: ["tests/bdd/step-definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["allure-cucumberjs/reporter"]
  }
};