import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=>{
    const[articles,setArticles]=useState([]);
    const[page,setPage]=useState(1);
    const[loading,setLoading]=useState(true);
    const[totalResults,setTotalResults]=useState(0);
      
    
        
  
   


const updateNews=async ()=>{
  props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data=await fetch(url);
  let parsedData=await data.json();
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);

  props.setProgress(100);
}
const fetchMoreData=async ()=>{
  
  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&page=${page+1}&pageSize=${props.pageSize}`;
  setPage( page+1);
  let data=await fetch(url);
  let parsedData=await data.json();
  
  
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);    
    
  
}
useEffect(()=>{
  updateNews();
    document.title=`${props.category} - NewsMonkey`
},[])

const handlePrevClick=async ()=>{
  
setPage(page-1);
  updateNews();
  }
  
  const handleNextClick=async ()=>{
   
    
    setPage(page+1);
    updateNews();
  }

    return (
      <div>
        <h2 style={{marginTop:"90px"}}>NewsMonkey - Top Headlines on {props.category}</h2>
         {loading && <Spinner />} 
       
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner />}
        >
          < div className='container my-4'>
          <div className="row">
                {articles?.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage?"https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?s=612x612":element.urlToImage} newsUrl={element.url?element.url:""} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}
                </div>
                </div>
        </InfiniteScroll>
      
        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={page<=1} onClick={handlePrevClick} className='btn btn-dark'>&larr; Previous</button>
          <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" onClick={handleNextClick} className='btn btn-dark'>Next &rarr;</button>
        </div> */}
      
      </div>
    )
  

  }




  News.defaultProps={
  pageSize:6,
  country:"in",
  category:"general"
 }
 News.propTypes={
  country:PropTypes.string,
  category:PropTypes.string,
  pageSize:PropTypes.number
 }

export default News
