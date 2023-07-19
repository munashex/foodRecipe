import {AiOutlineSearch} from 'react-icons/ai'
import TopFood from '../components/TopFood'   
import { useState } from 'react' 
import {useNavigate} from 'react-router-dom' 
import {Helmet} from 'react-helmet'
 



const Home = () => {

    const [search, setSearched] = useState('')  
    const navigate = useNavigate()

    const submitSearch = (e) =>  {
     e.preventDefault() 
    navigate(`/searched/${search}`)
    }

    return (
         <div className="relative"> 

         <Helmet>
            <title>Whatsfordinner!</title>
         </Helmet>

         <div className="bg-[#bfcf60] z-1 w-full pt-3 md:pt-4 lg:pt-9 pb-20 ">  
         
         {/* search bar */}
        <div className="flex justify-center"> 

       <div className="relative">
       <form onSubmit={submitSearch}>
       <input 
        className="border outline-none textColor
        h-9 rounded-md px-10  placeholder:text-slate-800  text-lg -pb-1" 
        placeholder="Enter at least 3 letters"  
        required
        onChange={(e) => setSearched(e.target.value)}
        />
       </form>
        <div className="absolute top-1 left-2">
            <AiOutlineSearch size={25}/>
        </div>
        </div>

        </div>

        {/* description */}

        <h1 className="textColor text-2xl lg:text-4xl text-[#164240]
         font-thin text-center mt-5">Welcome to whatsfordinner!</h1>
         <h1 className="textColor text-xl lg:text-2xl text-[#164240] text-center mt-6">Discover our latest creations</h1>
        </div> 

        <div className="relative bottom-[50px]">
          <TopFood/>
        </div>
        
        </div>
    )
} 

export default Home