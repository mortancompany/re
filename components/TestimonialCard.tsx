import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl p-6 md:p-8 rounded-3xl shadow-[0_0_25px_rgba(168,85,247,0.1),_0_15px_40px_rgba(0,0,0,0.6)] border-2 border-purple-500/30 hover:border-purple-400 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:-translate-y-2 h-full relative overflow-hidden ring-4 ring-purple-500/5 hover:ring-purple-500/15">
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[30px] group-hover:bg-purple-500/30 transition-all duration-700"></div>
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <img
        className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-purple-500/20 relative z-10 group-hover:scale-105 transition-transform duration-300"
        src={testimonial.avatarUrl}
        referrerPolicy="no-referrer"
        alt={testimonial.name}
      />
      <div className="flex justify-center text-amber-500 space-x-1 mb-4 relative z-10 text-xs">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
      <p className="text-slate-300 text-xs md:text-sm italic mb-6 relative flex-grow leading-relaxed font-medium z-10">
        "{testimonial.quote}"
      </p>
      <div className="w-full mt-auto pt-4 border-t border-slate-800/80 relative z-10">
        <h4 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors duration-300">{testimonial.name}</h4>
        <p className="text-[11px] text-purple-400 uppercase tracking-wider font-bold mt-1">{testimonial.title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;