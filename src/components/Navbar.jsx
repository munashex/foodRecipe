import {HiBars2} from 'react-icons/hi2'  
import {AiOutlineClose} from 'react-icons/ai'
import { useContext, useState } from 'react'  
import { Link } from 'react-router-dom' 
import { Store } from '../store/store' 
import {AiOutlineHeart} from 'react-icons/ai'


const Navbar = () => { 
  const [isOpen, setIsOpen ] = useState(false)   
  const [dropDown, setIsDropDown] = useState(true)  

  const {favourites} = useContext(Store)   
  localStorage.clear()
 
  const toggleDropDown = () => {
    setIsDropDown(!dropDown)
  }

  const ToggleNav = () => {
    setIsOpen(!isOpen)
  }

    return (
          <div className='bg-[#164240] text-white textColor p-4'> 
         <div className="flex items-center justify-between">

          <div className="flex items-center gap-x-4">
      <Link to="/" className="textColor text-2xl">Whatsfordinner</Link>   
    <Link className="relative" to="/favourites">
    <AiOutlineHeart size={38} color="white"/> 
    <h2 className="absolute top-1.5 right-3.5 text-red-500 font-bold">
      {favourites && favourites.length}</h2>
    </Link>
       </div> 

      <div className="hidden sm:flex"> 
        <button className="textColor text-lg" 
        onClick={toggleDropDown}
        >Categories</button> 
      </div>   

     

    
      <div className="flex sm:hidden"> 
      <button onClick={ToggleNav}>
        {isOpen ? <AiOutlineClose size={30}/> : <HiBars2 size={35}/>}
        </button> 
      </div> 
        </div> 

        <div className={isOpen ? `flex textColor flex-col divide-y divide-slate-300    items-center font-bold sm:hidden` : `hidden`}>
        <Link to="/category/Seafood"  onClick={() => setIsOpen(false)}>Sea Food</Link>   
          <Link to="/category/Vegetarian" onClick={() => setIsOpen(false)}>Vegetarian</Link>    
          <Link to="/category/Chicken" onClick={() => setIsOpen(false)}>Chicken</Link>    
          <Link to="/category/Beef" onClick={() => setIsOpen(false)}>Beef</Link>   
          <Link to="/category/Pork" onClick={() => setIsOpen(false)}>Pork</Link> 
          <Link to="/category/Miscellaneous" onClick={() => setIsOpen(false)}>Miscellaneous</Link> 
        </div>

      
      
   {dropDown && (
    <div className="hidden sm:flex textColor justify-start font-bold items-center my-1 space-x-5"> 
           <Link to="/category/Seafood" onClick={() => setIsDropDown(false)}>Sea Food</Link>   
          <Link to="/category/Vegetarian" onClick={() => setIsDropDown(false)}>Vegetarian</Link>    
          <Link to="/category/Chicken" onClick={() => setIsDropDown(false)}>Chicken</Link>    
          <Link to="/category/Beef" onClick={() => setIsDropDown(false)}>Beef</Link>   
          <Link to="/category/Pork" onClick={() => setIsDropDown(false)}>Pork</Link>   
          <Link to="/category/Miscellaneous" onClick={() => setIsDropDown(false)}>Miscellaneous</Link>
   
       
           <button className="absolute right-9">
            <AiOutlineClose size={26} onClick={() => setIsDropDown(false)}/>
           </button>
    </div>
   )}
        
       </div>
    )
}

export default Navbar