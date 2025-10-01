import { FC, useState, useEffect } from "react"
import { Box, Container, Typography, Button } from '@mui/material'
import { useLocation } from "react-router-dom"
import { NewsType } from "../utils/Types";
import { getTopHeadlines } from "../utils/api";
import ExploreCardsList from "../components/ExploreCardsList";
import NewsCardSkeleton from "../components/Skeletons/NewsCardSkeleton";

interface CategoryDataType {
    [key: string]: { articles: NewsType[], pageNo: number }
}

const Explore: FC = () => {
    const location = useLocation()
    const category = location.state?.category

    const [categoryData, setCategoryData] = useState<CategoryDataType>({})
    const [loadMore, setLoadMore] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNews = async () => {
        setError(null)
        setLoading(true)
        const currentCategorydata = categoryData[category] || { articles: [], pageNo: 1 }
        const pageNo = currentCategorydata.pageNo

        if (!category) return

        const response = await getTopHeadlines(category, pageNo)

        if (response.data) {
            const filteredNews = response.data.articles.filter(
                (res: NewsType) => res.urlToImage != null
            )

            setCategoryData(prev => ({
                ...prev, [category]: {
                    articles: [...prev[category]?.articles || [], ...filteredNews],
                    pageNo: pageNo + 1
                }
            }))

            setLoadMore(currentCategorydata.articles.length + filteredNews.length < response.data.totalResults)
            setLoading(false)
        }

        if (response.error) {
            setError(response.error.message)
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchNews()
    }, [category])


    useEffect(() => {
        console.log("sddddddd", categoryData)
    }, [categoryData])




    return (
        <Container maxWidth={false} sx={{ width: "90%", mt: 5, mb: 10 }}>

            <Typography variant="h4" sx={{ fontSize: { md: '2.25rem', xs: '1.5rem' }, fontFamily: 'serif', cursor: 'pointer', mb: 1 }}>
                {category}
            </Typography>

            {error &&
                <Typography color="error" mb={3}>
                    {error}
                </Typography>
            }

            <>
                {
                    categoryData[category]?.articles?.length > 0
                        ?
                        <ExploreCardsList loading={loading} list={categoryData[category]?.articles} />
                        :
                        <Box className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-3'>
                            {[...Array(20)].map((_, ind) => (
                                <NewsCardSkeleton key={ind} />
                            ))}
                        </Box>
                }

                <Box display='flex' justifyContent='center' mt={3}>
                    {
                        loadMore &&
                        <Button
                            variant="contained"
                            disableElevation
                            className="bg-neutral-700"
                            onClick={() => fetchNews()}
                        >
                            Load More
                        </Button>
                    }
                </Box>
            </>

        </Container>
    )
}

export default Explore