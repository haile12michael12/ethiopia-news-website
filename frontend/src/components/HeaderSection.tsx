import { FC } from "react";

import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { categories } from "../utils/constants";

interface HeaderSectionProps {
    title: string
}

const HeaderSection: FC<HeaderSectionProps> = ({ title }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Typography sx={{ fontSize: { md: '2.25rem', xs: '1.5rem' }, fontFamily: 'serif', cursor: 'pointer' }}>
                {title}
            </Typography>

            {title !== "Top Headlines" &&
                <Button sx={{
                    display: 'flex', alignItems: 'center', gap: 1,
                    fontSize: { lg: '1rem', md: '0.875rem', xs: '0.8rem' },
                    color: "black",
                    '&:hover': { textDecoration: 'underline', textUnderlineOffset: '2px' }
                }}
                    onClick={() => navigate('/explore', { state: { category: title } })}
                >
                    See All
                    <ArrowForwardIcon sx={{ fontSize: { md: '1.25rem', xs: '1rem' } }} />
                </Button>
            }
        </Box >)
}

export default HeaderSection