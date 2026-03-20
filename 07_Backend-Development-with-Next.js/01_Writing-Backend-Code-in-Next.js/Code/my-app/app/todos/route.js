import { writeFile, readFile } from "fs/promises";

// await writeFile("hello.txt", "Hello World");
const fileContents = await readFile("hello.txt", "utf-8");

console.log(process.cwd());

console.log("Read from the file:", fileContents);
