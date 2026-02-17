import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export const runCode = (code, language, input) => {
  return new Promise((resolve) => {
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const fileMap = {
      cpp: "Main.cpp",
      java: "Main.java",
      python: "Main.py",
    };

    const fileName = fileMap[language];
    const filePath = path.join(tempDir, fileName);

    fs.writeFileSync(filePath, code);
    fs.writeFileSync(path.join(tempDir, "input.txt"), input || "");

    let image, command;

    if (language === "cpp") {
      image = "gcc:latest";
      command = "g++ Main.cpp -o main && ./main < input.txt";
    }

    if (language === "java") {
      image = "eclipse-temurin:17-jdk";
      command = "javac Main.java && java Main < input.txt";
    }

    if (language === "python") {
      image = "python:3.10";
      command = "python3 Main.py < input.txt";
    }

    const docker = spawn("docker", [
      "run",
      "--rm",
      "-v",
      `${tempDir}:/code`,
      "-w",
      "/code",
      "--memory=512m",
      "--cpus=1",
      "--network=none",
      image,
      "sh",
      "-c",
      command,
    ]);

    let output = "";
    let errorOutput = "";

    docker.stdout.on("data", (data) => {
      output += data.toString();
    });

    docker.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    docker.on("close", (exitCode) => {
      console.log("EXIT CODE:", exitCode);
      console.log("STDERR:", errorOutput);
      console.log("STDOUT:", output);

      if (errorOutput) {
        return resolve(errorOutput.trim());
      }

      resolve(output.trim());
    });

    docker.on("error", (err) => {
      resolve("Docker Error: " + err.message);
    });
  });
};
