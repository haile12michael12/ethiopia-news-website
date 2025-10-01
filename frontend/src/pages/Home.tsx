import { Box, Typography, Button, Card, CardContent, Grid2 } from "@mui/material"
import { FC } from "react"
import Carousel from "../components/Carousel"
import HeaderSection from "../components/HeaderSection"
import { categories } from "../utils/constants"
import HomeCardsList from "../components/HomeCardsList"



const Home: FC = () => {

    return (
        <Box sx={{ width: '90%', mx: 'auto' }}>
            <Carousel />

            <Box className='mt-4 mb-24'>
                <Box>
                    {categories.map((item: string, ind: number) =>
                        <HomeCardsList key={ind} category={item} />

                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default Home