import Home from "./Pages/Home"   
import Navbar from "./components/Navbar" 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Catergory from "./Pages/Catergory"
import SingleFood from "./Pages/SingleFood" 
import Search from "./Pages/Search" 
import NotFound from "./Pages/NotFound"
import Favorite from "./Pages/Favorite"



const App = () => {

  return (
    <div className="textColor mb-2 w-[100%]">
     <BrowserRouter> 
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/category/:id" element={<Catergory/>}/>
     <Route path="/recipe/:slug" element={<SingleFood/>}/> 
     <Route path="/searched/:search" element={<Search/>}/> 
     <Route path="/favourites" element={<Favorite/>}/>
     <Route path="*" element={<NotFound/>}/>
     </Routes>
     </BrowserRouter> 
    </div>
  )
}
export default App