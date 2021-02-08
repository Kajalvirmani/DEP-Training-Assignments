//adding header to the HTML view

var header=document.querySelector('.header')
header.innerHTML=`<div class="nav-title">
<em class="fa fa-youtube-play youtube"></em> YouTube
</div>
<div class="search-container">
<form>
    <input type="search" placeholder="Search.." id="searchInput" class="search-input" onchange="checkChange()" />
    <button type="button" class="search-button" id="search" onclick="myFunction()"><em
            class="fa fa-search"></em></button< /div>
</form>`