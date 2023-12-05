# Project Setup: Mongoose-Express-CRUD-Mastery

1. **Step 1:** Initialize Project:

Create a new project folder and open it in VS Code.
Run npm init -y to kickstart the creation of a package.json file.

2. **Step 2:** Install Packages:

Install Express: npm install express
Install Mongoose: npm install mongoose --save
Install TypeScript: npm install typescript --save-dev
Install Cors: npm install cors
Install Dotenv: npm install dotenv

3. **Step 3:** Configure TypeScript:

Create a tsconfig.json file using tsc --init.
Set rootDir to "src" and outDir to "dist".

4. **Step 4:** Connect Mongoose to the Server:
 ```typescript
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
```
## SetUP Eslint and Prettier
5. **Step 5:** add tsconfing.json file

Update tsconfig.json to include "include": ["src"], "exclude": ["node_modules"].
Install ESLint: npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev.
Configure ESLint using npx eslint --init.
Add ESLint ignore file (.eslintignore).
Add ESLint scripts in package.json.

6. **Step 6:** Setup Prettier:

Install Prettier: npm install --save-dev prettier.
Create a .prettierrc.json file with desired settings.
Add Prettier scripts in package.json.
Configure VS Code settings to use Prettier as the default formatter.

7. **Step 7:** Avoiding Conflicts:

Install ts-node-dev: npm install ts-node-dev --save-dev.
Update scripts in package.json to include start:dev using ts-node-dev.
 ```
  / package.json
{
  // ...
  "scripts": {
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
   },
  // ...
}
 ```

8. **Step 8:** Run the Server:
Execute npm run start:dev to run the server in development mode.