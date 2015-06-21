function checkTime(i) {
    "use strict";
    if (i<10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    "use strict";
    var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        t;

    m = checkTime(m);
    document.getElementById('clock').innerHTML = h + ":" + m;
    t = setTimeout(function(){startTime();},1000);
}

startTime();
