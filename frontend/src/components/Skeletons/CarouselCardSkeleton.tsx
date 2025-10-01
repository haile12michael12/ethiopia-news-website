import { Box, Card, Typography, CardContent, CardMedia, Direction, Skeleton } from "@mui/material";
import { FC } from "react";


const CarouselCardSkeleton: FC = () => {

    return (
        <Box className='relative'>
            <Card className=" grid lg:grid-cols-2 md:grid-cols-3 border-2 shadow-none">
                <Box className='relative md:h-[360px] h-[280px] lg:col-span-1 md:col-span-2'>
                    <Skeleton variant="rectangular" height={'100%'} />
                </Box>

                <CardContent className="relative ">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton className="mt-2" />
                    <Skeleton width="60%" />

                </CardContent>


            </Card>
        </Box>
    )
}

export default CarouselCardSkeleton