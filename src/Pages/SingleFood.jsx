import { useParams } from "react-router-dom" 
import { useReducer, useEffect } from "react"
import Loader from "../components/Loader" 
import { Link } from "react-router-dom" 
import {SlSocialYoutube} from 'react-icons/sl' 
import { Helmet } from "react-helmet"

const initialState = {
    recipe : [], 
    loading: false
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

const SingleFood = ()  => { 
    const {slug} = useParams() 
   

    const [{recipe, loading}, dispatch] = useReducer(reducer, initialState)
    
    const fetchRecipe = async () => {
        try {
         dispatch({type: "FETCHING"}) 
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${slug}`)
          const data = await response.json() 
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
     {loading ? ( 
        <div className="mt-8">
        <Loader/> 
        </div>
     ): (
        <div className="mt-6"> 
            {recipe.map((item) => (
                <div key={item.idMeal} className="flex flex-col lg:flex-row mx-4"> 
                   <Helmet>
                    <title>{item.strMeal}</title>
                   </Helmet>
                  <div className="lg:w-[50%] w-[100%] "> 
                  <img src={item.strMealThumb} className="w-[90%] mx-auto md:w-[40%] lg:w-[80%] lg:mx-0 rounded-md"/>
                  </div>
                
                   <div className="lg:w-[60%] w-[100%] mt-5 space-y-1"> 
                      <h1 className="text-2xl lg:text-2xl">{item.strMeal}</h1> 
                      <h1 className="text-lg">Category <Link to={`/category/${item.strCategory}`} className="text-[blue] underline">{item.strCategory || ""}</Link></h1>
                       <h1 className="text-md">{item.strInstructions}</h1>
                       
                       <div className="flex flex-row items-center gap-x-7"> 
                        {item.strYoutube ? <a href={item.strYoutube} className="flex mt-5 items-center gap-x-2">Watch Video   
                        <SlSocialYoutube size={34} color="red"/>
                        </a> : null}
                        {item.strArea ? <h1 className="mt-4 font-semibold">This dish {item.strArea} in Origin</h1>
                        : null}
                       </div>
                   </div> 
                
                 </div> 
            ))}
        </div>
     )}
    </div>
)
}

export default SingleFood