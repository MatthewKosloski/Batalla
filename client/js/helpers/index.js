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

export const areValidCoordinates = (crds) => {
	// array of x and y coordinates
	let x = crds.map((crd) => crd[0]);
	let y = crds.map((crd) => crd[1]);
	/*
		boolean values.  Maps over Xs and Ys and creates an array of booleans.  
		True if matches condition, else false.  Checks whether 
		there are and truthy values 
	*/
	let invalidX = x.map((x) => x < 0 || x > 9).indexOf(true) !== -1;
	let invalidY = y.map((y) => y < 0 || y > 9).indexOf(true) !== -1;
	// if either an x or y coorinate is invalid, return false (areCoordinatesValid? false.)
	return invalidX || invalidY ? false : true;
}