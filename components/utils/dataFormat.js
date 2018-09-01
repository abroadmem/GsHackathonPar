export const unixToDateTime = unixtime => {
  let date = new Date(unixtime * 1000);

  let year = date.getFullYear();
  let month = "0" + date.getMonth();
  let day = "0" + date.getDate();
  // Hours part from the timestamp
  let hours = "0" + date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  let formattedTime =
    year +
    "/" +
    month.substr(-2) +
    "/" +
    day.substr(-2) +
    " " +
    hours.substr(-2) +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);
  return formattedTime;
};

