import { FC } from "react";

import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material"

import { categories } from "../utils/constants";
import HeaderSection from "./HeaderSection";
import { NewsType } from "../utils/Types";
import { Link } from "react-router-dom";

interface NewsCardProps {
    item: NewsType
}

const NewsCard: FC<NewsCardProps> = ({ item }) => {
    return (
        <Link to={item.url}>
            <Card className="relative shadow-none border-2 h-[450px]">
                <CardMedia
                    className="aspect-[16/9] h-[180px]"
                    component='img'
                    image={item.urlToImage}
                />
                <CardContent className="mb-12">
                    <Typography className="text-[16px] font-serif line-clamp-4">
                        {item.title}
                    </Typography>
                    <Typography className="text-[14px] font-serif line-clamp-4">
                        {item.description}
                    </Typography>

                    <Box className="absolute bottom-2">
                        <Typography className="text-[14px] font-serif line-clamp-4">
                            Source: {item.source.name}
                        </Typography>
                        <Typography className="text-[14px] font-serif line-clamp-4">
                            Date: {new Date(item.publishedAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>

    )
}

export default NewsCard