export function millisecondsToMinutes(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  return minutes + " minutes " + seconds + " seconds";
}
