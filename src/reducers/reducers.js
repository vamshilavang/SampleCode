export var setInitialValuesReducer = (state=initialState, action) => {
	switch(action.type){
		case 'SET_INITIAL_VALUES': 
		 return action.value;
		default:
		 return state;
	}
}