
import "./style.css"
import React, { Component } from 'react';

export default class RecipeSlideShow extends Component {
    render(){
        const {imgsrc, imgalt, imgtext, decrSlide, incrSlide} = this.props;
        return(
            <div className="slideshow-container">
            <div className="">
            <img src={imgsrc} alt={imgalt} height="380px" width="570px"/>
            <div className="text">{imgtext}</div>
            </div>

            <p className="prev" onClick={decrSlide}>&#10094;</p>
            <p className="next" onClick={incrSlide}>&#10095;</p>
            <div className="dot-container">
                <span className="dot"></span>
                <span className="dot"></span> 
                <span className="dot"></span> 
            </div>
        </div>
        )
    }

};