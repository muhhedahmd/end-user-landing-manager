const fs = require("fs");
const path = require("path");

const dir = "a:/Landing_manger/end-user";

const replacements = {
  currentTrnalsation: "currentTranslation",
  cmopanyInfo: "companyInfo",
  currentTranslaton: "currentTranslation",
  varanices: "variances",
  AchiveMents: "Achievements",
  Achivements: "Achievements",
};

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(function (file) {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes("node_modules") && !file.includes(".next")) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  for (const [oldStr, newStr] of Object.entries(replacements)) {
    if (content.includes(oldStr)) {
      content = content.split(oldStr).join(newStr);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`Updated: ${file}`);
  }
});
