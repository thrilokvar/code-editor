const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const tempDir = path.join(__dirname, "../temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const executeCode = (language, code, input = "") => {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    const filePath = path.join(tempDir, jobId);
    const inputPath = filePath + ".txt";

    fs.writeFileSync(inputPath, input);

    let command = "";

    if (language === "python") {
      fs.writeFileSync(filePath + ".py", code);
      command = `docker run --rm --memory=100m --cpus=0.5 --network=none -v ${tempDir}:/app python:3.9 sh -c "python /app/${jobId}.py < /app/${jobId}.txt"`;
    }

    if (language === "c") {
      fs.writeFileSync(filePath + ".c", code);
      command = `docker run --rm --memory=100m --cpus=0.5 --network=none -v ${tempDir}:/app gcc:latest sh -c "gcc /app/${jobId}.c -o /app/${jobId} && /app/${jobId} < /app/${jobId}.txt"`;
    }

    if (language === "cpp") {
      fs.writeFileSync(filePath + ".cpp", code);
      command = `docker run --rm --memory=100m --cpus=0.5 --network=none -v ${tempDir}:/app gcc:latest sh -c "g++ /app/${jobId}.cpp -o /app/${jobId} && /app/${jobId} < /app/${jobId}.txt"`;
    }

    if (language === "java") {
      fs.writeFileSync(filePath + ".java", code);
      command = `docker run --rm --memory=100m --cpus=0.5 --network=none -v ${tempDir}:/app openjdk:latest sh -c "javac /app/${jobId}.java && java -cp /app ${jobId} < /app/${jobId}.txt"`;
    }

    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout.trim());
    });
  });
};

module.exports = executeCode;
