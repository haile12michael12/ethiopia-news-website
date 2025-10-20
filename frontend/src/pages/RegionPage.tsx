import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { articlesAPI, regionsAPI } from '../services/api'
import ArticleCard from '../components/ArticleCard'

export default function RegionPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: () => regionsAPI.getAll().then(res => res.data),
  })

  const region = regions?.find(r => r.slug === slug)

  const { data: articles } = useQuery({
    queryKey: ['articles', 'region', region?.id],
    queryFn: () => articlesAPI.getAll({ region_id: region?.id }).then(res => res.data),
    enabled: !!region,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {region?.name_en || slug}
      </h1>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No articles found in this region</p>
      )}
    </div>
  )
}
