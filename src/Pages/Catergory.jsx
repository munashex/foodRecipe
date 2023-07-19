import { Link, useParams } from "react-router-dom" 
import {IoIosArrowForward} from 'react-icons/io'
import { useState, useEffect , useContext} from "react"  
import {AiOutlineHeart} from 'react-icons/ai'  
import { Store } from "../store/store"  
import {toast} from 'react-toastify' 
import { Helmet } from "react-helmet"




const Catergory = () =>  {

    const {id} = useParams()   
   const {favourites, FavDispatch} = useContext(Store)   

   const AddToFavorite = (fav) => {
    FavDispatch({type: "ADD_TO_FAVOURITE", payload: fav})
    toast.success("added to favourites")
   }
  

    const [category, setCategory] = useState([])   
    const [recipe, setRecipe] = useState([])
 
  
    
  
     useEffect(() => {
     const fetchCategory = async () => {
        const cat = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php') 
        const data = await cat.json() 
        let findCategory = data.categories.find((cat) => cat.strCategory === id)
        setCategory(findCategory)
      
     }
     fetchCategory()
     }, [id, category])


     useEffect(() => {
     const getCategory = async () => {
     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`) 
     const data = await response.json()   
     setRecipe(data.meals)
     }
     getCategory()
     }, [id, recipe])


    return (
        <div className="flex flex-col justify-center items-center mt-4">
         
         <div className="flex flex-row items-center w-[90%] space-x-2 lg:w-[80%]">
            <h1 className="text-lg textColor">Home</h1> 
             <IoIosArrowForward sie={30}/>
            <button disabled className="text-lg textColor bg-black px-2 text-white rounded-lg">{id}</button>
         </div>
        
        <div className="space-y-2 w-[90%] lg:w-[80%] mt-5"> 
        <Helmet>
          <title>{category.strCategory}</title>
        </Helmet>
        <h1 className="text-2xl lg:text-3xl textColor">{category.strCategory}</h1>
        <h1 className="font-thin textColor">{category.strCategoryDescription}</h1>
        <img src={category.strCategoryThumb} 
        alt={category.strCategory}  
        className="mx-auto max-sm rounded-lg mt-1"
        />
        </div> 

         <div className="w-[90%] lg:w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3  mt-8 ">
           {recipe && recipe.map((rec) => (
            <div className="relative">
            <Link key={rec.idMeal} to={`/recipe/${rec.idMeal}`}> 
              <img alt={rec.strMeal} src={rec.strMealThumb} 
              className="rounded-lg"
              /> 
              <h1 className="text-center textColor">{rec.strMeal}</h1>
            </Link>  
            <button  
            onClick={() => AddToFavorite(rec)}
            className="absolute top-1 right-2 bg-white p-2 rounded-full">
            <AiOutlineHeart size={25} color="red"/>
            </button>
            </div>
           ))}
         </div>
        
    

        </div>
    )
}

export default Catergory 