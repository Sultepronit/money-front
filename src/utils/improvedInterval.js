let lastRefresh = Date.now();
function setImprovedInterval(step, interval, callback) {
    setInterval(() => {
        const now = Date.now();
        console.log(now - lastRefresh);
        if(now - lastRefresh > interval * 1000) {
            lastRefresh = now;
            callback();
        }
    }, step * 1000);
}

export default setImprovedInterval;