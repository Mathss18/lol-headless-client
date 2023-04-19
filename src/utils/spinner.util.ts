import * as readline from "readline";

export function startSpinner(message: string): NodeJS.Timer {
  const frames = ["◜", "◠", "◝", "◞", "◡", "◟"];
  let i = 0;
  const interval = setInterval(() => {
    const output = `\u001b[33m${message} ${frames[i]}\u001b[0m `;
    i = (i + 1) % frames.length;

    readline.cursorTo(process.stdout, 0);
    process.stdout.write(output);
  }, 100);

  return interval;
}

export function stopSpinner(
  timer: NodeJS.Timer,
  success: boolean = true
): void {
  clearInterval(timer);
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  if (success) {
    console.log("\u001b[32m✔\u001b[0m Done");
  } else {
    console.log("\u001b[31m✖\u001b[0m Aborted");
  }
}
