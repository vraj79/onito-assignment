import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    return (
        <Box color={"#FFF"} zIndex={99} width={"100%"} bg={"gray"} position={"fixed"} alignItems={"center"} p={"1.5rem"} height={"45px"} display={"flex"} justifyContent={"space-between"} >
            <Box cursor={"pointer"}>
                <Link to={'/'}>
                    Onito Technology
                </Link>
            </Box>
            <Box listStyleType={"none"} cursor={"pointer"} display={"flex"} gap={3}>
                <Link to={"/"}>Onito Form</Link>
                <Link to={"/table"}>Onito Datatable</Link>
            </Box>
        </Box>
    )
}

export default Navbar