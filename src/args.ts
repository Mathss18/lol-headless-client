const args = process.argv.slice(2); // Ignore first two arguments

const userIndex = args.findIndex((arg) => arg.startsWith("--user="));
const passIndex = args.findIndex((arg) => arg.startsWith("--pass="));

let user =
  userIndex !== -1 ? args[userIndex].substring("--user=".length) : null;
let pass =
  passIndex !== -1 ? args[passIndex].substring("--pass=".length) : null;

if (!user) {
  user = process.env.USERNAME;
}
if (!pass) {
  pass = process.env.PASSWORD;
}
export { user, pass };
