/*********************************************** External Node modules ************************************************/
import { io } from 'socket.io-client';

/********************************************** Websocket configuration ***********************************************/
// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const URL = import.meta.env.VITE_SERVER_URL

const websocket = io(URL);
// const socket = io(URL, { autoConnect: false });

/********************************************** Named export (ES module) **********************************************/
export { websocket };
