import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import UpdateForm from "../components/UpdateForm";

const Update = () => {
    const container = {
        marginTop:'8rem',
    }
    return (
        <>
            <Container sx={container}>
                <UpdateForm/>
            </Container>
        </>
    )
}

export default Update;