import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    
       static defaultProps={
        pageSize:6,
        country:"in",
        category:"general"
       }
       static propTypes={
        country:PropTypes.string,
        category:PropTypes.string,
        pageSize:PropTypes.number
       }
    constructor(props){
        super(props);
        
    this.state={
        page:1,
        articles:[],
        loading:true,
        totalResults:0
    }
    document.title=`${this.props.category} - NewsMonkey`
}

async updateNews(){
  this.props.setProgress(10);
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data=await fetch(url);
  let parsedData=await data.json();
  console.log(parsedData);
  this.setState({
    articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false,
    
  })  
  this.props.setProgress(100);
}
fetchMoreData=async ()=>{
  this.setState({page: this.state.page+1});
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&page=${this.state.page}&pageSize=${this.props.pageSize}`;

  let data=await fetch(url);
  let parsedData=await data.json();
  console.log(parsedData);
  this.setState({
    articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults,
    loading:false,
    
  })  
}

 async componentDidMount(){
    this.updateNews(); 
}
handlePrevClick=async ()=>{
  console.log("sduj");
  this.setState({page:this.state.page-1});
  this.updateNews();
  }
  
  handleNextClick=async ()=>{
    console.log("sdujjioo");
    
    this.setState({page:this.state.page+1});
    this.updateNews();
  }


k


  render() {
    return (
      <>
        <h2>NewsMonkey - Top Headlines on {this.props.category}</h2>
         {this.state.loading && <Spinner />} 
       
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}
        >
          < div className='container'>
          <div className="row">
                {this.state.articles?.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage?"https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?s=612x612":element.urlToImage} newsUrl={element.url?element.url:""} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}
                </div>
                </div>
        </InfiniteScroll>
      
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className='btn btn-dark'>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className='btn btn-dark'>Next &rarr;</button>
        </div>
      
      </>
    )
  }
}

export default News
