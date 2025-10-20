import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { articlesAPI, categoriesAPI, regionsAPI } from '../services/api'
import ArticleCard from '../components/ArticleCard'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const { t } = useTranslation()
  const [ws, setWs] = useState<WebSocket | null>(null)

  const { data: breakingNews } = useQuery({
    queryKey: ['articles', 'breaking'],
    queryFn: () => articlesAPI.getBreaking().then(res => res.data),
  })

  const { data: latestArticles } = useQuery({
    queryKey: ['articles', 'latest'],
    queryFn: () => articlesAPI.getAll({ limit: 12 }).then(res => res.data),
  })

  const { data: trendingArticles } = useQuery({
    queryKey: ['articles', 'trending'],
    queryFn: () => articlesAPI.getTrending({ limit: 5 }).then(res => res.data),
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesAPI.getAll().then(res => res.data),
  })

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: () => regionsAPI.getAll().then(res => res.data),
  })

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const websocket = new WebSocket(`${protocol}//${window.location.host}/ws/breaking-news`)
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'breaking_news') {
        console.log('New breaking news:', data.data)
      }
    }

    setWs(websocket)

    return () => {
      websocket.close()
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {breakingNews && breakingNews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-red-600">{t('breaking_news')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {breakingNews.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6">{t('latest')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestArticles?.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">{t('trending')}</h3>
            <div className="space-y-4">
              {trendingArticles?.map((article, index) => (
                <div key={article.id} className="border-b border-gray-200 pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-gray-300">{index + 1}</span>
                    <div>
                      <a href={`/article/${article.id}`} className="font-semibold hover:text-primary-600 line-clamp-2">
                        {article.title_en}
                      </a>
                      <p className="text-sm text-gray-500">{article.view_count} {t('views')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {categories && categories.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{t('categories')}</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition"
                  >
                    {category.name_en}
                  </a>
                ))}
              </div>
            </div>
          )}

          {regions && regions.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{t('regions')}</h3>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <a
                    key={region.id}
                    href={`/region/${region.slug}`}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition"
                  >
                    {region.name_en}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
