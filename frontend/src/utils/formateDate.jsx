export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const day = String(date.getDate()).padStart(2, "0");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];

  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} ${month} ${year}`;
}
