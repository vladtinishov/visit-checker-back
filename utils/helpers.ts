export function sortByField(arr, field, direction: 'desc' | 'asc') {
  return arr.sort(function (a, b) {
    const modifier = direction === 'desc' ? -1 : 1;
    if (a[field] > b[field]) {
      return modifier;
    }
    if (a[field] < b[field]) {
      return -modifier;
    }
    return 0;
  });
}

export const generateUniqueString = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueString = '';

  while (uniqueString.length < 10) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters[randomIndex];
  }

  return uniqueString;
};
