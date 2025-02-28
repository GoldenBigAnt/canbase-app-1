export const getAvatarLetters = (username: any) => {
  if (!username) return;

  const name = username.split(" ");

  return `${name[0].charAt(0)} ${name[1]?.charAt(0) ?? ""}`;
};

export const isEmpty = (value: any) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  if (typeof value === "number" && value === 0) {
    return true;
  }

  return false;
};

export const getMaxDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return maxDate;
};

export const formatedate = (param: string) => {
  const date = new Date(param);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthResult = month < 10 ? `0${month}` : month;
  const dayResult = day < 10 ? `0${day}` : day;

  const result = `${dayResult}-${monthResult}-${year}`;

  return result;
};

export const compareStrings = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;

  return 0;
};

export const getCleanDate = (param: string, type: number) => {
  const date = new Date(param);

  const formattedDate = date
    .toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");

  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  const age = currentYear - year;
  const ageString = `(${age} Jahre)`;

  let cleanDate;

  if (type === 1) {
    cleanDate = `${formattedDate} ${ageString}`;
  } else {
    cleanDate = `${formattedDate}`;
  }

  return cleanDate;
};

export const getTimeDifferenceInGerman = (param: string) => {
  var now: Date = new Date();
  var start: Date = new Date(param);

  const difference: number = now.getTime() - start.getTime();

  var secondsDifference = Math.floor(difference / 1000);
  var minutesDifference = Math.floor(secondsDifference / 60);
  var hoursDifference = Math.floor(minutesDifference / 60);
  var daysDifference = Math.floor(hoursDifference / 24);
  var weeksDifference = Math.floor(daysDifference / 7);
  var monthsDifference = Math.floor(daysDifference / 30);

  if (monthsDifference > 0) {
    return (
      "vor etwa " +
      monthsDifference +
      " Monat" +
      (monthsDifference > 1 ? "en" : "")
    );
  } else if (weeksDifference > 0) {
    return (
      "vor etwa " +
      weeksDifference +
      " Woche" +
      (weeksDifference > 1 ? "n" : "")
    );
  } else if (daysDifference > 0) {
    return (
      "vor etwa " + daysDifference + " Tag" + (daysDifference > 1 ? "en" : "")
    );
  } else if (hoursDifference > 0) {
    return (
      "vor etwa " +
      hoursDifference +
      " Stunde" +
      (hoursDifference > 1 ? "n" : "")
    );
  } else if (minutesDifference > 0) {
    return (
      "vor etwa " +
      minutesDifference +
      " Minute" +
      (minutesDifference > 1 ? "n" : "")
    );
  } else {
    return "vor weniger als einer Minute";
  }
};
