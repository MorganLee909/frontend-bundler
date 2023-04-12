const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

let fsOptions = {encoding: "utf8"};

let bundle = (file, prevLoc = "")=>{
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
                content += bundle(module, newLoc);
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
            }else if(a.slice(i, i+12) === "<css-module>"){
                i += 12;
                let module = "";
                while(a[i] !== "<"){
                    module += a[i];
                    i++;
                }
                esbuild.buildSync({
                    entryPoints: [path.join(newLoc, module)],
                    bundle: true,
                    outfile: "./dist/temp.css"
                });
                let css = fs.readFileSync("./dist/temp.css", fsOptions);
                content += `<style>${css}</style>`;
                i += 13;
                fs.unlink("./dist/temp.css", (err)=>{if(err) console.error(err)});
            }else{
                content += a[i];
            }
        }else{
            content += a[i];
        }
    }

    return content;
}

module.exports = bundle;