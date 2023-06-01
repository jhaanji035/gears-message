import { useEffect, useState } from 'react';
import TabularGrid from './utils/TabularGrid';
function Dashboard() {
    const [items, setItem] = useState<[]>([]);
    const [category, setCategory] =  useState('dogs')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 25
    const [totalPages, setTotalPages] = useState(0)
    // Calculate the indexes of the first and last items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(() => {
        fetch('https://api.giphy.com/v1/gifs/search?api_key=cVkv8aYrkydsWVb4pwx2M7L5P4DA5FYQ&q=dogs&limit=25&offset=0&rating=g&lang=en')
            .then(res => res.json())
            .then((res)=> (setItem(res.data), setTotalPages(Math.ceil(500/ itemsPerPage)), console.log(res)))
    },[])
    
    const fetchData =  (type: string) => {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=cVkv8aYrkydsWVb4pwx2M7L5P4DA5FYQ&q=${type}&limit=25&offset=0&rating=g&lang=en`)
        .then(res => res.json())
        .then((res)=> (setItem(res.data), setTotalPages(Math.ceil(500/ itemsPerPage)), console.log(res)))
        setCurrentPage(1);
    }
        // Change the current page
    const handlePageChange = (type: string, pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=cVkv8aYrkydsWVb4pwx2M7L5P4DA5FYQ&q=${type}&limit=25&offset=${pageNumber}&rating=g&lang=en`)
        .then(res => res.json())
        .then((res)=> (setItem(res.data), setTotalPages(Math.ceil(500/ itemsPerPage)), console.log(res)))
    };

    return (
        <div>  
            <div style={{marginTop: 2, width: '100%', display: 'block', float: 'left'}}>
                <button onClick={() => (setCategory('dogs'), fetchData('dog'))} className={category==='dogs' ? 'category-button active': 'category-button'}>Get Dogs</button> &nbsp;
                <button onClick={() => (setCategory('cats'), fetchData('cat'))} className={category==='cats' ? 'category-button active': 'category-button'}>Get Cats</button>
            </div>
            {/* Display pagination buttons */}
            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(category, pageNumber + 1)}
                    disabled={currentPage === pageNumber + 1}
                >
                    {pageNumber + 1}
                </button>
                ))}
            <div style={{marginTop: 30, margin: 'auto', width: '100%'}}>
                <TabularGrid data = {items} />     
                <div>
                {/* Display pagination buttons */}
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
            </div>
            
        </div>
    );
}

export default Dashboard;