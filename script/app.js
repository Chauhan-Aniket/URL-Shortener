const longUrl = document.querySelector("#longUrl");
const shortedUrl = document.querySelector("#shortedUrl");
const shortUrlBtn = document.querySelector("#shortUrlBtn");
const qrcode = document.querySelector("#qrcode");
const img = document.querySelector("img");

const encodedParams = new URLSearchParams();

const options = {
	method: "POST",
	headers: {
		"content-type": "application/x-www-form-urlencoded",
		"X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
		"X-RapidAPI-Key": "a8a9a7c7b7msh5b2dd86aa0c13b2p1f8acfjsnb8e58486dd6e",
	},
	body: encodedParams,
};

function getQr(url) {
	let qr = new QRCode(qrcode, {
		text: url,
		width: 128,
		height: 128,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
	});
	return qr;
}

shortUrlBtn.addEventListener("click", (event) => {
	console.log(longUrl.value);
	const longUrlValue = longUrl.value;
	encodedParams.append("url", `${longUrlValue}`);
	event.preventDefault();

	fetch("https://url-shortener-service.p.rapidapi.com/shorten", options)
		.then((response) => response.json())
		.then((response) => {
			console.log(response);
			if (response.error) {
				shortedUrl.innerHTML = "Enter valid Url";
			} else {
				shortedUrl.innerHTML = `Shorted URL: <a href="${response.result_url}" target="_blank">${response.result_url}</a>`;
				getQr(response.result_url);
			}
		});
	qrcode.removeChild(qrcode.lastChild);
});
