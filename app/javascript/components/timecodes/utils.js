function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    "h": pad(hours, 2),
    "m": pad(minutes, 2),
    "s": pad(seconds, 2)
  };
  return obj;
}

export default secondsToTime;
