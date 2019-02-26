export const convertTimestampToDate = (timestamp) => {
  return new Date(timestamp.seconds * 1000).toLocaleDateString();
};
