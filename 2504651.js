const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const item = JSON.parse(text);

            // Show marker (keep existing functionality)
            showMarkerAt(item.top, item.left,place.name,place.latitude,place.longitude);

            // Show inventory info
            displayItemInfo(item);

            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}




function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}