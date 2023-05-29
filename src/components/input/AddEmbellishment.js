import React, {useState} from 'react'
import DragDropImg from "./DragDropImg"

// CSS
import "../../css/Embellishment.css"

// Slider
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"

// Audio
import {Howl, Howler} from "howler"
import DeleteSoundEffect from "../../audio/trash.mp3"
import Whatsapp from "../../audio/whatsapp.mp3"

// Icons
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import AcUnitRoundedIcon from "@material-ui/icons/AcUnitRounded";

const arrowDown = <KeyboardArrowDownRoundedIcon />
const arrowUp = <KeyboardArrowUpRoundedIcon />

// Images
let snow = require("../../images/embellishments/snowflakes.png")
let fire = require("../../images/embellishments/fire.png")
let smoke = require("../../images/embellishments/smoke.png")

const EmbellishmentOptions = [
    {
        id: 1,
        name: "snow",
        pic: snow,
        num: 0,
    },
    {
        id: 2,
        name: "fire",
        pic: fire,
        num: 0,
    },
    {
        id: 3,
        name: "smoke",
        pic: smoke,
        num: 0,
    }
]

const marks = [
    {
        value: 0
    },
    {
        value: 25
    },
    {
        value: 50
    },
    {
        value: 75
    },
    {
        value: 100
    },
]

function AddEmbellishment() {

    // Hooks
    const [EmbellishmentData, setEmbellishmentData] = useState([])
    const [image, setImage] = useState("")
    const [open, setOpen] = useState(false);  
    const [sliderTracker, setSliderTracker] = useState(0); 

    const handleChange = (e, newValue, id) => {
        e.preventDefault()
        console.log("AddText: Slider moved    nv = ", newValue)

        EmbellishmentData.map((item) => {
            if(item.id === id) {
                switch (newValue) {
                    case 0: {
                        item.size = "50"
                        break;
                    }
                    case 25: {
                        item.size = "100"
                        break;
                    }
                    case 50: {
                        item.size = "150"
                        break;
                    }
                    case 75: {
                        item.size = "200"
                        break;
                    }
                    case 100: {
                        item.size = "250"
                        break;
                    }
                }
            }
            item.id *= 10
        })

        setEmbellishmentData([...EmbellishmentData]);
        setSliderTracker(newValue)

        console.log("TBD = ", EmbellishmentData)
    };


    function handleAddEmbellishment(e, value) {
        e.preventDefault()
        
        EmbellishmentData.push({
            // id: EmbellishmentData.length + 1,
            id: Math.floor(Math.random() * 100),
            name: value.name,
            img: value.pic,
            size: "400px"
        })
        
        EmbellishmentOptions.map((item, key) => {
            if(item.name == value.name) {
                item.num += 1
            }
        })
        
        console.log(value.name + " embellishment added!")
        setEmbellishmentData([...EmbellishmentData]) 
        SoundPlay(Whatsapp)
    }
    
    function handleDelete(value) {
        console.log(value.name + " embellishment deleted!")
        SoundPlay(DeleteSoundEffect);
        setEmbellishmentData(EmbellishmentData.filter(item => item.name !== value.name))
    }

    // Toggle on click
    function handleOnClick(item) {
        toggle();
    };

    // Open/Close the dropdown menu
    const toggle = () => {
        setOpen(!open);
    }

    function handleOnMouseEnter(sound) {
        SoundPlay(sound);
    };

    // Play audio
    const SoundPlay = (src) => {
        const sound = new Howl({src});
        Howler.volume(0.6);
        sound.play();
    }


    return (
        <>
            <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onKeyPress={() => toggle(open)}
                onClick={() => toggle(open)}
            >
                <div className="dd-header">
                    <p id="icon"><AcUnitRoundedIcon /></p>
                    <p id="title">Embellishments</p>

                    {/* Display arrrow */}
                    {EmbellishmentOptions.length !== 0 && open && (
                        <p id="status">{arrowUp}</p>  
                    )}
                    
                    {EmbellishmentOptions.length !== 0 && !open && (
                        <p id="status">{arrowDown}</p>  
                    )}
                    {EmbellishmentOptions.length === 0 && (
                        <p id="status-hide">{arrowDown}</p>  
                    )}
                </div>
            </div>
            
            <div className="embellishment-sidebar">
                {EmbellishmentOptions.length > 0 && open && (
                    EmbellishmentOptions.map((value, key) => {
                        return (
                            <div className="embellishment-list-item" key={key}>
                                <img id="el-img" src={value.pic} alt="" onClick={(e) => handleAddEmbellishment(e, value)} />
                                <Slider
                                    aria-label="Font Size Slider"
                                    defaultValue={sliderTracker}
                                    marks={marks}
                                    step={25}
                                    onChangeCommitted={(e, newValue) => handleChange(e, newValue,  value.id)}
                                    key={sliderTracker}
                                    valueLabelDisplay="off"
                                />
                                <p
                                    id="el-icon"
                                    onClick={() => handleDelete(value)}
                                >
                                    <DeleteRoundedIcon key={key} />
                                </p>
                            </div>
                        )
                    })
                )}
            </div>
            <div className="embellishment-workspace">
                {EmbellishmentData.map((value) => {
                    console.log("size = ", value.size)
                    return (
                        // * : React cannot work with lists without keys
                        // * : Pass the key to each component to uniquely identify each component
                        // * : Without keys, deleting any component results in the last component   being deleted everytime
                        <DragDropImg
                            size={value.size}
                            key={value.id}
                        >
                            {value.img}
                        </DragDropImg>
                    )
                })}
            </div>
        </>
    )
}

export default AddEmbellishment