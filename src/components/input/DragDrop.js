import React, { Component } from "react";
import "../../css/DragAndDrop.css"

class DragDrop extends Component{
    constructor(props) {
        /* 
            * A contructor is the only place where we are expected to change the state
            * by directly overwriting this.state fields. In all other scenarios, we
            * have to use this.setState
        */

        super(props);
        
        // Initialize the state
        this.state = {
            size: props.size,
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
            title: props.children
        }

        // Bind the event handlers
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
            diffX: (e.clientX + 400) - e.currentTarget.getBoundingClientRect().left,
            diffY: (e.clientY + 100) - e.currentTarget.getBoundingClientRect().top,
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

    /*
        * Invoked immnediately after a component and all its child componentS have been rendered to the DOM
        * This is where you cause side effects where you interact with the DOM
    
    */
    componentDidMount() {
        // console.log("DragDrop component succesfully mounted")
    }
    
    /*
        * Do not change the state of the component in the render function
        * The only required method in a class component
    */
    render () {
        return (
            <div
                className="card"
                style={ this.state.styles }
                onMouseDown={ this._dragStart }
                onMouseMove={ this._dragging }
                onMouseUp={ this._dragEnd }
            >
                    {/* <p>{this.state.title}</p> */}
                    <p style={{ fontSize: this.state.size }}
                    >
                        {this.state.title}
                    </p>
            </div> 
        )
    }
}

export default DragDrop;