const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

let fsOptions = {encoding: "utf8"};

let readFile = (file, prevLoc = "")=>{
    let newLoc = path.join(prevLoc, path.dirname(file));
    let a = fs.readFileSync(path.join(newLoc, path.basename(file)), fsOptions);
    let content = "";

    for(let i = 0; i < a.length; i++){
        if(a[i] === "<"){
            if(a.slice(i, i+13) === "<html-module>"){
                i += 13;
                let module = "";
                while(a[i] !== "<"){
                    module += a[i];
                    i++;
                }
                content += readFile(module, newLoc);
                i += 14;
            }else if(a.slice(i, i+15) === "<script-module>"){
                i += 15;
                let module = "";
                while(a[i] !== "<"){
                    module += a[i];
                    i++;
                }
                esbuild.buildSync({
                    entryPoints: [path.join(newLoc, module)],
                    bundle: true,
                    outfile: "./dist/temp.js"
                });
                let js = fs.readFileSync("./dist/temp.js", fsOptions);
                content += `<script>${js}</script>`;
                i += 16;
                fs.unlink("./dist/temp.js", (err)=>{if(err) console.error(err)});
            }else{
                content += a[i];
            }
        }else{
            content += a[i];
        }
    }

    return content;
}

fs.writeFileSync("./dist/build.html", readFile("./testFiles/index.html"));

module.exports = readFile;