import React, { useState } from 'react';
import { ARTICLES } from '../constants';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../types';

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    imageUrl: '',
    excerpt: '',
    content: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
    setIsAuthenticated(false);
    setNewArticle({ title: '', category: '', imageUrl: '', excerpt: '', content: '' });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'intelligence') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Geçersiz şifre.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewArticle(prev => ({ ...prev, [name]: value }));
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const articleToAdd: Article = {
      ...newArticle,
      slug: createSlug(newArticle.title),
      authorName: 'Admin',
      authorAvatarUrl: 'https://i.imgur.com/mert-aktas.png',
      publishedDate: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      content: <p>{newArticle.content}</p>, // Simplistic content handling
    };
    setArticles(prev => [articleToAdd, ...prev]);
    handleCloseModal();
  };

  return (
    <>
      <div className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Makaleler & <span className="text-blue-600">Bilgi Bankası</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Yapay zeka, otomasyon ve dijital pazarlama dünyasındaki en son gelişmeler, analizler ve uzman görüşleri.
            </p>
             <button
              onClick={handleOpenModal}
              className="mt-8 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <i className="fas fa-plus mr-2"></i>
              Yeni Makale Ekle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
             <div className="p-6 border-b flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-gray-800">{isAuthenticated ? 'Yeni Makale Oluştur' : 'Erişim Kontrolü'}</h2>
                 <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">&times;</button>
             </div>
             
             <div className="p-8 overflow-y-auto">
                {!isAuthenticated ? (
                  <form onSubmit={handlePasswordSubmit}>
                    <p className="mb-4 text-gray-600">Makale eklemek için lütfen yönetici şifresini girin.</p>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Şifre"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Giriş Yap
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleArticleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                        <input type="text" name="title" id="title" value={newArticle.title} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <input type="text" name="category" id="category" value={newArticle.category} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Görsel URL</label>
                        <input type="url" name="imageUrl" id="imageUrl" value={newArticle.imageUrl} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Özet</label>
                        <textarea name="excerpt" id="excerpt" rows={3} value={newArticle.excerpt} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                     <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">İçerik (Markdown desteklenir)</label>
                        <textarea name="content" id="content" rows={8} value={newArticle.content} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                     <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300">İptal</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700">Yayınla</button>
                    </div>
                  </form>
                )}
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;