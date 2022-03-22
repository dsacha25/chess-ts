import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../redux';

const useActions = () => {
	const dispatch = useDispatch();
	// return useMemo(
	// 	() => bindActionCreators(actionCreators, dispatch),
	// 	[dispatch]
	// );
};

export default useActions;
