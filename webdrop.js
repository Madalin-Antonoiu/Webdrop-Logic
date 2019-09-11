//Written by me - DO NOT delete

var clientFrameWindow = document.getElementById('clientframe').contentWindow.document;
var droppables = document.getElementById("dragitemslistcontainer");

//If not doing on iFrame load, the addEventListeners will crash sometimes
function onLoadiframe() { 
  //Listeners
  clientFrameWindow.body.addEventListener('mouseover', mouseEnter, false);
  clientFrameWindow.body.addEventListener('mouseout', mouseLeave, false);
  clientFrameWindow.body.addEventListener('dragover', dragOver, false);
  clientFrameWindow.body.addEventListener('dragleave', dragLeave, false);
  clientFrameWindow.body.addEventListener('drop', onDrop, false);
  droppables.addEventListener("dragstart", onDragStart, false);

  function mouseEnter(e) {
    //Add outline on hover
    e.target.classList.add('outline');

    //Tooltip show (redo)
    if (e.target.classList.item(0) == 'outline') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + '>';
    } else if (e.target.classList.item(1) == 'outline' || 'outline-dashed') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + '">';
    } else if (e.target.classList.item(2) == 'outline' || 'outline-dashed') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + +e.target.classList.item(1) + '">';
    } else if (e.target.classList.item(3) == 'outline' || 'outline-dashed') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + e.target.classList.item(1) + e.target.classList.item(2)
      '">';
    } else {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + '>';
    }

    document.getElementById('tooltip1').style.display = "block";
    //console.log('<' + e.target.tagName.toLowerCase() + '>');
  }
  function mouseLeave(e) {
    //Remove outline on hover
    e.target.classList.remove('outline');
    //Tooltip hide
    document.getElementById('tooltip1').style.display = "";
    //console.clear();
  }
  function dragOver(e) {
    //These two are really needed to remove the cut circle on iframe :)
    event.preventDefault();
    event.stopPropagation();

    //Add outline on hover
    e.target.classList.add('outline');

    //Tooltip show
    if (e.target.classList.item(0) == 'outline') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + '>';
    } else if (e.target.classList.item(1) == 'outline' || 'outline-dashed') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + '">';
    } else if (e.target.classList.item(2) == 'outline' || 'outline-dashed') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + +e.target.classList.item(1) + '">';
    } else if (e.target.classList.item(3) == 'outline' || 'outline-dashed') {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + e.target.classList.item(1) + e.target.classList.item(2)
      '">';
    } else {
      document.getElementById('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + '>';
    }

    document.getElementById('tooltip1').style.display = "block";
    //console.log('<' + e.target.tagName.toLowerCase() + '>');
  }
  function dragLeave(e) {
    //Add outline on hover
    e.target.classList.remove('outline');
    document.getElementById('tooltip1').style.display = "none";
    //console.log('<' + e.target.tagName.toLowerCase() + '>');
  }
  function onDragStart(e) {

    console.log("Drag Started!");
    e.dataTransfer.setData("text/html", e.target.getAttribute('data-insert-html'));

    /*Drag image
    var img = new Image(); 
    img.src = './img/alerts.jpg'
      */
    //get data attribute on click :)
    //console.log(e.target.getAttribute('data-insert-html'));

  }
  function onDrop(e) {
    e.preventDefault();

    console.log('Drop event');

    var x =  e.dataTransfer.getData("text/html", e.target.getAttribute('data-insert-html'));
    var frag = document.createRange().createContextualFragment(x);

    //Here before appending, need to calculate if mosue is closer to top or bottom, so it prepend( put before) or after,
    //Now it only puts it after :)
    e.target.appendChild(frag);

      //console.log( x  + 'The data carried over'); console.log(frag);
  }

}

//Control Panel
function toggleEditIframe() {

  if (document.getElementById('clientframe').contentWindow.document.body.contentEditable == "true") {

    document.getElementById('clientframe').contentWindow.document.body.contentEditable = false;

    //Snackbar notification
    document.getElementById("snackbar").innerHTML = "IFrame Edit : OFF";
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2000);

  } else {
    document.getElementById('clientframe').contentWindow.document.body.contentEditable = true;

    //Snackbar notification
    document.getElementById("snackbar").innerHTML = "IFrame Edit : ON";
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 2000);

  }

}
function toggleOutlineAll() {
  //Toggle iFrame outline dashed elements
  var x = clientFrameWindow.body.querySelectorAll('*');
  var i;

  for (i = 0; i < x.length; i++) {
    x[i].classList.toggle("outline-dashed");
  }

  //Known bug _ adding new elements with outline on will not remove it when turning off.
 
  //Snackbar notifications toggle
  if (clientFrameWindow.body.classList.contains("outline-dashed")) {
    //Snackbar notification ON
    document.getElementById("snackbar").innerHTML = "Outline: ON";
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  } else {
    //Snackbar notification OFF
    document.getElementById("snackbar").innerHTML = "Outline: OFF";
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 1000);
  }

}
function showClickedElIdClass(e) {
  // If click target's id is not empty 
  if (e.target.id != "") {
    //alert('<' + e.target.tagName.toLowerCase() + ' id="' + e.target.id + '">');
    e.target.style.outline = "2px dashed red";
  } else {
    //alert('<' + e.target.tagName.toLowerCase() + '>');
    //e.target.style.outline = "none";
  }
}


//Create download file with iFrame HTML Code (gibMiData())
var storyPath = window.location.href;
console.API; // Clear console before logging new data
if (typeof console._commandLineAPI !== 'undefined') {
  console.API = console._commandLineAPI; //chrome
} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
  console.API = console._inspectorCommandLineAPI; //Safari
} else if (typeof console.clear !== 'undefined') {
  console.API = console;
}

// Extracts high level details of current story
function gibMiData() {

  console.API.clear();
  storyObj = {};
  storyObj = document.getElementById("clientframe").contentWindow.document.documentElement.outerHTML;
  console.save(storyObj);

}
console.save = function (data, filename) {
  if (!data) {
    console.error('Console.save: No data')
    return;
  }

  if (!filename) filename = 'index.html'

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4)
  }

  var blob = new Blob([data], {
      type: 'text/json'
    }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}

/*Full iFrame code to console- works

  function copyHtml() {
    var myHTML = document.getElementById("clientframe").contentWindow.document.documentElement.outerHTML;
    console.log(myHTML);
  }
*/