import { FC } from "react";

import { Box, Card, CardContent, Typography, CardMedia, Skeleton } from "@mui/material"

const NewsCardSkeleton: FC = () => {
    return (
        <Card className="relative shadow-none border-2 h-[450px]">
            <Skeleton variant="rectangular">
                <Box className="aspect-[16/9] h-[180px]"></Box>
            </Skeleton>
            <CardContent className="mb-12">
                <Skeleton />
                <Skeleton />
                <Skeleton className="mt-2" />
                <Skeleton className="w-[60%]" />

            </CardContent>
        </Card>

    )
}

export default NewsCardSkeleton