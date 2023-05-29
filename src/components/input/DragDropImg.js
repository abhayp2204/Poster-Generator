import React, { Component } from "react";
import "../../css/DragAndDrop.css"

class DragDropImg extends Component{
    constructor(props) {
        super(props);
        console.log("size = ", props.size)
        
        this.state = {
            title: props.children,
            size: props.size,
            // size: "00px",

            entry: true,
            offsetX: 0,
            offsetY: 0,

            margin_check: false,
            top_margin: 0,
            bottom_margin: 820,
            left_margin: -40,
            right_margin: 750,

            diffX: 0,
            diffY: 0,

            dragging: false,
            styles: {},
        }

        this._dragStart = this._dragStart.bind(this)    
        this._dragging = this._dragging.bind(this)    
        this._dragEnd = this._dragEnd.bind(this)    
    }
    
    _dragStart(e) {
        function pauseEvent(e){
            if(e.stopPropagation) e.stopPropagation();
            if(e.preventDefault) e.preventDefault();
            e.cancelBubble=true;
            e.returnValue=false;
            return false;
        }

        e=e || window.event;
        pauseEvent(e);

        // Execute only once
        if(this.state.entry) {
            this.state.offsetX = e.currentTarget.getBoundingClientRect().left;
            this.state.offsetY = e.currentTarget.getBoundingClientRect().top;
            this.state.entry = false;
        }
        this.setState({
            diffX: (e.clientX + this.state.offsetX) - e.currentTarget.getBoundingClientRect().left,
            diffY: (e.clientY + this.state.offsetY) - e.currentTarget.getBoundingClientRect().top,
            dragging: true,
        })
    }
    
    _dragging(e) {
        function pauseEvent(e){
            if(e.stopPropagation) e.stopPropagation();
            if(e.preventDefault) e.preventDefault();
            e.cancelBubble=true;
            e.returnValue=false;
            return false;
        }

        e=e || window.event;
        pauseEvent(e);
        
        if(this.state.dragging) {
            var left = e.clientX - this.state.diffX;
            var top = e.clientY  - this.state.diffY;

            if(this.state.margin_check) {
                if(top < this.state.top_margin)
                top = this.state.top_margin
                if(top + 60 > this.state.bottom_margin)
                top = this.state.bottom_margin - 60
                if(left < this.state.left_margin)
                left = this.state.left_margin
                if(left + 100 > this.state.right_margin)
                left = this.state.right_margin
            }
            
            this.setState({
                styles: {
                    left: left,
                    top: top,
                    border: "2px dashed black"
                }
            });
        }
    }
    
    _dragEnd(e) {
        var left = e.clientX - this.state.diffX;
        var top = e.clientY  - this.state.diffY;

        if(this.state.margin_check) {
            if(top < this.state.top_margin)
                top = this.state.top_margin
            if(top + 60 > this.state.bottom_margin)
                top = this.state.bottom_margin - 60
            if(left < this.state.left_margin)
                left = this.state.left_margin
            if(left + 100 > this.state.right_margin)
                left = this.state.right_margin
        }

        this.setState({
            dragging: false,
            styles: {
                left: left,
                top: top,
                border: "none",
            }
        })
    }
    
    render () {
        return (
            <div
                className="cardimg"
                style={ this.state.styles }
                onMouseDown={ this._dragStart }
                onMouseMove={ this._dragging }
                onMouseUp={ this._dragEnd }
            >
                <img src={this.state.title} width={this.state.size} alt="" />
                <p className="invisible">__</p>
            </div> 
        )
    }
}

export default DragDropImg;
