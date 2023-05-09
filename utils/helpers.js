module.exports = {
    // obtains time
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    // obtains date
    format_date: (date) => {
      return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
};