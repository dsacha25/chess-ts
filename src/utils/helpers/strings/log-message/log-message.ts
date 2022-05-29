const logMessage = (msg: any, color?: string): void => {
	return color ? console.log(`%c${msg}`, `color:${color}`) : console.log(msg);
};

export default logMessage;
