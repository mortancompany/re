import React from 'react';

interface ProblemSolutionGoalSectionProps {
    problem: string;
    solution: string;
    goal: string;
}

const ProblemSolutionGoalSection: React.FC<ProblemSolutionGoalSectionProps> = ({ problem, solution, goal }) => {
    return (
        <section className="container mx-auto px-8">
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Problem */}
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30 shadow-2xl">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                            <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-red-400">Temel Sorun</h3>
                    </div>
                    <p className="text-slate-300">{problem}</p>
                </div>
                
                {/* Solution */}
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-green-500/30 shadow-2xl">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <i className="fas fa-lightbulb text-green-400 text-xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-green-400">Mortanas Çözümü</h3>
                    </div>
                    <p className="text-slate-300 font-medium">{solution}</p>
                </div>

                {/* Goal */}
                <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30 shadow-2xl">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <i className="fas fa-crosshairs text-blue-400 text-xl"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-blue-400">Nihai Amacımız</h3>
                    </div>
                    <p className="text-slate-300">{goal}</p>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolutionGoalSection;
