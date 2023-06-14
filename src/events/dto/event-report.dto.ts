export class EventReportDto {
  id?: number;
  groupId: number;
  eventId: number;
  userId: number;
  lateTime: number;
}

export class GetEventsReportsDto {
  date?: string;
  groupId?: number;
  roomId?: number;
}
