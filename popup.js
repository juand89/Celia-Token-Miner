document.getElementById('openCelia').addEventListener('click', async() => {

  chrome.tabs.create({ url: 'https://celia.finance' }, (tab) => {
    // Add a listener to the newly created tab
    // chrome.scripting.executeScript({
    //   target: { tabId: tab.id },
    //   function: printTitle,
    // });
    // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //   if (tabId === tab.id && changeInfo.status === 'complete') {
    //     // The page has fully loaded, you can perform actions here
    //     chrome.runtime.sendMessage(JSON.stringify(document));
    //     // Create a function to print the title of the page

    //     // Inject the printTitle function into the newly created tab
    //   }
    // });
  });
  // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   function: printTitle,
  // });
});
