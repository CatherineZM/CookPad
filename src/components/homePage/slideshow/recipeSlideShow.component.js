
import "./style.css"
import React, { Component } from 'react';

export default class RecipeSlideShow extends Component {
    render(){
        const {imgsrc, imgalt, imgtext, decrSlide, incrSlide} = this.props;
        return(
            <div className="slideshow-container">
                <img id="slides" src={imgsrc} alt={imgalt} width="400px" height="250px"/>
                <div className="caption-text">{imgtext}</div>

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