const path = require("path");
const fs = require("fs");
const glob = require("glob");
const makeDir = require("make-dir");
const rimraf = require("rimraf");

// TODO PARAMS Passer en paramètres
const appRootPath = path.join(__dirname, "..");

const appPublicPath = path.join(appRootPath, "app", "public");
const outputPath = path.join(appPublicPath, "utac");

// Reset output directory
console.log("Reset output directory");

rimraf.sync(outputPath);
makeDir.sync(outputPath);

// Build and move bundle in public folder
console.log("Build and move bundle in public folder");

const bundleFile = "bundle.js";
const entryPoint = path.join(__dirname, "enable.js");
try {
  require("esbuild").buildSync({
    entryPoints: [entryPoint],
    bundle: true,
    // TODO QUESTION minifier ou pas ?
    // TODO! BUG quand on minifie, ca plante ligne https://github.com/mde/ejs/blob/main/lib/utils.js#L98
    // avec l'erreur qs is not defined (qs est un nom généré donc peut varier)
    // a priori ce serait du au fait que MATCH_HTML et encode_char n'est pas embarqué par esbuild ?
    // Cette issue a l'air liée, et pourrait aider a faire un mini cas reproductible : https://github.com/mde/ejs/issues/229
    minify: false,
    sourcemap: true,
    outfile: path.join(outputPath, bundleFile),
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}

// Move serviceworker in public folder
console.log("Move serviceworker in public folder");

const serviceWorkerFile = "serviceworker.js";
fs.copyFileSync(
  path.join(__dirname, serviceWorkerFile),
  path.join(appPublicPath, serviceWorkerFile)
);

// Move templates in public folder
console.log("Move templates in public folder");

// TODO PARAMS Permettre de customiser ca
const templateFiles = glob.sync("!(public|node_modules)/**/*.html", {
  cwd: appRootPath,
});
for (const templateFile of templateFiles) {
  const targetFile = path.join(outputPath, templateFile);
  const targetDirectory = path.dirname(targetFile);
  if (!fs.existsSync(targetDirectory)) {
    makeDir.sync(targetDirectory);
  }
  fs.copyFileSync(path.join(appRootPath, templateFile), targetFile);
}

// Generate the list of cached files
console.log("Generate the list of cached files");

const filesToCache = [...templateFiles, bundleFile];
const generatedCacheScript = `var filesToCache = ${JSON.stringify(
  filesToCache,
  null,
  2
)}`;
fs.writeFileSync(
  path.join(outputPath, "filesToCache.js"),
  generatedCacheScript
);

// Build finished!
console.log("Build finished!");
