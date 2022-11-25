export const urlSubIconReducer = (state, action) =>{
    switch(action.type){
    case 'LoadingIcon':
        return{
            ...state,
            isLoading: true,
            isError: false,
        };
    case 'GetIcon':
        return{
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload
        };
    case 'ErrorFetching':
        return{
            ...state,
            isLoading: false,
            isError: true,
        };
    default: throw new Error();
    };
} 