// React
import React, {useState} from "react";
import AddText from "./input/AddText"

// CSS
import "../css/Dropdown.css"

// Audio
import {Howl, Howler} from "howler"

// Dropdown arrow icons
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import AddEmbellishment from "./input/AddEmbellishment";

const arrowDown = <KeyboardArrowDownRoundedIcon />
const arrowUp = <KeyboardArrowUpRoundedIcon />

const Dropdown = (props) => {
    const {title, icon, items = []} = props;
    
    // Hooks
    const [open, setOpen] = useState(false);   

    // Open/Close the dropdown menu
    const toggle = () => {
        setOpen(!open);
    }
    
    // Toggle on click
    function handleOnClick(item) {
        toggle();
    };

    return (
        // Sidebar component
        <div>
            {title !== "Embellishments" && (
                <div
                    tabIndex={0}
                    className="dd-header"
                    role="button"
                    onKeyPress={() => toggle(open)}
                    onClick={() => toggle(open)}
                >
                    <div className="dd-header">
                        <p id="icon">{icon}</p>
                        <p id="title">{title}</p>

                        {/* Display arrrow */}
                        {items.length !== 0 && open && (
                            <p id="status">{arrowUp}</p>  
                            )}
                        {items.length !== 0 && !open && (
                            <p id="status">{arrowDown}</p>  
                            )}
                        {items.length === 0 && (
                            <p id="status-hide">{arrowDown}</p>  
                            )}
                    </div>
                </div>
            )}

            {/* Sidebard component: dropdown list */}
            {title === "Input" && (
                <AddText />
            )}
            {title == "Embellishments" && (
                <AddEmbellishment />
            )}
            {open && (
                <ul className="dd-list">
                    {title !== "Input" && (
                        items.map(item => (
                            <li className="dd-list-item" key={item.id}>
                                <button
                                    type="button"
                                    onClick={() => handleOnClick(item)}
                                >
                                    <p>{item.title}</p>
                                    <img src={item.img} alt=""/>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;