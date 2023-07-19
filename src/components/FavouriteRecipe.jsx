import {useReducer, useEffect, useContext} from 'react'
import {CarouselProvider, Slider, Slide} from 'pure-react-carousel' 
import 'pure-react-carousel/dist/react-carousel.es.css'
import Loader from './Loader' 
import {Link} from 'react-router-dom' 
import {AiOutlineHeart} from 'react-icons/ai'  
import { Store } from '../store/store' 
import {toast} from 'react-toastify'


const initialState = {
  loading: false, 
  recipe: [], 
} 

const reducer = (state, action) => {
  switch(action.type) {
    case "FETCHING": 
    return {loading: true} 
    case "FETCHED": 
    return {recipe: action.payload, loading: false} 
    default: 
    return state
  }
}

function FavouriteRecipe() {  

  const {favourites, FavDispatch} = useContext(Store)  

 

 const AddToFavorite = (fav) => {
  FavDispatch({type: "ADD_TO_FAVOURITE", payload: fav})
  toast.success("added to favourites")
 }

 
  const [{loading, recipe}, dispatch] = useReducer(reducer, initialState)  

  const fetchRecipe = async () => {
    try{
    dispatch({type: "FETCHING"}) 
    const food = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian")
    const data = await food.json() 
    dispatch({type: "FETCHED", payload: data.meals})
  }catch(err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
   fetchRecipe()
  }, [])


  return (
   loading ? null : (
    <div>
    <h1 className="text-center  text-lg lg:text-xl mb-3"> 
    Learn about our favorite recipes</h1>
  <CarouselProvider 
  naturalSlideWidth={100} 
  naturalSlideHeight={125} 
  totalSlides={recipe && recipe.length} 
  visibleSlides={1} 
  //  isPlaying={true} 
  //  interval={5000}
  >
    <Slider className="grid grid-cols-1 md:grid-cols-2 w-[100%] lg:w-[50%]   lg:mx-[25%]">
      {recipe && recipe.map((rec) => (
        <Slide key={rec.idMeal}>
         <div className='mx-2'>
        <Link to={`/recipe/${rec.idMeal}`}>
          <div className="relative">
        <img src={rec.strMealThumb} alt={rec.strMeal} 
         className="rounded-md"  
          />
         </div>
        </Link> 
        <button 
          onClick={ () => AddToFavorite(rec)}
           className="absolute top-1 right-3 bg-white p-1 rounded-full"> 
          <AiOutlineHeart size={30} color="red"/>
          </button>
       
          <h1 className='textColor text-center'>{rec.strMeal}</h1>
         </div>
        </Slide>
      ))}
    </Slider>
  </CarouselProvider>
</div>
   )
  )
}

export default FavouriteRecipe