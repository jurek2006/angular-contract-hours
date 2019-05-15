export class ScheduleDay {
  constructor(
    public date: string,
    public weekday: string,
    public disabled: boolean,
    public hours?: number
  ) {}
}
