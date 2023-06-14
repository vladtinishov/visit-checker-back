export class CreateEventDto {
  roomId: number;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
}

export class UpdateEventDto {
  roomId: number;
  name: string;
  startDateTime: Date;
  endDateTime: Date;
}
