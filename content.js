chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('MESSAGE ---- ' + request.action);
  if (request.action === 'clicked_browser_action') {
    var decodedString;

    try {
      var b64Data = getSelectedText();

      if(!b64Data) {
        throw new Error("Nothing selected? Please make sure that you have selected the text to decode.");
      }

      // Decode base64 (convert ascii to binary)
      var strData = atob(b64Data);

      // Convert binary string to character-number array
      var charData = strData.split('').map(function(x) {
        return x.charCodeAt(0);
      });

      // Turn number array into byte-array
      var binData = new Uint8Array(charData);

      // Pako magic
      var data = pako.inflate(binData);

      decodedString = new TextDecoder('utf-8').decode(new Uint8Array(data));

    } catch (err) {
      console.dir(err);
      decodedString = "ERROR : Please verify the selected text and try again.";
    }

    sendResponse({ results: decodedString });
  } else if (request.action = 'prettify_action') {
    console.log("Prettify CALLED " + request.type);
    var prettyString = "--";
    if (request.type === 'XML') {
      prettyString = vkbeautify.xml()
    }

    sendResponse({ results: "A pretty string" });
  }
});

function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
  }
  return text;
}
