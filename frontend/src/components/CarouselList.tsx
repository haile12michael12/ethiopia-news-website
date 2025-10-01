import { Box, Card, Grid2, Typography, CardMedia } from "@mui/material";
import { FC } from "react";
import { NewsType } from "../utils/Types";
import { Link } from "react-router-dom";

interface CarouselListProps {
    topHeadlines: NewsType[]
    active: number
}

const CarouselList: FC<CarouselListProps> = ({ topHeadlines, active }) => {


    const getNextFive = (active: number, topHeadline: NewsType[]) => {
        const nextFive = []

        for (let i = 0; i < 5; i++) {
            const index = (active + i + 1) % topHeadline.length
            nextFive.push(index)
        }

        return nextFive
    }

    const nextFiveHeadlines = getNextFive(active, topHeadlines)


    return (
        <Box className='grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-8'>
            {
                nextFiveHeadlines.map((item, ind) => (
                    <Grid2 key={ind}>
                        <Link to={topHeadlines[item]?.url}>
                            <Card className="relative">
                                <CardMedia component='img'
                                    className="w-full aspect-[16/10]"
                                    image={topHeadlines[item]?.urlToImage}
                                />
                                <Box
                                    className="_carouselGradient"
                                    sx={{ position: "absolute", bottom: 0, height: "70px", width: '100%' }}
                                />
                                <Typography
                                    sx={{ fontFamily: "serif" }}
                                    className="absolute bottom-2 text-white md:text-[17px] sm:text-[15px] text-[14px] line-clamp-3 px-3">
                                    {topHeadlines[item]?.title}
                                </Typography>
                            </Card>
                        </Link>
                    </Grid2>
                ))
            }
        </Box>)
}

export default CarouselList