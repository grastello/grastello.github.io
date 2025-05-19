const canvas = document.getElementById("scacchiera");
const ctx = canvas.getContext("2d");

const squareSize = 75;
const rowN = 8;
const colN = 8;

const colors = ["rgb(255 210 160)", "rgb(210 140 70)"];

/* globals */
queens = new Set([]);

function drawScacchiera() {
	for (let i = 0; i < rowN; i++) {
		for (let j = 0; j < colN; j++) {
			ctx.fillStyle = colors[(i + j) % 2];
			ctx.fillRect(j * squareSize,
						 i * squareSize,
						 squareSize,
						 squareSize);
		}
	}
}

canvas.addEventListener('mousedown', (e) => {
	if (e.button == 0) {
		const row = Math.floor(e.offsetY / squareSize);
		const col = Math.floor(e.offsetX / squareSize);

		if (queens.has({row: row, column: col})) {
			queens.delete({row: row, column: col});
		} else {
			queens.add({row: row, column: col});
		}

		queens.forEach((x) => {
			console.log(x);
		});
	}
})


drawScacchiera();

