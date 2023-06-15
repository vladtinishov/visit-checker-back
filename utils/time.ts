import * as dayjs from 'dayjs';

export function setTime(time: string) {
  const [hours, minutes] = time.split(':');
  return dayjs(dayjs().format('YYYY-MM-DD HH:mm'))
    .hour(+hours)
    .minute(+minutes);
}

export function isBetween(time1: string, time2: string) {
  const currentTime = setTime(dayjs().format('HH:mm'));
  const isSame = currentTime.isSame(setTime(time1));
  const isAfter = currentTime.isAfter(setTime(time1));
  const isBefore = currentTime.isBefore(setTime(time1));

  if (isSame) return true;

  if (isBefore) return false;

  if (isAfter) {
    return currentTime.isBefore(setTime(time2));
  }

  return false;
}

export function getCurrentDate() {
  return dayjs().format('YYYY-MM-DD');
}

export function getTimeDifference(time1, time2) {
  const startTime = setTime(time1);
  const endTime = setTime(time2);
  return startTime.diff(endTime) / 1000 / 60;
}

export function getCurrentTime() {
  return dayjs().format('HH:mm');
}
