import React, { useState } from "react";
import DragDrop from "./DragDrop";
import Progress from './upload';
import useEventListener from "@use-it/event-listener"

// Slider
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"

// CSS
import "../../css/TextInput.css";

// Upload image
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, storageRef } from "../../services/firebase";

// Audio
import { Howl, Howler } from "howler";
import DeleteSoundEffect from "../../audio/trash.mp3";
import Whatsapp from "../../audio/whatsapp.mp3";

// Icons
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";

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

function AddText() {
    // Hooks
    const [open, setOpen] = useState(true);
    const [TextboxData, setTextboxData] = useState([]);
    const [primaryTitle, setPrimaryTitle] = useState("Primary text");
    const [image, setImage] = useState("");

    function toggle() {
        setOpen(!open);
    }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   let text = e.target[0].placeholder;

  //   TextboxData.push({
  //     id: TextboxData.length + 1,
  //     title: text,
  //   });

  //   console.log("Text-box added! (" + text + ")");
  //   setTextboxData([...TextboxData]);
  //   SoundPlay(Whatsapp);
  // }

  // function handleDelete(value) {
  //   console.log("Text-box deleted!");
  //   SoundPlay(DeleteSoundEffect);
  //   setTextboxData(TextboxData.filter((item) => item.id !== value.id));
  // }

  // const upload = () => {
  //   if (image == null) return;
  //   uploadBytesResumable(storageRef, image)
  //     .then((snapshot) => {
  //       console.log("Uploaded", snapshot.totalBytes, "bytes.");
  //       // Let's get a download URL for the file.
  //       getDownloadURL(snapshot.ref).then((url) => {
  //         console.log("File available at", url);
  //         window.location.reload(false);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Upload failed", error);
  //       // ...
  //     });
  // };

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];


  const handleImageChange = (e) => {
    let selected = e.target.files[0];
    // console.log(selected)

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
      console.log('works')
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
      console.log("error")
    }
    console.log('done')
  };

  // Play audio
  const SoundPlay = (src) => {
    const sound = new Howl({ src });
    Howler.volume(0.6);
    sound.play();
  };

  const arrowDown = <KeyboardArrowDownRoundedIcon onClick={() => toggle()} />;
  const arrowUp = <KeyboardArrowUpRoundedIcon onClick={() => toggle()} />;

  // return (
  //   <div>
  //     {/* List of text-boxes */}
  //     {TextboxData.map((value) => {
  //       return (
  //         // * : React cannot work with lists without keys
  //         // * : Pass the key to each component to uniquely identify each component
  //         // * : Without keys, deleting any component results in the last component   being deleted everytime
  //         <DragDrop key={value.id}>{value.title}</DragDrop>
  //       );
  //     })}

  //     {/* Input-box and Add text-box button */}
  //     <form className="dd-header2" onSubmit={(e) => handleSubmit(e)}>
  //       <div className="dd-header2" id="title2">
  //         <input
  //           className="text-box"
  //           type="text"
  //           placeholder={primaryTitle}
  //           onChange={(e) => setPrimaryTitle(e.target.value)}
  //         />
  //       </div>
  //       <div className="dd-header2" id="icon2">
  //         <button className="butt">
  //           <p>
  //             <AddCircleOutlineRoundedIcon />
  //           </p>
  //         </button>
  //       </div>
  //       <div className="arrow-container">
  //         {open && arrowUp}
  //         {!open && arrowDown}
  //       </div>
  //     </form>

  //     {/* List of existing text boxes and trash icon */}
  //     <div className="input-list">
  //       {TextboxData.length > 0 &&
  //         open &&
  //         TextboxData.map((value) => {
  //           return (
  //             <div className="input-list-item">
  //               <p id="il-title">{value.title}</p>
  //               <p id="il-icon" onClick={() => handleDelete(value)}>
  //                 <DeleteRoundedIcon key={value.id} />
  //               </p>
  //             </div>
  //           );
  //         })}
  //     </div>
  //     <form>
  //       <label>
  //       <input
  //         type="file"
  //         onChange={handleImageChange}
  //       />
  //       </label>
  //     <div className="output">
  //       {error && <div className="error">{error}</div>}
  //       {file && <div>{file.name}</div>}
  //       {file && <Progress file={file} setFile={setFile} />}
  //     </div>
  //     <button onClick="window.location.reload();">Upload</button>


  //   </form>
  //   </div>
  // );
  console.log("AddText: Start")

  // Hooks
  // const [open, setOpen] = useState(true);
  // const [TextboxData, setTextboxData] = useState([]);
  // const [primaryTitle, setPrimaryTitle] = useState("Primary text");
  // const [image, setImage] = useState("");
  const [sliderTracker, setSliderTracker] = useState(0);


  const handleChange = (e, newValue, id) => {
    e.preventDefault()
    console.log("AddText: Slider moved    nv = ", newValue)

    TextboxData.map((item) => {
      if (item.id === id) {
        switch (newValue) {
          case 0: {
            item.size = "1.0rem"
            break;
          }
          case 25: {
            item.size = "2.0rem"
            break;
          }
          case 50: {
            item.size = "3.0rem"
            break;
          }
          case 75: {
            item.size = "4.0rem"
            break;
          }
          case 100: {
            item.size = "5.0rem"
            break;
          }
        }
      }
      item.id *= 10
    })

    setTextboxData([...TextboxData]);
    setSliderTracker(newValue)

    console.log("TBD = ", TextboxData)
  };

  function handleSubmit(e) {
    e.preventDefault();
    let text = e.target[0].placeholder;

    TextboxData.push({
      id: TextboxData.length + 1,
      title: text,
      size: "1.2rem",
    });

    setTextboxData([...TextboxData]);
    // SoundPlay(Whatsapp);
    // console.log("AddText: TextboxData = ", TextboxData)
  }

  function handleDelete(value) {
    console.log("Text-box deleted!");
    SoundPlay(DeleteSoundEffect);
    setTextboxData(TextboxData.filter((item) => item.id !== value.id));
  }

  // const upload = () => {
  //     if (image == null) return;
  //     uploadBytesResumable(storageRef, image)
  //       .then((snapshot) => {
  //         console.log("Uploaded", snapshot.totalBytes, "bytes.");
  //         // Let's get a download URL for the file.
  //         getDownloadURL(snapshot.ref).then((url) => {
  //           console.log("File available at", url);
  //           window.location.reload(false);
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Upload failed", error);
  //         // ...
  //       });
  //   };


  //     function toggle() {
  //         setOpen(!open);
  //     }

  //     // Play audio
  //     const SoundPlay = (src) => {
  //         const sound = new Howl({ src });
  //         Howler.volume(0.6);
  //         sound.play();
  //     };

  //     const arrowDown = <KeyboardArrowDownRoundedIcon onClick={() => toggle()} />;
  //     const arrowUp = <KeyboardArrowUpRoundedIcon onClick={() => toggle()} />;


  return (
    <div>
      {TextboxData.map((value) => {
        return (
          // * : React cannot work with lists without keys
          // * : Pass the key to each component to uniquely identify each component
          // * : Without keys, deleting any component results in the last component   being deleted everytime
          <DragDrop
            key={value.id}
            size={value.size}
          >
            {value.title}
          </DragDrop>
        );
      })}

      {/* Input-box and Add text-box button */}
        <form className="dd-header2" onSubmit={(e) => handleSubmit(e)}>
            <div className="ic">
                <div className="dd-header2" id="title2">
                    <input
                        className="text-box"
                        type="text"
                        placeholder={primaryTitle}
                        onChange={(e) => setPrimaryTitle(e.target.value)}
                        />
                </div>

                <button className="butt">
                    Add Text
                </button>
            </div>

            <div className="arrow-container">
            {open && arrowUp}
            {!open && arrowDown}
            </div>
        </form>

      {/* List of existing text boxes and trash icon */}
      <div className="input-list">
        {TextboxData.length > 0 &&
          open &&
          TextboxData.map((value) => {
            return (
              <div className="input-list-item">
                <p id="il-title">{value.title}</p>
                <Slider
                  aria-label="Font Size Slider"
                  defaultValue={sliderTracker}
                  marks={marks}
                  step={25}
                  onChangeCommitted={(e, newValue) => handleChange(e, newValue, value.id)}
                  key={sliderTracker}
                  valueLabelDisplay="off"
                />
                <p id="il-icon" onClick={() => handleDelete(value)}>
                  <DeleteRoundedIcon key={value.id} />
                </p>
              </div>
            );
          })}
      </div>
      <div>
        <form className="uploadform">
          <label>
            <input
                className="fileb"
                type="file"
                onChange={handleImageChange}
            />
          </label>
          <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && <Progress file={file} setFile={setFile} />}
          </div>
          <button className="uploadbutton">Upload</button>
      </form>
    </div>
    </div>
  );



//     {/* List of existing text boxes and trash icon */}
//     <div className="input-list">
//       {TextboxData.length > 0 &&
//         open &&
//         TextboxData.map((value) => {
//           return (
//             <div className="input-list-item">
//               <p id="il-title">{value.title}</p>
//               <p id="il-icon" onClick={() => handleDelete(value)}>
//                 <DeleteRoundedIcon key={value.id} />
//               </p>
//             </div>
//           );
//         })}
//     </div>
//     <form>
//       <label>
//       <input
//         type="file"
//         onChange={handleImageChange}
//       />
//       </label>
//     <div className="output">
//       {error && <div className="error">{error}</div>}
//       {file && <div>{file.name}</div>}
//       {file && <Progress file={file} setFile={setFile} />}
//     </div>
//     <button onClick="window.location.reload();">Upload</button>


//   </form>
//   </div>
// );
        }
export default AddText;
      