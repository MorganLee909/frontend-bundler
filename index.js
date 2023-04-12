const fs = require("fs");

const bundle = require("./bundler");

module.exports = (options)=>{
    for(let i = 0; i < options.bundles.length; i++){
        fs.writeFileSync(`./dist/${options.bundles[i].outputName}.html`, bundle(options.bundles[i].input));
    }
};