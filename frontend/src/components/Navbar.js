import React from 'react'
import { Box } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import AddFriends from '../pages/AddFriends';
import Logo from '../assets/Logo.svg';
import { RiGalleryFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  return (
    <Box width={"100%"} backgroundColor="#15151f" padding={2}>
        <ul style={{display: "flex", justifyContent: "space-between", backgroundColor: ""}}>
            <ul>
                <li onClick={() => navigate("/")} style={{marginLeft: "20px",listStyle: "none", alignItems: "center", justifyContent: "center", display: "flex", cursor: "pointer"}}>
                    <img style={{display: "flex", alignItems: "center", justifyContent: "center", height: "50px"}} src={require("../assets/logo.png")} alt="logo" />
                    {/* <Logo /> */}
                </li>
            </ul>
            <ul style={{display: "flex", gap: "16px"}}>
            <li onClick={() => navigate("/add-echo")} style={{color: "white", padding: "10px 24px", alignItems: "center", justifyContent: "center", borderRadius: "16px", border: "2px solid white", textDecoration: "none", listStyle: "none", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}><FaPlus size={"22"} color='white'/><a href="#">Add Echo</a></li>
            <li onClick={() => navigate("/add-friends")} style={{color: "white", padding: "10px 24px", alignItems: "center", justifyContent: "center", borderRadius: "16px", border: "2px solid white", textDecoration: "none", listStyle: "none", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}><CgProfile size={"22"}/><a href="#">Add Friends</a></li>
            </ul>
        </ul>
        </Box>
  )
}

export default Navbar