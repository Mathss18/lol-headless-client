enum FgColors {
  FG_BLACK = "\x1b[30m",
  FG_RED = "\x1b[31m",
  FG_GREEN = "\x1b[32m",
  FG_YELLOW = "\x1b[33m",
  FG_BLUE = "\x1b[34m",
  FG_MAGENTA = "\x1b[35m",
  FG_CYAN = "\x1b[36m",
  FG_WHITE = "\x1b[37m",
}

enum BgColors {
  BG_BLACK = "\x1b[40m",
  BG_RED = "\x1b[41m",
  BG_GREEN = "\x1b[42m",
  BG_YELLOW = "\x1b[44m",
  BG_BLUE = "\x1b[44m",
  BG_MAGENTA = "\x1b[45m",
  BG_CYAN = "\x1b[46m",
  BG_WHITE = "\x1b[47m",
}

enum Options {
  RESET = "\x1b[0m",
  BRIGHT = "\x1b[1m",
  DIM = "\x1b[2m",
  UNDERSCORE = "\x1b[4m",
  BLINK = "\x1b[5m",
  REVERSE = "\x1b[7m",
  HIDDEN = "\x1b[8m",
}

export class Logger {
  static default(message: unknown) {
    console.log(message);
  }
  static black(message: unknown) {
    console.log(FgColors.FG_BLACK, message, Options.RESET);
  }
  static red(message: unknown) {
    console.log(FgColors.FG_RED, message, Options.RESET);
  }
  static green(message: unknown) {
    console.log(FgColors.FG_GREEN, message, Options.RESET);
  }
  static yellow(message: unknown) {
    console.log(FgColors.FG_YELLOW, message, Options.RESET);
  }
  static blue(message: unknown) {
    console.log(FgColors.FG_BLUE, message, Options.RESET);
  }
  static magenta(message: unknown) {
    console.log(FgColors.FG_MAGENTA, message, Options.RESET);
  }
  static cyan(message: unknown) {
    console.log(FgColors.FG_CYAN, message, Options.RESET);
  }
  static white(message: unknown) {
    console.log(FgColors.FG_WHITE, message, Options.RESET);
  }
}
