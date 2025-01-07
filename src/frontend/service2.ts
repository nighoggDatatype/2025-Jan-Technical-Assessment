const map = L.map('map',
	{
		center: L.latLng(1.2867888749929002, 103.8545510172844),
		zoom: 11
	});

L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 11,
    /** DO NOT REMOVE the OneMap attribution below **/
    attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
}).addTo(map)

let selectedPin: null|L.Marker<any> = null
const locationSelect = document.getElementById("location") as HTMLSelectElement;

locationSelect.addEventListener("change", () => {
    const selectedOption = locationSelect.options[locationSelect.selectedIndex];

    if (selectedOption) {
        if (selectedPin) {
            map.removeLayer(selectedPin);
        }
        selectedPin = null
        const lat = selectedOption.getAttribute("data-lat");
        const long = selectedOption.getAttribute("data-long");
        if (lat && long) {
            selectedPin = L.marker([parseFloat(lat), parseFloat(long)]).addTo(map);
        }
    }
});