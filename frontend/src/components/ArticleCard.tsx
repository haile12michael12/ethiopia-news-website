import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Article } from '../types'
import { formatEthiopianDate } from '../utils/ethiopianCalendar'
import { format } from 'date-fns'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { t, i18n } = useTranslation()
  
  const getTitle = () => {
    switch (i18n.language) {
      case 'am': return article.title_am || article.title_en
      case 'om': return article.title_om || article.title_en
      case 'ti': return article.title_ti || article.title_en
      default: return article.title_en
    }
  }

  const getExcerpt = () => {
    switch (i18n.language) {
      case 'am': return article.excerpt_am || article.excerpt_en
      case 'om': return article.excerpt_om || article.excerpt_en
      case 'ti': return article.excerpt_ti || article.excerpt_en
      default: return article.excerpt_en
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {article.is_breaking && (
        <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold">
          {t('breaking_news')}
        </div>
      )}
      
      {article.featured_image && (
        <img 
          src={article.featured_image} 
          alt={getTitle()}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">
          <Link to={`/article/${article.id}`} className="hover:text-primary-600 transition">
            {getTitle()}
          </Link>
        </h2>
        
        {getExcerpt() && (
          <p className="text-gray-600 mb-3 line-clamp-3">{getExcerpt()}</p>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{article.view_count} {t('views')}</span>
          {article.published_at && (
            <span title={formatEthiopianDate(new Date(article.published_at), i18n.language)}>
              {format(new Date(article.published_at), 'MMM d, yyyy')}
            </span>
          )}
        </div>
        
        <Link 
          to={`/article/${article.id}`}
          className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-semibold"
        >
          {t('read_more')} →
        </Link>
      </div>
    </article>
  )
}
