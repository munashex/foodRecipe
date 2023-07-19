import React, {useContext} from 'react' 
import { Store } from '../store/store' 
import { Link } from 'react-router-dom' 
import {CiSquareRemove} from 'react-icons/ci'

function Favorite() { 
    const {favourites, FavDispatch} = useContext(Store)   

    
    
  return (
    <div className="mt-3">
     {favourites && favourites.length === 0 ? (
      <div>
        <h1 className="text-center">You do not have any favourites here.</h1>
      </div>
     ) : (
      <div> 
        <h1 className="text-center text-xl">Your favourites meals</h1> 

        <div className="grid mt-6 grid-cols-2 w-[90%] mx-auto md:grid-cols-3 lg:grid-cols-4 gap-2"> 
        {favourites.map((fav) => (
          <div className="relative">
          <Link key={fav.id} to={`/recipe/${fav.idMeal}`}> 
            <img src={fav.strMealThumb} alt={fav.strMeal}/> 
            <h1 className="text-center">{fav.strMeal}</h1>
          </Link>   
          <button  
          onClick={() => FavDispatch({type: "REMOVE_FAVOURITE", payload: fav})}
           className="absolute top-1 right-3 bg-white p-2 rounded-full">
            <CiSquareRemove size={30} color="red"/>
          </button>
          </div>
        ))}
      </div>
      </div>
     )}
    </div>
  )
}

export default Favorite