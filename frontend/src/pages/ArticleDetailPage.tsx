import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { articlesAPI, commentsAPI } from '../services/api'
import { formatEthiopianDate } from '../utils/ethiopianCalendar'
import { format } from 'date-fns'

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesAPI.getOne(Number(id)).then(res => res.data),
    enabled: !!id,
  })

  const { data: comments } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => commentsAPI.getByArticle(Number(id)).then(res => res.data),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
        </div>
      </div>
    )
  }

  const getTitle = () => {
    switch (i18n.language) {
      case 'am': return article.title_am || article.title_en
      case 'om': return article.title_om || article.title_en
      case 'ti': return article.title_ti || article.title_en
      default: return article.title_en
    }
  }

  const getContent = () => {
    switch (i18n.language) {
      case 'am': return article.content_am || article.content_en
      case 'om': return article.content_om || article.content_en
      case 'ti': return article.content_ti || article.content_en
      default: return article.content_en
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {article.is_breaking && (
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded mb-4 font-bold">
            {t('breaking_news')}
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">{getTitle()}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>{article.view_count} {t('views')}</span>
          {article.published_at && (
            <>
              <span>•</span>
              <span>{format(new Date(article.published_at), 'MMM d, yyyy')}</span>
              <span>•</span>
              <span>{formatEthiopianDate(new Date(article.published_at), i18n.language)}</span>
            </>
          )}
        </div>

        {article.featured_image && (
          <img 
            src={article.featured_image}
            alt={getTitle()}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none mb-8">
          {getContent().split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">{t('comments')}</h2>
          {comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded p-4">
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {format(new Date(comment.created_at), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}
        </div>
      </article>
    </div>
  )
}
