const verifyStripeSessionId = (queryString: string): boolean => {
	return queryString.substring(0, 7) === 'cs_test' ? true : false;
};

export default verifyStripeSessionId;
