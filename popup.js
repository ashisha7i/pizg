document.addEventListener('DOMContentLoaded', function (event) {
  // Click hendler for XML Beautify button
  document.getElementById("btnXml").addEventListener('click', function (event) {
    var textareaElement = document.getElementById("results");
    var valueXml = textareaElement.value;
    textareaElement.value = vkbeautify.xml(valueXml);
  });

  // Click hendler for JSON Beautify button
  /* document.getElementById("btnJson").addEventListener('click', function (event) {
    let textareaElement = document.getElementById("results");
    let valueJson = textareaElement.value;
    textareaElement.value = vkbeautify.json(valueJson);
  }); */

  // Get results for the already selected text
  getResults();
});

function getResults() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'clicked_browser_action' }, function (response) {
      showResults(response.results);
    });
  });
}

function showResults(results) {
  var resultsElement = document.getElementById('results');
  resultsElement.innerText = results;
}

function prettyPrint(dataType) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'prettify_action', type: dataType }, function (
      response
    ) {
      showResults(response.results);
    });
  });
}
