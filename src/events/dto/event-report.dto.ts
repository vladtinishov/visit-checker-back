export class EventReportDto {
  id?: number;
  roomId: number;
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
