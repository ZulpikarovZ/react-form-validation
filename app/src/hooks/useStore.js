import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updatedState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};
