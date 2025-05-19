const canvas = document.getElementById("friends-and-strangers");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const separation = 75;

// icon
const image = new Image();
image.src = 'rsc/face-icon.png';

function distance(p1, p2) {
	const d = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	return d;
}

function drawRandomParty() {
	let points = [];

	for (let i = 0; i < 6;) {
		const x = Math.random() * width;
		const y = Math.random() * height;
		const newPoint = {x: x, y: y};

		// Check if the new point is not to close to the others or too close to the border.
		let retry = false;
		
		if (newPoint.x < 20 || newPoint.x > width - 20)
			retry = true;

		if (newPoint.y < 20 || newPoint.y > height - 20)
			retry = true;

		for (let j = 0; j < points.length; j++) {
			if (distance(newPoint, points[j]) <= separation)
				retry = true;
		}



		if (retry)
			continue;
		else {
			points.push(newPoint);
			i++;
		}
	}

	// Check distances.
	// for (let i = 0; i < points.length; i++)
		// for (let j = i + 1; j < points.length; j++) {
			// console.log(distance(points[i], points[j]));
		// }

	// Draw edeges.
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			ctx.lineWidth = 3;

			if (Math.random() < 0.5)
				ctx.strokeStyle = "red";
			else
				ctx.strokeStyle = "blue";

			ctx.beginPath();
			ctx.moveTo(points[i].x, points[i].y);
			ctx.lineTo(points[j].x, points[j].y);
			ctx.stroke();
		}
	}

	// Draw points.
	points.forEach((p) => {
		ctx.drawImage(image, p.x - 25, p.y - 25, 50, 50);
	})

	// console.log(points);
}

image.onload = function () {
	drawRandomParty();
};

// The button reloads.
const reloadButton = document.getElementById("friends-and-strangers-button");
reloadButton.addEventListener("click", (e) => {
	ctx.clearRect(0, 0, width, height);
	drawRandomParty();
});


