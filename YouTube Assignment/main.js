const options = { year: "numeric", month: "long" };
//API KEY
//const key = 'AIzaSyCk8QOK5x1SsmDLPalxPUd_q7sB4n7Jgfo';
const key = "AIzaSyAcm7OMAvxI0GeuAswTyqIQ8JDcIr_6Gio";
const pagination_element = document.querySelector(".page-number");

let currentPage = 1;
let rows;
let q, queryStateChange;
let nextPageToken = "";
var dataItems = [];
let width = window.innerWidth;
if (width <= 1400) {
  rows = 4;
  if (width <= 850 && width > 350) {
    rows = 2;
  }
  if (width <= 350) {
    rows = 1;
  }
}
let maxPageCount = 5;

let thumbnailParent = document.querySelector(".thumbnail-parent");
let parentElement = document.querySelector(".thumbnailOuter");

function checkChange() {
  queryStateChange = true;
}

function searchAPI(event) {
  event.preventDefault();
  myFunction();
}

function myFunction() {
  //query input from search input box
  q = document.getElementById("searchInput").value;

  if (queryStateChange) {
    dataItems = [];
    currentPage = 1;
    queryStateChange = false;
    while (pagination_element.firstChild) {
      pagination_element.removeChild(pagination_element.firstChild);
    }
  }

  //end point of api
  let url;

  url =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    key +
    "&type=video&part=snippet&maxResults=15&q=" +
    q +
    "&pageToken=" +
    nextPageToken;

  //get data from api
  fetch(url)
    .then((data) => data.json())
    .then(
      (data) => {
        nextPageToken = data.nextPageToken;
        //parent element on which we want our videos to be displayed
        parentElement = document.querySelector(".thumbnailOuter");
        //to clear the data in element at every new search
        while (parentElement.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
        }
        while (pagination_element.firstChild) {
          pagination_element.removeChild(pagination_element.firstChild);
        }
        dataItems = dataItems.concat(data.items);
        displayList(dataItems, parentElement, rows, currentPage);

        setupPagination(dataItems, pagination_element, currentPage);
        queryStateChange = false;
      }
      //catch error in case
    )
    .catch((err) => console.log(err));
}

function addThumbnail(element) {
  let dateObj = new Date(element.snippet.publishTime);
  let y = dater(dateObj);

  let video = `<a  target="_blank" href="https://www.youtube.com/embed/${element.id.videoId}" >
  <div id="iframeParent" class="iframe-parent">
   <iframe src="https://www.youtube.com/embed/${element.id.videoId}" frameborder="0" class="thumbnail-iframe" id="thumbnailIframe"></iframe>
   <p class='thumbnail-title'>${element.snippet.title}</p>
   <p class='thumbnail-description'>${element.snippet.description}</p>
   <p class='thumbnail-author' >${element.snippet.channelTitle}
    <p class='thumbnail-date'>${y}</p>
</div>
</a>`;
  parentElement.innerHTML += video;
}

function displayList(elements, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let total_pages_per_call = Math.ceil(elements.length / rows_per_page);
  let paginated_items = elements.slice(start, end);
  if (page === total_pages_per_call || paginated_items.length < rows_per_page) {
    myFunction();
  }
  //iterate over elements to add them to child div
  for (let index = 0; index < paginated_items.length; index++) {
    //add video thumnails to the parent div
    addThumbnail(paginated_items[index]);
  }
}

function setupPagination(elements, wrapper, currentPage) {
  let btnPrev = previousButton(currentPage, elements);
  let btnNext = nextButton(currentPage, elements);
  wrapper.appendChild(btnPrev);

  wrapper.appendChild(btnNext);
}

function nextButton(page_count, items) {
  let btn = document.createElement("button");

  btn.addEventListener("click", function () {
    btn.classList.add("active");
    currentPage = page_count + 1;
    displayList(items, parentElement, rows, currentPage);
    while (pagination_element.firstChild) {
      pagination_element.removeChild(pagination_element.firstChild);
    }

    setupPagination(items, pagination_element, currentPage);
  });
  btn.classList.add(["fa"]);
  btn.classList.add(["fa-arrow-right"]);
  return btn;
}

function previousButton(page_count, items) {
  let btn = document.createElement("button");
  if (page_count - 1 === 0) {
    btn.disabled = true;
  }

  btn.addEventListener("click", function () {
    currentPage = page_count - 1;
    displayList(items, parentElement, rows, currentPage);
    while (pagination_element.firstChild) {
      pagination_element.removeChild(pagination_element.firstChild);
    }
    setupPagination(items, pagination_element, currentPage);
  });
  btn.classList.add(["fa"]);
  btn.classList.add(["fa-arrow-left"]);
  return btn;
}

function dater(dateObj) {
  let options = { month: "long" };
  let fullMonth = new Intl.DateTimeFormat("en-US", options).format(dateObj);

  return fullMonth + " " + dateObj.getDate() + " , " + dateObj.getFullYear();
}
