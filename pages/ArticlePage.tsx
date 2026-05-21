import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES } from '../constants';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // In a real app, you might need to manage articles in a state if they can be added dynamically.
  // For this setup, we'll assume the initial constant list is sufficient for viewing.
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="text-center py-24 container mx-auto px-8">
        <h1 className="text-4xl font-bold mb-4">Makale Bulunamadı</h1>
        <p className="text-lg text-gray-600 mb-8">Aradığınız sayfayı bulamadık. Lütfen makale listesini kontrol edin.</p>
        <Link to="/makaleler" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
          Tüm Makalelere Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
             <Link to="/makaleler" className="text-sm font-semibold text-blue-600 hover:underline mb-4 inline-block">
              <i className="fas fa-arrow-left mr-2"></i>
              Tüm Makalelere Dön
            </Link>
            <p className="text-base font-bold tracking-wider text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full inline-block">{article.category}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mt-4">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center justify-center">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-full" src={article.authorAvatarUrl} alt={article.authorName} />
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-gray-900">{article.authorName}</p>
                <p className="text-sm text-gray-500">{article.publishedDate}</p>
              </div>
            </div>
          </header>

          <figure className="mb-12">
            <img src={article.imageUrl} alt={article.title} className="w-full rounded-2xl shadow-xl aspect-video object-cover" />
          </figure>

          <article className="prose lg:prose-lg max-w-none mx-auto">
            {article.content}
          </article>

          <div className="mt-16 border-t pt-8 text-center">
            <Link to="/makaleler" className="bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
              <i className="fas fa-arrow-left mr-2"></i>
              Tüm Makalelere Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;