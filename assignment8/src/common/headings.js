const API_KEY = "83c95c63559e49e9b2e04f2af442042f";
 
export function headings() {
    let articlesDiv=document.querySelector('.articles');

    let parentElement = document.createElement("div");

    let url = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=83c95c63559e49e9b2e04f2af442042f';

    fetch(url).then(data => data.json()).then(data => {
       
        
        let x = data.articles
        for (const iterator of x) {
            //    console.log(iterator.urlToImage);

            let dateObj = new Date(iterator.publishedAt);
            let y = dater(dateObj);
            let postContent='';
            if(iterator.description){
                postContent=iterator.description
            }else if(iterator.content){
                postContent=iterator.content;
            }
            else{
                postContent='';
            }
            let element = `<article>
               <div class="flex-container">
                   <div>
                       <p class="post">
                           <!-- added image for fillup, image related to article is added -->
                           <img src="${iterator.urlToImage}" alt="image1" class="image-post">
                       </p>
                   </div>
                   <div class="post-content">
                       <h2 class="headings post-heading">${iterator.title}</h2>
                       <p class="under-post-heading">posted on ${y},
                           <span style="color: gray;">
                               //Category: </span> Category one
                       </p>
                      <p class="post-text">${postContent}
                       </p>
                       <a href="${iterator.url}" target="_blank" rel="noopener noreferrer"><button class="button">Continue
                           Reading</button></a>
                   </div>
               </div>
           </article>
           <hr class="article-break">
           `
            parentElement.innerHTML += element;
        }
        articlesDiv.innerHTML=parentElement.innerHTML
    }
    ).catch(err => console.log(err))
}

function dater(dateObj) {

    let options = { month: 'long' };
    let fullMonth = new Intl.DateTimeFormat('en-US', options).format(dateObj)

    return fullMonth + " " + dateObj.getDate() + " , " + dateObj.getFullYear();

}

