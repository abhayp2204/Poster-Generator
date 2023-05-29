import React, {useState} from "react";
import SidebarData from "../../data/SidebarData"
import Dropdown from "../Dropdown";

// Upload image
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, storageRef } from "../../services/firebase";

// CSS
import "../../css/Sidebar.css"

const Sidebar = () => {
    const [image, setImage] = useState("");

    const upload = () => {
        if (image == null) return;
        uploadBytesResumable(storageRef, image)
          .then((snapshot) => {
            console.log("Uploaded", snapshot.totalBytes, "bytes.");
            // Let's get a download URL for the file.
            getDownloadURL(snapshot.ref).then((url) => {
              console.log("File available at", url);
              window.location.reload(false);
            });
          })
          .catch((error) => {
            console.error("Upload failed", error);
            // ...
          });
      };

    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarData.map((value, key) => {
                    key = value.id
                    return (
                        <>
                            <Dropdown title={value.title} icon={value.icon} items={value.data} />

                            {value.title == "Upload" && (
                                <div className="upload-image">
                                    {/* <label for="file" className="label">Select Image</label> */}
                                    <input
                                        type="file"
                                        id="getFile"
                                        onChange={(e) => {
                                            setImage(e.target.files[0]);
                                        }}
                                    />
                                    {/* <input type='file' id="getFile"></input> */}
                                    <button onClick={upload}>Upload</button>
                                </div>
                            )}


                        </>
                    )
                })} 
            </ul>
        </div>
    );
};

export default Sidebar;