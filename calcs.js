// function A(i, j) {
// 	return "A_{" + i + ", " + j + "}";
// }

// function B(i, j, k) {
// 	return	"\\neg(" + A(i, j) + "\\land " + A(j, k) + "\\land " + A(i,k) + ") \\land \\neg(\\neg " + A(i, j) + "\\land \\neg " + A(j, k) + "\\land \\neg " + A(i,k) + ")";
// }

// function P() {
// 	let p = "\\[";
// 	let c = 0;
	
// 	for (let i = 1; i <= 6; i++)
// 		for (let j = i + 1; j <= 6; j++)
// 			for (let k = j + 1; k <= 6; k++) {
// 				p += B(i, j, k);
// 				p += "\\land";
// 				c++;

// 				if (c % 2 == 0)
// 					p += " \\\\ ";
// 			}

// 	p = p.slice(0, -9);
// 	p += "\\]";
// 	return p;
// }

// function pairToId(i, j, sign) {
// 	switch (i) {
// 	case 1:
// 		a = j - 1;
// 		break;
// 	case 2:
// 		a = 5 + j - 2;
// 		break;
// 	case 3:
// 		a = 9 + j - 3;
// 		break;
// 	case 4:
// 		a = 12 + j - 4;
// 		break;
// 	case 5:
// 		a = 14 + j - 5;
// 		break;
// 	default:
// 		console.log("YOOOOO! (%d, %d)", i, j);
// 	}

// 	if (sign)
// 		return a;
// 	else
// 		return "-" + a;
// }

// function CNF() {
// 	let p = "p cnf 15 40 \n";

// 	for (let i = 1; i <= 6; i++)
// 		for (let j = i + 1; j <= 6; j++)
// 			for (let k = j + 1; k <= 6; k++) {
// 				p += pairToId(i, j, false) + " " + pairToId(j, k, false) + " " + pairToId(i, k, false) + " 0\n";
// 				p += pairToId(i, j, true) + " " + pairToId(j, k, true) + " " + pairToId(i, k, true) + " 0\n";
// 			}

// 	return p;
// }

function subsets(a) {
	let n = a.length;
	let res = [];

	for (let i = 0; i < (1 << n); i++) {
		// let subset = new Set();
		let subset = [];
		for (let j = 0; j < n; j++) {
			if (i & (1 << j)) {
				subset.push(a[j]);
			}
		}
		res.push(subset);
	}

	return res;
}

function subsetsN(array, n) {
	let ss = subsets(array);
	let res = [];

	ss.forEach((s) => {
		if (s.length == n) {
			res.push(s);
		}
	})

	return res;
}

function enumeration(x, y) {
	if (x == 1) return y - 1;

	let res = 0;
	for (let i = 1; i < x; i++)
		res += 18 - i;
	res += y - x;

	return res;
}

const partyMembers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
const redSubsets = subsetsN(partyMembers, 3);
const blueSubsets = subsetsN(partyMembers, 8);

// const atomicN = 153;
const atomicN = partyMembers.reduce((acc, num) => acc + num, 0) - partyMembers.length;
const clausesN = redSubsets.length + blueSubsets.length;

function CNF() {
	let s = "p cnf " + atomicN + " " + clausesN + "\n";

	redSubsets.forEach((set) => {
		let s1 = "";
		// let s2 = "";

		for (let i = 0; i < set.length; i++) {
			if (i == set.length - 1) {
				s1 += enumeration(set[0], set[i]) + " ";
				// s2 += "-" + enumeration(set[0], set[i]) + " ";
			} else {
				s1 += enumeration(set[i], set[i + 1]) + " ";
				// s2 += "-" + enumeration(set[i], set[i + 1]) + " ";
			}
		}

		s1 += "0\n";
		// s2 += "0\n";

		s += s1;
		// s += s2;
	});

	blueSubsets.forEach((set) => {
		let s1 = "";
		// let s2 = "";

		for (let i = 0; i < set.length; i++) {
			if (i == set.length - 1) {
				s1 += "-" + enumeration(set[0], set[i]) + " ";
				// s2 += "-" + enumeration(set[0], set[i]) + " ";
			} else {
				s1 += "-" + enumeration(set[i], set[i + 1]) + " ";
				// s2 += "-" + enumeration(set[i], set[i + 1]) + " ";
			}
		}

		s1 += "0\n";
		// s2 += "0\n";

		s += s1;
		// s += s2;
	});

	return s;
}

console.log(CNF());
