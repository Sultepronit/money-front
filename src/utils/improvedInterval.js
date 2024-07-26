let lastRefresh = Date.now();
function setImprovedInterval(step, interval, callback) {
    setInterval(() => {
        const now = Date.now();
        // console.log(now - lastRefresh);
        // const timeRegex = /\d{2}:\d{2}:\d{2}/;
        // console.log(new Date().toString().match(timeRegex)[0]);
        if(now - lastRefresh > interval * 1000) {
            lastRefresh = now;
            callback();
        }
    }, step * 1000);
}

export default setImprovedInterval;