// General imports
import React from "react"

// Data
import TemplateData from "./TemplateData";
import EmbellishmentData from "./EmbellishmentData";

// Icons
// import FileUploadRoundedIcon from "@material-ui/icons/FileUploadRounded";
// import UploadRoundedIcon from '@material-ui/icons/UploadRounded';
import AcUnitRoundedIcon from "@material-ui/icons/AcUnitRounded";
import BurstModeRoundedIcon from "@material-ui/icons/BurstModeRounded";
import PaletteRoundedIcon from "@material-ui/icons/PaletteRounded";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

// Export an array of sidebar rows
const SidebarData = [
    {
        id: 1,
        title: "Templates",
        icon: <PaletteRoundedIcon />,
        data: TemplateData,
        link: "/templates"
    },
    {
        id: 2,
        title: "Input",
        icon: <EditRoundedIcon />,
        data: [],
        link: "/input"
    },
    {
        id: 3,
        title: "Embellishments",
        icon: <AcUnitRoundedIcon />,
        data: EmbellishmentData,
        link: "/embellishments"
    },
    {
        id: 4,
        title: "Share",
        icon: <ShareRoundedIcon />,
        data: [],
        link: "/share"
    },
    {
        id: 5,
        title: "Settings",
        icon: <SettingsRoundedIcon />,
        data: [],
        link: "/settings"
    },
]

export default SidebarData;