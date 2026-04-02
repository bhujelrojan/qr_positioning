const reader = new Html5Qrcode("camera");
let scannerOn = false;

const mapContainer = document.getElementById("mapContainer");
const btn = document.getElementById("btn");
const marker = document.getElementById("marker");

function toggleScanner() {
    scannerOn = !scannerOn;

    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        cameraDiv.style.display = "block";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        cameraDiv.style.display = "none";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        function (text) {
            console.log("Scanned:", text);

            try {
                const place = JSON.parse(text);

                const top = place.latitude * 5 + "px";
                const left = place.longitude * 5 + "px";

                showMarkerAt(top, left, place.name, place.latitude, place.longitude);

                toggleScanner(); // stop after scan
            } catch (e) {
                alert("Invalid QR code format. Must be JSON.");
                console.error(e);
            }
        },
        function (error) {
            // optional scan failure callback
        }
    ).catch(function (err) {
        console.error("Camera error:", err);
    });
}

function stopScanner() {
    reader.stop().then(() => {
        console.log("Scanner stopped");
    }).catch(err => {
        console.error(err);
    });
}

function showMarkerAt(top, left, name, latitude, longitude) {
    marker.style.top = top;
    marker.style.left = left;

    document.getElementById("itemName").innerText = "Name: " + name;
    document.getElementById("itemLatitude").innerText = "Latitude: " + latitude;
    document.getElementById("itemLongitude").innerText = "Longitude: " + longitude;
}