import { FC, useState, useEffect } from "react";

import { Box, Typography, Button, Card, CardContent, Grid2 } from "@mui/material"

import HeaderSection from "./HeaderSection";
import CarouselCard from "./Carouselcard";
import CarouselList from "./CarouselList";
import axios from "axios";
import { NewsType } from "../utils/Types";
import { getTopHeadlines } from "../utils/api";
import CarouselCardSkeleton from "./Skeletons/CarouselCardSkeleton";
import CarouselListSkeleton from "./Skeletons/CarouselListSkeleton";

const Carousel: FC = () => {
    const [active, setActive] = useState<number>(0)
    const [topHeadlines, setTopHeadlines] = useState<NewsType[]>([])

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchTopHeadlines = async () => {
        setLoading(true)
        setError(null)

        const response = await getTopHeadlines()
        console.log(response)

        if (response.data) {
            const filterHeadlines = response?.data?.articles.filter(
                (res: NewsType) => res.urlToImage != null
            )

            setTopHeadlines(filterHeadlines)
            setLoading(false)
        }

        if (response.error) {
            setError(response.error.message || "Failed To Fetch")
        }
    }

    const toggleActive = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setActive((prev) => (prev + 1) % topHeadlines.length)
        } else if (direction === 'prev') {
            setActive((prev) => (prev - 1) % topHeadlines.length)
        }
    }

    useEffect(() => {
        fetchTopHeadlines()
    }, [])

    return (
        <Box>
            {/* Header */}
            <HeaderSection title='Top Headlines' />

            {
                error ?
                    <Typography color="error" className="">{error}</Typography>
                    :
                    <>
                        {loading ?
                            <>
                                <CarouselCardSkeleton />
                                <CarouselListSkeleton />
                            </>
                            :
                            <Box>

                                {/* Carousel */}
                                < CarouselCard
                                    toggleActive={toggleActive}
                                    topHeadline={topHeadlines[active]} />


                                {/* CarouselList */}
                                <CarouselList
                                    active={active}
                                    topHeadlines={topHeadlines} />

                            </Box>
                        }
                    </>

            }



        </Box>
    )
}

export default Carousel