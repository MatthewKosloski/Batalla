import {generateCoordinatesForShips} from '../helpers';
import shipsSchema from './shipsSchema';

const initialShips = generateCoordinatesForShips(shipsSchema);

export default initialShips;
