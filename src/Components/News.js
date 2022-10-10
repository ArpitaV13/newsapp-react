import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
       
    constructor(){
        super();
        
    this.state={

        articles:this.articles,
    }
}
 async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=3cd0bdaa7b374e059944d98bbdf1fcfd";
    let data=await fetch(url);
    let parsedData=await data.json();
   
    console.log(parsedData.articles);
    this.setState({
      articles:parsedData.articles
    })
    
}



  render() {
    return (
      <div className='container my-3'>
        <h2>NewsMonkey - Top Headlines</h2>
    
        <div className='row'>
                {this.articles?.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.imageUrl?element.urlToImage:""} newsUrl={element.url?element.url:""}/>
                </div>
                })}
        
        </div>
      </div>
    )
  }
}

export default News
