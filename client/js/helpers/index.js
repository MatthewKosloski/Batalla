export const getSmallestFromArray = (array) => {
	return array.reduce((a,b) => Math.min(a,b));
}

export const haveSamePair = (arr1, arr2) => {
	return arr1.map((b) => arr2.filter((a) => a[0] === b[0] && a[1] === b[1]).length > 0 ? true : false).indexOf(true) > -1 ? true : false;
}

export const arraySplicer = (anArray, itemsToRemoveFromArray) => {
	let indices = itemsToRemoveFromArray.map((i) => anArray.map((j) => `${j[0]},${j[1]}`).indexOf(`${i[0]},${i[1]}`));
	let copyOfArray = [...anArray];
	let offset = 0;
	for(let i = 0; i < indices.length; i++){
		copyOfArray.splice(indices[i] - offset, 1);
		offset++;
	}
	return copyOfArray;
}

export const getIndexOfArray = (child, parent) => {
	return child.map((i) => parent.map((j) => `${j[0]},${j[1]}`).indexOf(`${i[0]},${i[1]}`))[0];
}

export const getXCoordinates = (crds) => {
	return crds.map((crd) => crd[0]);
}

export const getYCoordinates = (crds) => {
	return crds.map((crd) => crd[1]);
}