document.getElementById('openCelia').addEventListener('click', async() => {

  chrome.tabs.create({ url: 'https://app.celia.finance/app/mine' }, (tab) => {

  });
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

});
