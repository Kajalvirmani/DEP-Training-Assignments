//adding header to the HTML view

var header=document.querySelector('.header')
header.innerHTML=`<div class="nav-title">
<em class="fa fa-youtube-play youtube"></em> YouTube
</div>
<div class="search-container">
<form onsubmit="searchAPI(event)">
    <input type="search" placeholder="Search.." id="searchInput" class="search-input" onchange="checkChange()" />
    <button type="submit" class="search-button" id="search" ><em
            class="fa fa-search"></em></button< /div>
</form>`