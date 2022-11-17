import React, { Component } from 'react'

export class NewsItem extends Component {
     
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={imageUrl} />
  <div className="card-body">
  <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
    {source}
    
  </span>
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Click Here!!</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
