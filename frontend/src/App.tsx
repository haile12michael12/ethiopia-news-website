import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import SubmitArticlePage from './pages/SubmitArticlePage'
import CategoryPage from './pages/CategoryPage'
import RegionPage from './pages/RegionPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/submit" element={<SubmitArticlePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/region/:slug" element={<RegionPage />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Ethiopian News. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
