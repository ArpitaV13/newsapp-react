import React, { Component } from 'react'

export class NewsItem extends Component {
     
  render() {
    let {title,description,imageUrl,newsUrl}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem",height:"25rem"}}>
  <img className="card-img-top" src={imageUrl}x />
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Click Here!!</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
