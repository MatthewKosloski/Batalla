export const numberToWords = (n) => {
	let arr = ['zero', 'one', 'two', 'three', 'four', 'five'];
	return arr[n];
}

export const prettify = (str, capitalize) => {
	if(capitalize) {
		let result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
		return result.replace('_', ' ');
	} else {
		return str.replace('_', ' ');
	}
}

export const twoDigitString = (n) => n > 9 ? n.toString() : ('0' + n).toString();

export const getHoursMinutes = () => {
	const d = new Date();
	return `${twoDigitString(d.getHours())}:${twoDigitString(d.getMinutes())}`;
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const haveSamePair = (arr1, arr2) => {
	return arr1.map((a) => arr2.filter((b) => a[0] === b[0] && a[1] === b[1]).length > 0 ? true : false).indexOf(true) > -1 ? true : false;
}

export const generateCoordinatesForShips = (ships) => {
	const usedCoordinates = [];

	const generateCoordinatesForShip = (ship) => {
		const {length} = ship;
		const orientation = getRandomInt(0, 1) === 0 ? 'horizontal' : 'vertical';
		let coordinates = [];

		let x = getRandomInt(0, 9);
		let y = getRandomInt(0, 9);

		const getCrd = (i) => {
			let xOffset = Math.abs(length - x);
			let yOffset = Math.abs(length - y);
			return orientation === 'horizontal' ? [xOffset + i, yOffset] : [xOffset, yOffset + i];
		};

		let i = 0;
		while(i < length) {
			let crd = getCrd(i);
			if(!haveSamePair([crd], usedCoordinates)) {
				usedCoordinates.push(crd);
				coordinates.push(crd);
				i++;
			} else {
				x = getRandomInt(0, 9);
				y = getRandomInt(0, 9);
				coordinates = [];
				i = 0;
			}
		}

		return {...ship, coordinates, orientation};
	};

	return ships.map((ship) => generateCoordinatesForShip(ship));
};

export const calculateShipStyle = (isHorizontal, coordinates) => {
	const {length} = coordinates;
	const xCoordinates = getXCoordinates(coordinates);
	const yCoordinates = getYCoordinates(coordinates);
	const smallestX = getSmallestFromArray(xCoordinates);
	const smallestY = getSmallestFromArray(yCoordinates);
	return {
		width: isHorizontal ? `${length * 10}%` : '10%',
		height: isHorizontal ? '10%' : `${length * 10}%`,
		top: isHorizontal ? `${coordinates[0][1] * 10}%` : `${smallestY * 10}%`,
		left: isHorizontal ? `${smallestX * 10}%` : `${coordinates[0][0] * 10}%` 
	};
}

export const getSmallestFromArray = (array) => array.reduce((a,b) => Math.min(a,b));

export const getXCoordinates = (crds) => crds.map((crd) => crd[0]);

export const getYCoordinates = (crds) => crds.map((crd) => crd[1]);

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