function showNotification(message, duration) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.setAttribute("class", "notification");
  document.body.append(notification);
  setTimeout(() => {
    notification.remove();
  }, duration);
}
