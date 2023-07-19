import {useReducer, createContext} from 'react' 

export const Store = createContext() 

const initialState = {
    favourites : []
} 

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_FAVOURITE": 
       let updatedFavorite = [...state.favourites, action.payload] 
       return {...state, favourites: updatedFavorite} 
       case "REMOVE_FAVOURITE": 
       return{...state, 
         favourites: state.favourites.filter((item) => item.idMeal !== action.payload.idMeal)}
       default: 
        return state
    }
}

const StoreProvider = ({children}) => {
const [{favourites}, FavDispatch] = useReducer(reducer, initialState) 

const value = {favourites, FavDispatch}

    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}

export default StoreProvider