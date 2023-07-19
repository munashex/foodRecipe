import {SyncLoader} from 'react-spinners' 


const Loader = () => {

    return ( 
    <div className="flex justify-center items-center">
        <SyncLoader loading={true} color="#164240"/>
    </div> 
    )
} 

export default Loader