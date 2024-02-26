const compiler = require("handlebars");

const fs = require("fs-extra");

compiler.registerHelper("root", function () {
  return "{{root}}";
});
compiler.registerHelper("equals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
compiler.registerHelper("object", function ({ hash }) {
  return hash;
});
compiler.registerHelper("array", function () {
  return Array.from(arguments).slice(0, arguments.length - 1);
});

fs.readdirSync("src/partials").forEach((dir) => {
  fs.readdirSync(`src/partials/${dir}`).forEach((partial) => {
    compiler.registerPartial(`${dir}/${partial.replace(".html", "")}`, fs.readFileSync(`src/partials/${dir}/${partial}`, "utf8").toString());
  });
});

async function defaultParams() {
  return {};
}

module.exports = async function (req, res, file) {
  return compiler.compile(fs.readFileSync(`src/html/${file}.html`, "utf8").toString())(fs.existsSync(`src/middleware/${file}.js`) ? { ...(await require(`../../../src/middleware/${file}.js`)(req, res)), ...(await defaultParams()) } : await defaultParams());
};
