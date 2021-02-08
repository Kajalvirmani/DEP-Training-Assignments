const options = { year: 'numeric', month: 'long' };
//API KEY
const key = 'AIzaSyCk8QOK5x1SsmDLPalxPUd_q7sB4n7Jgfo';
const pagination_element = document.querySelector('.page-number');

let currentPage = 1;
let rows = 3;
var q,queryStateChange;
var nextPageToken='';
var dataItems=[];

var thumbnailParent = document.querySelector('.thumbnail-parent');
var parentElement = document.querySelector('.thumbnailOuter');
function myFunction() {
  //query input from search input box
   q = document.getElementById('searchInput').value;

  if(queryStateChange){
    //data items is reinitialised to empty array for new search
    dataItems=[];
    //as it is a new search current page is set to 1
    currentPage=1;
    // as now the state change ha been recorded we don't need it for this call
    queryStateChange=false;
    //remove all child elements in parent wrapper
    while(pagination_element.firstChild){
      pagination_element.removeChild(pagination_element.firstChild)
    }
  }


  //end point of api
  let url;

    if(nextPageToken==''){
       url = 'https://www.googleapis.com/youtube/v3/search?key=' + key
    + "&type=video&part=snippet&maxResults=15&q=" + q;
    
    }
    else{
       url = 'https://www.googleapis.com/youtube/v3/search?key=' + key
      + "&type=video&part=snippet&maxResults=15&q=" + q+'&pageToken='+nextPageToken;
     
    }
  //get data from api
  fetch(url).then(data => data.json()).then(data => {
   
    nextPageToken=data.nextPageToken
    //parent element on which we want our videos to be displayed
    parentElement = document.querySelector('.thumbnailOuter');
    //to clear the data in element at every new search
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild)
    }
      dataItems=dataItems.concat(data.items)
    
    console.log(dataItems);
    displayList(dataItems, parentElement, rows, currentPage);
    setupPagination(dataItems, pagination_element, rows);
    queryStateChange=false;
  }

    //catch error in case 
  ).catch(err => console.log(err))

}

//generates thumbnail view and add it to parent div that is already a part of a div
function addThumbnail(element) {

  //date conversion
  let x=new Date(element.snippet.publishTime);
  let y=moment(x).format("LL");
  
  var video = `<a  target="_blank" href="https://www.youtube.com/embed/${element.id.videoId}" >
  <div id="iframeParent" class="iframe-parent">
   <iframe src="https://www.youtube.com/embed/${element.id.videoId}" frameborder="0" class="thumbnail-iframe" id="thumbnailIframe"></iframe>
   <p class='thumbnail-title'>${element.snippet.title}</p>
   <p class='thumbnail-description'>${element.snippet.description}</p>
   <p class='thumbnail-author' >${element.snippet.channelTitle}
    <p class='thumbnail-date'>${y}</p>
</div>
</a>`
  parentElement.innerHTML += video;

}
//add elements(array of objects that is returned as a 
//result from youtube api in myfucntion) where "rows_per_page" is no 
//of videos to be diaplyed on screen and "page" is the page no we are adding those videos to.
//wrapper is the wrapper element i.e parent div

function displayList(elements, wrapper, rows_per_page, page) {

  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;

  //iterate over elements to add them to child div
  let paginated_items = elements.slice(start, end);
  for (let index = 0; index < paginated_items.length; index++) {
    //add video thumnails to the parent div
    addThumbnail(paginated_items[index]);
  }
  if(page+1===Math.ceil(elements.length / rows_per_page)){
      myFunction()
  }
}

// helper function to call "paginationButton".
// warpper:div or element we are adding the paginated buttons to
// row_perPage is passed to help and find the totat number of buttons needed 
// for a particular search according to the ma Node. of elements per call in main function
function setupPagination(elements, wrapper, rows_per_page){
  
  var start=Math.ceil((elements.length-15)/rows_per_page);
  var page_count = Math.ceil(elements.length / rows_per_page);
  for (let i = start; i < page_count; i++) {
    let btn = paginationButton(i, elements);
    wrapper.appendChild(btn)

  }
}
//creates view of paginated button
function paginationButton(page,items){
  page+=1
  let button=document.createElement('button');
  button.innerText=page;

  if(currentPage==page){ button.classList.add('active');}

  button.addEventListener('click',function(){
    currentPage=page;
    displayList(items,parentElement,rows,currentPage);
    let current_button=document.querySelector('.active');
    current_button.classList.remove('active')

    button.classList.add('active')

  });

  return button;
}
// function nextButton(){
//   let button=document.createElement('button');
//   button.innerText='->'
//   button.addEventListener('click',function(){
//     currentPage=page;
//   });

// }

//changes the state for every new searchbar call
//when the input field's value change, state changes
function checkChange(){
    queryStateChange=true;
    
}






