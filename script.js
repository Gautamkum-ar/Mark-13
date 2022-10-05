const birthDate = document.querySelector("#input-date");
const btn = document.querySelector(".checkbtn");
const outPut = document.querySelector(".output");

function reverseFunction(str) {
  var char = str.split("");
  var reverseChar = char.reverse();
  var reverseData = reverseChar.join("");
  return reverseData;
}
function isPalindrome(str) {
  var reverse = reverseFunction(str);
  return str === reverse;
}
function dateToStr(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function allDateFormat(date) {
  var dateStr = dateToStr(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date) {
  var listOfPlaindromes = allDateFormat(date);
  var flag = false;
  for (var i = 0; i < listOfPlaindromes.length; i++) {
    if (isPalindrome(listOfPlaindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}
function isLeapyear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapyear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);
  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormat(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}
function clickHandlar(e) {
  var bdayStr = birthDate.value;
  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };
    var isPalindrome = checkPalindromeForAllDateFormat(date);
    if (isPalindrome) {
      outPut.innerText = "omfo.. your birthday is palindrome";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      outPut.innerText = `Sorry! You are unlucky your birthday is not palindrome the next palindrome date is  ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`;
    }
  }
}

btn.addEventListener("click", clickHandlar);
