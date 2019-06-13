export class ScheduleDay {
  constructor(
    public date: string,
    public weekday: string,
    public workingDay: boolean,
    public hours?: number
  ) {}
}
