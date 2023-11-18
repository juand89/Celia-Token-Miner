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
  // Display the timer
  document.getElementsByClassName("hours")[0].innerText = `${hours.toString().padStart(2, '0')}`;
  document.getElementsByClassName("minutes")[0].innerText = `${minutes.toString().padStart(2, '0')}`;
  document.getElementsByClassName("seconds")[0].innerText = `${seconds.toString().padStart(2, '0')}`;
<<<<<<< HEAD
}
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   const openCelia = document.getElementById('openCelia');
//   if (!isNaN(message)) {
//     openCelia.style.display = 'none';
//     chrome.action.setIcon({
//       path: {
//         "16": "/images/icon16.png",
//         "48": "/images/icon48.png",
//         "128": "/images/icon128.png"
//       }
//     });
//     let remainingTime = message
//     convertMillisecondsToTimer(remainingTime);
//     setInterval(() => {
//       remainingTime -= 1000;
//       convertMillisecondsToTimer(remainingTime);
//     }, 1000);

//   } else {
//     chrome.action.setIcon({
//       path: {
//         "16": "/images/icon16-black.png",
//         "48": "/images/icon48-black.png",
//         "128": "/images/icon128-black.png"
//       }
//     });
//     openCelia.style.display = 'block';
//   }
// });
=======
}
>>>>>>> 99aa770813e5ce27dbb9118eb6ff012f9d9bffab
