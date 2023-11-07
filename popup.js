chrome.runtime.sendMessage({ action: 'userClick' });
document.getElementById('openCelia').addEventListener('click', async () => {

  chrome.tabs.create({ url: 'https://app.celia.finance/app/mine' });
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
});
// wrapper method

function convertMillisecondsToTimer(milliseconds) {
  // Calculate hours, minutes, seconds, and milliseconds
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds %= 3600000;
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;
  const seconds = Math.floor(milliseconds / 1000);
  milliseconds %= 1000;

  // Format the timer display
  const timer = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return timer;
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  const openCelia = document.getElementById('openCelia');
  var x;
  if (!isNaN(message)) {
    openCelia.style.display = 'none';
    setInterval(() => {
      // Output the result in an element with id="demo"
      document.getElementsByClassName("timer-container")[0].innerText = "Remaining Time:" + convertMillisecondsToTimer(message);
    }, 1000);

  } else {
    clearInterval(x);
    openCelia.style.display = 'block';
  }
});