import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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
    constructor(){
        super();
        
    this.state={
        page:1,
        articles:[],
        loading:true,
    }
}



 async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    this.setState({loading:true});
    let parsedData=await data.json();
    
    
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })  
}
handlePrevClick=async ()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  let data=await fetch(url);
  let parsedData=await data.json();
  this.setState({
    articles:parsedData.articles,
    loading:true
  })  
 
  this.setState({
    page:this.state.page-1,
    loading:false
  }) 
  }
  
  handleNextClick=async ()=>{
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({
        articles:parsedData.articles,
        loading:true
      })  
     
      this.setState({
        page:this.state.page+1,
        loading:false
        
      }) 
    }
  
  }





  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
                {!this.state.loading && this.state.articles?.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage?"https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?s=612x612":element.urlToImage} newsUrl={element.url?element.url:""}/>
                </div>
                })}
        
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className='btn btn-dark'>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className='btn btn-dark'>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
