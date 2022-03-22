const formatPhoneNumber = (phoneNumber: string): string | null => {
	if (phoneNumber.length < 10) return null;
	const re =
		/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
	const result = re.exec(phoneNumber);

	return result
		? `+${result[1]} (${result[2]}) ${result[3]} ${result[4]}`
		: null;
};

export default formatPhoneNumber;
