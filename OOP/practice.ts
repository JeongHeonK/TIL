class CustomDate extends Date {
  currentYear() {
    return this.getFullYear;
  }

  currentMonth() {
    return (Number(this.getMonth) + 1).toString();
  }

  currentDate() {
    return this.getDate();
  }
}
