//get the current wallpaper displayed on bing

function parseResponse() {
    //Todo: Icons
    "use strict";
    if (this.readyState === 4) {
        if (this.status === 200) {
            var response = JSON.parse(this.responseText);
            var bingBaseUrl = "https://www.bing.com";

            var wallpaperUrl = response.images.url;

            console.log("" + bingBaseUrl + wallpaperUrl + "");
        }
    }
}

function getBingWallpaper(url) {
    "use strict";

    var httpRequest = new XMLHttpRequest();

    httpRequest.onload = parseResponse;
    httpRequest.open('GET', url);
    httpRequest.send();
}

//
getBingWallpaper("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US");
