/*Name this external file gallery.js*/

function upDate(previewPic) {
    
    /* 
       1) Change the url for the background image of the div with the id = "image" 
       to the source file of the preview image
    */

    targetImage = document.getElementById("image");
    targetImage.style.cssText = "background-image:url(" + previewPic.src + "); background-color: #8e68ff";

    /*
       2) Change the text  of the div with the id = "image" 
       to the alt text of the preview image 
    */
    targetImage.innerHTML = previewPic.alt;

}

function unDo() {
    /*  
        1) Update the url for the background image of the div with the id = "image" 
        back to the orginal-image.  You can use the css code to see what that original URL was
    */

    oldImage = document.getElementById("image");
    oldImage.style.cssText= "background-image:url('');"

    /*  
        2) Change the text  of the div with the id = "image" 
        back to the original text.  You can use the html code to see what that original text was
    */

   oldImage.innerHTML = "Hover over an image below to display here";

}
