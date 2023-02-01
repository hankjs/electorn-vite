import knex, { Knex } from "knex";
import fs from "fs";
import path from "path";

let dbInstance: Knex;
// @ts-ignore
if (!dbInstance) {
  let dbPath;
  if (location.href.startsWith("http")) {
    dbPath = path.join(process.execPath, "../../../../src/common/db.db");
  } else {
    let platformPath = "";
    if (process.platform == "darwin") {
      platformPath = process.env.HOME + "/Library/Preferences"
    } else {
      const HOME = process.env.HOME ? process.env.HOME : (process.env.HOMEDRIVE as string + process.env.HOMEPATH as string)
      platformPath = HOME + "/.local/share"
    }
    dbPath = process.env.APPDATA || platformPath;
    const dbFolder = path.join(dbPath, "electron-jue-jin");
    dbPath = path.join(dbFolder, "db.db");
    const dbFolderIsExist = fs.existsSync(dbFolder);
    if (!dbFolderIsExist) {
      fs.mkdirSync(dbFolder);
    }

    const dbIsExist = fs.existsSync(dbPath);

    console.log("copy", dbIsExist, dbPath);
    if (!dbIsExist) {
      const resourceDbPath = path.join(process.execPath, "../resources/db.db");
      fs.copyFileSync(resourceDbPath, dbPath);
      console.log("copy");
    }
  }
  dbInstance = knex({
    client: "better-sqlite3",
    connection: { filename: dbPath },
    useNullAsDefault: true,
  });
}
export let db = dbInstance;
