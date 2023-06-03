import { useEffect, useState } from 'react';
import TabularGrid from './utils/TabularGrid';
import './dashboard.scss'
import { useDispatch, useSelector } from 'react-redux';
import { MainState} from '../redux/reducer'
import { MESSAGE_LOAD } from '../redux/actions'
function Dashboard() {
    const [items, setItem] = useState<any>([]);
    const [category, setCategory] =  useState('dogs')
    const [currentPage, setCurrentPage] = useState(1);    
    const [totalPages, setTotalPages] = useState(0)
    const message = useSelector((state: MainState) => state.messages.list)
    const dispatch = useDispatch()
    const itemsPerPage = 25

    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/search?api_key=cVkv8aYrkydsWVb4pwx2M7L5P4DA5FYQ&q=dogs&limit=25&offset=0&rating=g&lang=en')
            .then(res => res.json())
            .then((res)=> {
            setTotalPages(Math.ceil(200/ itemsPerPage))
            dispatch({ type: MESSAGE_LOAD, payload: res.data })
            })
    },[])
    
    useEffect(() => {        
      if(message && message[0]){
         setItem(message[0])
      }
        
    }, [message])
    const fetchData =  (type: string) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=cVkv8aYrkydsWVb4pwx2M7L5P4DA5FYQ&q=${type}&limit=25&offset=0&rating=g&lang=en`)
        .then(res => res.json())
        .then((res)=> {
            setTotalPages(Math.ceil(200/ itemsPerPage))
            dispatch({ type: MESSAGE_LOAD, payload: res.data })
        })
        setCurrentPage(1);
    }
        // Change the current page
    const handlePageChange = (type: string, pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=cVkv8aYrkydsWVb4pwx2M7L5P4DA5FYQ&q=${type}&limit=25&offset=${pageNumber}&rating=g&lang=en`)
        .then(res => res.json())
        .then((res)=> {
            setTotalPages(Math.ceil(200/ itemsPerPage))
            dispatch({ type: MESSAGE_LOAD, payload: res.data })
        })
    };

    return (
        <>  
            <div style={{marginTop: 2, width: '100%', display: 'block', float: 'left'}}>
                <button onClick={() => (setCategory('dogs'), fetchData('dog'))} className={category==='dogs' ? 'category-button active': 'category-button'}>Get Dogs</button> &nbsp;
                <button onClick={() => (setCategory('cats'), fetchData('cat'))} className={category==='cats' ? 'category-button active': 'category-button'}>Get Cats</button>
            </div>
        
            <div className="container">
                { items && items.length > 0 ? <TabularGrid data = {items} />  : 'Loading ...'}
            </div>
            <div className='pagination'>
                {/* Display pagination */}
                {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(category, pageNumber + 1)}
                    disabled={currentPage === pageNumber + 1}
                >
                    {pageNumber + 1}
                </button>
                ))}
            </div>  
        </>
    );
}

export default Dashboard;