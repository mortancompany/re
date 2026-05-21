import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl shadow-lg bg-white transition-all transform hover:-translate-y-2 duration-300 h-full border hover:shadow-xl hover:border-blue-200">
      <Link to={`/makaleler/${article.slug}`} className="flex-shrink-0 block">
        <img className="h-56 w-full object-cover" src={article.imageUrl} alt={article.title} />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-600">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {article.category}
            </span>
          </p>
          <Link to={`/makaleler/${article.slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 hover:text-blue-700 transition-colors">{article.title}</p>
            <p className="mt-3 text-base text-gray-500">{article.excerpt}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={article.authorAvatarUrl} alt={article.authorName} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{article.authorName}</p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;