function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  function formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
  
    return `${minutes}m ${seconds}s`;
  }
  
  export async function progressBar(progress: number, blocking = false, totalTime = 1000, startTime = Date.now()): Promise<void> {
    const width = 40;
    const percent = Math.round(progress * 100);
    const complete = Math.round(width * progress);
    const incomplete = width - complete;
  
    const filledChar = '\u2588';
    const emptyChar = '\u2591';
  
    let bar = '[' + filledChar.repeat(complete) + emptyChar.repeat(incomplete) + ']';
    bar += ' ' + percent.toString().padStart(3) + '%';
  
    const elapsedTime = Date.now() - startTime;
    bar += ' | Time: ' + formatTime(elapsedTime);
  
    process.stdout.write('\r' + bar);
  
    if (blocking && progress < 1) {
      const updates = 100;
      const delayTime = totalTime / updates;
      const progressIncrement = 1 / updates;
  
      await delay(delayTime);
      await progressBar(progress + progressIncrement, blocking, totalTime, startTime);
    }
  
    if (progress === 1) {
      process.stdout.write('\n');
    }
  }
  