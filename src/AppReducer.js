export const articlesReducer = (state, action) =>{
    switch(action.type){
    case 'LoadingArticles':
        return{
            ...state,
            isLoading: true,
            isError: false,
        };
    case 'GetArticles':
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