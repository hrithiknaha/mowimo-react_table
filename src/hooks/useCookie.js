import { useState } from "react";

const getItem = (key) =>
	document.cookie.split("; ").reduce((total, currentCookie) => {
		const item = currentCookie.split("=");
		const storedKey = item[0];
		const storedValue = item[1];

		return key === storedKey ? decodeURIComponent(storedValue) : total;
	}, "");

const setItem = (key, value, numberOfDays) => {
	const now = new Date();

	// set the time to be now + numberOfDays
	//everytime the cookie is set, that is everytime a new user, or the browser cache is deleted this setTime is called.
	now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);

	document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
};

/**
 *
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */

//Use Cookie is function used to set the cookies value and the duration of the cookie.
//This custom function is getting called from the components like the Table component or, Nashdaq component.
const useCookie = (key, defaultValue) => {
	const getCookie = () => getItem(key) || defaultValue;
	const [cookie, setCookie] = useState(getCookie());

	const updateCookie = (value, numberOfDays) => {
		setCookie(value);
		setItem(key, value, numberOfDays);
	};

	return [cookie, updateCookie];
};

export default useCookie;
