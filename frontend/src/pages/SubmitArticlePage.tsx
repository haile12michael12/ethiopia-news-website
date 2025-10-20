import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { regionsAPI, submissionsAPI } from '../services/api'
import { toast } from 'react-toastify'

export default function SubmitArticlePage() {
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({
    submitter_name: '',
    submitter_email: '',
    title: '',
    content: '',
    language: i18n.language,
    region_id: '',
  })

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: () => regionsAPI.getAll().then(res => res.data),
  })

  const submitMutation = useMutation({
    mutationFn: (data: any) => submissionsAPI.create(data),
    onSuccess: () => {
      toast.success(t('article_submitted'))
      setFormData({
        submitter_name: '',
        submitter_email: '',
        title: '',
        content: '',
        language: i18n.language,
        region_id: '',
      })
    },
    onError: () => {
      toast.error(t('error'))
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMutation.mutate({
      ...formData,
      region_id: formData.region_id ? Number(formData.region_id) : undefined,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2">{t('submit_your_story')}</h1>
          <p className="text-gray-600 mb-6">{t('your_voice_matters')}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('your_name')} *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.submitter_name}
                onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('your_email')} *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.submitter_email}
                onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                {t('title')} *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                {t('content')} *
              </label>
              <textarea
                id="content"
                required
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                {t('region')}
              </label>
              <select
                id="region"
                value={formData.region_id}
                onChange={(e) => setFormData({ ...formData, region_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">{t('select_region')}</option>
                {regions?.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name_en}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitMutation.isPending ? t('submitting') : t('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
