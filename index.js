const esbuild = require("esbuild");
const fs = require("fs");

let a = fs.readFileSync("./index.html", {encoding: "utf8"});
let fsOptions = {encoding: "utf8"};

let readFile = (file)=>{
    let a = fs.readFileSync(file, fsOptions);
    let content = "";

    for(let i = 0; i < a.length; i++){
        if(a[i] === "<" && a.slice(i, i+13) === "<html-module>"){
            i += 13;
            let module = "";
            while(a[i] !== "<"){
                module += a[i];
                i++;
            }
            content += readFile(module);
            i += 14;
        }else{
            content += a[i];
        }
    }

    return content;
}

fs.writeFileSync("build.html", readFile("./index.html"));

module.exports = readFile;