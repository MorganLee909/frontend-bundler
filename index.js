const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

let fsOptions = {encoding: "utf8"};

let readFile = (file, prevLoc = "")=>{
    let newLoc = path.join(prevLoc, path.dirname(file));
    let a = fs.readFileSync(path.join(newLoc, path.basename(file)), fsOptions);
    let content = "";

    for(let i = 0; i < a.length; i++){
        if(a[i] === "<" && a.slice(i, i+13) === "<html-module>"){
            i += 13;
            let module = "";
            while(a[i] !== "<"){
                module += a[i];
                i++;
            }
            content += readFile(module, newLoc);
            i += 14;
        }else{
            content += a[i];
        }
    }

    return content;
}

fs.writeFileSync("./dist/build.html", readFile("./testFiles/index.html"));

module.exports = readFile;