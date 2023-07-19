import {useReducer, useEffect, useContext} from 'react' 
import { useParams, Link } from 'react-router-dom' 
import Loader from '../components/Loader'  
import {IoIosArrowForward} from 'react-icons/io'
import {GrCheckmark} from 'react-icons/gr' 
import WhatWeHave from '../components/whatWeHave' 
import Jamaican from '../components/Jamaican' 
import { Store } from '../store/store' 
import {AiOutlineHeart} from 'react-icons/ai'  
import {toast} from 'react-toastify'  
import { Helmet } from 'react-helmet'

const initialState = {
  loading: false, 
  searched: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case "FETCHING":  
    return {loading: true} 
    case "FETCHED": 
    return {searched: action.payload, loading: false} 
    default: 
    return state
  }
}


function Search() { 
  
    const {search} = useParams() 
   
    const [{loading, searched}, dispatch] = useReducer(reducer, initialState)
    const {favourites, FavDispatch} = useContext(Store)  
    const AddToFavorite = (fav) => {
      FavDispatch({type: "ADD_TO_FAVOURITE", payload: fav})
      toast.success("added to favourites")
     }
   
    const fetchSearched = async () => {
      try {
       dispatch({type: "FETCHING"}) 
       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
       const data = await response.json()  
       dispatch({type: "FETCHED", payload: data.meals})
      }catch(err) {
        console.log(err)
      }
    }

  

    useEffect(() => {
   fetchSearched()
    }, [])

    if(!searched && !loading) { 
      return (
        <div className="flex flex-col justify-center items-center mt-4">
         
         <div className="flex flex-col items-center w-[90%] space-y-1 lg:w-[80%]">
          <h1 className="text-lg lg:text-xl">We found 0 results with "{search}"</h1> 
          <h1 className="flex items-center gap-1"><GrCheckmark size={25}/> Use maximum 3 filters</h1>
         </div>

         <h1 className="text-lg mt-3 lg:text-xl">These recipes may be of interest to you</h1>
        
        <div className="space-y-2 w-[90%] lg:w-[80%] mt-5">
       <WhatWeHave/> 
       <Jamaican/>
        </div> 

         <div className="w-[90%] lg:w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3  mt-8 ">
           
         </div>
        
    

        </div>
      )
    }

  return (
    <div className="flex flex-col justify-center items-center mt-4"> 
    <Helmet>
      <title>search for {search}</title>
    </Helmet>
       
        <div className="flex flex-row items-center w-[90%] space-x-2 lg:w-[80%]">
            <h1 className="text-lg textColor">Home</h1> 
             <IoIosArrowForward sie={30}/>
            <button disabled className="text-lg textColor bg-black px-2 text-white rounded-lg">{search}</button>
         </div> 

         <div className="mt-2 text-lg lg:text:xl">
          {searched && searched.length > 1 ? 
          `We found ${searched && searched.length} with ${search && search}` : null}
         </div>

        {loading ? <Loader/> : (
           <div className="w-[90%] lg:w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3  mt-8 ">
           {searched && searched.map((rec) => (
           <div className="relative"> 
             <Link key={rec.idMeal} to={`/recipe/${rec.idMeal}`}> 
              <img alt={rec.strMeal} src={rec.strMealThumb} 
              className="rounded-lg"
              /> 
              <h1 className="text-center textColor">{rec.strMeal}</h1>
            </Link> 
            <button onClick={() => AddToFavorite(rec)} className="absolute top-1 right-2 bg-white 
            p-1 rounded-full">
              <AiOutlineHeart   size={25} color="red"/>
            </button>
           </div>
           ))}
         </div>
        )}

        
    </div>
  )
}

export default Search