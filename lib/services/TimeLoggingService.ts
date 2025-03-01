export class TimeLoggingService {
  id: string;
  private startTime: number | null = null;
  private endTime: number | null = null;

  constructor(id: string) {
    this.id = id;
  }

  start() {
    this.startTime = Date.now();
    console.log(`Timer started for ID: ${this.id}`);
  }
  stop() {
    if (this.startTime === null) {
      console.log("Error: Timer was not started.");
      return;
    }

    this.endTime = Date.now();
    const elapsed = this.endTime - this.startTime;
    console.log(`Timer stopped for ID: ${this.id}`);
    console.log(`Elapsed time for ${this.id}: ${elapsed / 1000}s`);
  }
}
