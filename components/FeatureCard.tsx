
import React from 'react';
import type { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index = 0 }) => {
  // Define dynamic index-based premium color schemes matching our elite visual brand
  const cardStyles = [
    {
      border: 'border-blue-500/35 hover:border-blue-400',
      ring: 'ring-blue-500/5 hover:ring-blue-500/15',
      shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.08),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]',
      gradient: 'from-blue-500 to-indigo-650',
      glow: 'bg-blue-500/15 group-hover:bg-blue-500/25',
      topLine: 'via-blue-400',
      textAccent: 'text-blue-300'
    },
    {
      border: 'border-emerald-500/35 hover:border-emerald-400',
      ring: 'ring-emerald-500/5 hover:ring-emerald-500/15',
      shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.08),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
      gradient: 'from-emerald-500 to-teal-650',
      glow: 'bg-emerald-500/15 group-hover:bg-emerald-500/25',
      topLine: 'via-emerald-400',
      textAccent: 'text-emerald-300'
    },
    {
      border: 'border-purple-500/35 hover:border-purple-400',
      ring: 'ring-purple-500/5 hover:ring-purple-500/15',
      shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.08),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]',
      gradient: 'from-purple-500 to-pink-650',
      glow: 'bg-purple-500/15 group-hover:bg-purple-500/25',
      topLine: 'via-purple-400',
      textAccent: 'text-purple-300'
    },
    {
      border: 'border-orange-500/35 hover:border-orange-400',
      ring: 'ring-orange-500/5 hover:ring-orange-500/15',
      shadow: 'shadow-[0_0_20px_rgba(249,115,22,0.08),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(249,115,22,0.3)]',
      gradient: 'from-orange-500 to-red-650',
      glow: 'bg-orange-500/15 group-hover:bg-orange-500/25',
      topLine: 'via-orange-400',
      textAccent: 'text-orange-300'
    },
    {
      border: 'border-indigo-500/35 hover:border-indigo-400',
      ring: 'ring-indigo-500/5 hover:ring-indigo-500/15',
      shadow: 'shadow-[0_0_20px_rgba(99,102,241,0.08),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(99,102,241,0.3)]',
      gradient: 'from-indigo-500 to-violet-650',
      glow: 'bg-indigo-500/15 group-hover:bg-indigo-500/25',
      topLine: 'via-indigo-400',
      textAccent: 'text-indigo-300'
    },
    {
      border: 'border-rose-500/35 hover:border-rose-400',
      ring: 'ring-rose-500/5 hover:ring-rose-500/15',
      shadow: 'shadow-[0_0_20px_rgba(244,63,94,0.08),_0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)]',
      gradient: 'from-rose-500 to-red-650',
      glow: 'bg-rose-500/15 group-hover:bg-rose-500/25',
      topLine: 'via-rose-400',
      textAccent: 'text-rose-300'
    },
  ];

  const currentStyle = cardStyles[index % cardStyles.length];

  // Modify the icon color classes to make sure it looks white/clean inside our custom container
  let renderedIcon = feature.icon;
  if (React.isValidElement(renderedIcon)) {
    // If it's a font awesome icon, override color classes with text-white
    const existingClassName = (renderedIcon.props as any).className || '';
    const cleanClassName = existingClassName
      .replace(/text-\w+-\d+/g, '') // remove text-blue-500 etc.
      .replace(/text-4xl/g, 'text-xl md:text-2xl') // adjust size
      .trim();
    
    renderedIcon = React.cloneElement(renderedIcon as React.ReactElement, {
      className: `${cleanClassName} text-white`
    });
  }

  return (
    <div className={`group bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/90 backdrop-blur-2xl py-4 md:py-5.5 px-6 md:px-8 rounded-3xl border-2 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-full ${currentStyle.border} ${currentStyle.shadow} ${currentStyle.ring}`}>
      {/* Dynamic top edge glow effect */}
      <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent ${currentStyle.topLine} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Corner glow circle */}
      <div className={`absolute -top-16 -right-16 w-32 h-32 ${currentStyle.glow} rounded-full blur-[30px] transition-all duration-700 pointer-events-none`}></div>
      
      {/* Icon Frame */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentStyle.gradient} flex items-center justify-center mb-4 border border-white/10 shadow-lg shadow-blue-500/5 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
        {renderedIcon}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className={`font-extrabold text-lg md:text-xl text-white mb-2 transition-colors duration-300 group-hover:${currentStyle.textAccent}`}>
          {feature.title}
        </h3>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-semibold">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;