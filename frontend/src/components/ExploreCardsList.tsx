import { FC } from 'react'
import { Box } from '@mui/material'
import { NewsType } from '../utils/Types'
import NewsCard from './NewsCard'
import NewsCardSkeleton from './Skeletons/NewsCardSkeleton'

interface ExploreCardsListProps {
    list?: NewsType[],
    loading: boolean
}

const ExploreCardsList: FC<ExploreCardsListProps> = ({ list, loading }) => {
    return (
        <Box className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-3'>
            {
                list?.map((item, ind) => (
                    <NewsCard key={ind} item={item} />
                ))
            }
            {
                loading &&
                [...Array(10)].map((_, ind) => (
                    <NewsCardSkeleton key={ind} />
                ))
            }
        </Box>
    )
}

export default ExploreCardsList
