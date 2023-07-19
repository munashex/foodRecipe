import {useReducer, useEffect, useContext} from 'react'
import {CarouselProvider, Slider, Slide} from 'pure-react-carousel' 
import 'pure-react-carousel/dist/react-carousel.es.css'
import Loader from './Loader' 
import {Link} from 'react-router-dom' 
import FavouriteRecipe from './FavouriteRecipe' 
import WhatWeHave from './whatWeHave' 
import Jamaican from './Jamaican'
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

function TopFood() { 

 const {favourites, FavDispatch} = useContext(Store)  

 

 const AddToFavorite = (fav) => {
  FavDispatch({type: "ADD_TO_FAVOURITE", payload: fav})
  toast.success("added to favourites")
 }


 
  const [{loading, recipe}, dispatch] = useReducer(reducer, initialState)  

  const fetchRecipe = async () => {
    try{
    dispatch({type: "FETCHING"}) 
    const food = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian")
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
    <div>
      {loading && <Loader/>}
      <CarouselProvider 
      naturalSlideWidth={100} 
      naturalSlideHeight={125} 
      totalSlides={recipe && recipe.length} 
      visibleSlides={1} 
      // isPlaying={true}                                            
      //  interval={5000}
      >
        <Slider className="grid grid-cols-2 lg:grid-cols-3 w-[100%] lg:w-[50%]   lg:mx-[25%]">
          {recipe && recipe.map((rec) => (
            <Slide key={rec.idMeal}>
             <div className='mx-2 relative'>
            <Link to={`/recipe/${rec.idMeal}`}>
            <img src={rec.strMealThumb} alt={rec.strMeal} 
             className="rounded-md"  
              />
            </Link>
              <h1 className='textColor text-center'>{rec.strMeal}</h1> 
              <div className="absolute top-2 right-2">
                <button 
                onClick={() => AddToFavorite(rec)}
                className="bg-white p-1 rounded-full hover:bg-sky-500">
                  <AiOutlineHeart size={25} color="red"/>
                </button>
              </div>
             </div>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>

      <>
      <FavouriteRecipe/>
      <WhatWeHave/>
      <Jamaican/> 
      {loading ? null : (
        <footer className="text-center mt-5 space-y-2"> 
        <h1 className="text-xl font-semibold">Explore the whatsfordinner</h1>
          <div className="grid grid-cols-3  bg-[#bfcf60]   p-2 text-[black] decoration-clone underline">
         <Link to="category/Vegan">Vegan</Link> 
         <Link to="category/Seafood">Sea food</Link> 
         <Link to="category/Starter">Starter</Link> 
         <Link to="category/Side">Side</Link> 
         <Link to="category/Dessert">Dessert</Link> 
         <Link to="category/Vegetarian">Vegetarian</Link>
          </div>
       <p> This website uses external links. Built by Munashe</p>
        </footer>
      )}
      </>

    </div>
  )
}

export default TopFood