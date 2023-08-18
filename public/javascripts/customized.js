
//copy the url
function copyURL() {
  // Get the url
  let copyURL = document.getElementById("generatedURL").innerText;
  console.log(copyURL)

  // Copy the url
  navigator.clipboard.writeText(copyURL);

  // Alert the copied text
  //alert("Copied the URL: " + copyURL);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + copyURL;
}

//tooltip display
function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}