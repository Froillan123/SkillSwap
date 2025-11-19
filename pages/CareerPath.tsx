
import React, { useState } from 'react';
import { Briefcase, ArrowRight, Loader, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import { generateCareerPath } from '../services/geminiService';
import { CareerPath } from '../types';

export const CareerPathPage: React.FC = () => {
  const [dreamJob, setDreamJob] = useState('');
  const [pathData, setPathData] = useState<CareerPath | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!dreamJob.trim()) return;
    setLoading(true);
    const result = await generateCareerPath(dreamJob);
    setPathData(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="text-center max-w-2xl mx-auto pt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Career Architect</h1>
        <p className="text-gray-400 text-lg mb-8">Tell us your dream job, and we'll build a personalized roadmap to get you there.</p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Briefcase className="text-gray-500" />
          </div>
          <input 
            type="text" 
            placeholder="e.g. Full Stack Developer, Digital Marketer..."
            value={dreamJob}
            onChange={(e) => setDreamJob(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="w-full pl-12 pr-32 py-4 bg-dark-card border border-gray-700 rounded-xl text-white text-lg focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all shadow-lg"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !dreamJob}
            className="absolute right-2 top-2 bottom-2 bg-neon-cyan text-black font-bold px-4 md:px-6 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {loading ? <Loader className="animate-spin" /> : 'Generate'}
          </button>
        </div>
      </div>

      {pathData && (
        <div className="max-w-4xl mx-auto space-y-8 mt-12">
          {/* Salary & Overview Card */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{pathData.jobTitle}</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-neon-cyan font-mono font-bold">
                <TrendingUp size={18} /> High Demand Role
              </div>
            </div>
            <div className="bg-black/30 px-6 py-4 rounded-xl border border-gray-600 text-center w-full md:w-auto">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Estimated Salary</p>
              <p className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
                <DollarSign size={20} /> {pathData.estimatedSalary}
              </p>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="relative pl-4 md:pl-8 border-l-2 border-gray-800 space-y-12 ml-2 md:ml-0">
            {pathData.steps.map((step, index) => (
              <div key={index} className="relative group pl-4 md:pl-0">
                {/* Connector Dot */}
                <div className="absolute -left-[25px] md:-left-[41px] top-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-dark-bg border-2 md:border-4 border-neon-cyan shadow-[0_0_10px_#00FFD1]"></div>
                
                <div className="bg-dark-card border border-dark-border p-6 rounded-2xl shadow-lg hover:border-neon-cyan/50 transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                    <div>
                      <span className="text-neon-cyan font-mono text-sm font-bold mb-1 block">STEP 0{index + 1}</span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-xs font-bold border border-gray-700 whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">{step.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.skills.map((skill, idx) => (
                      <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-neon-cyan/5 text-neon-cyan text-xs rounded border border-neon-cyan/10">
                        <CheckCircle size={10} /> {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                    <button className="text-sm font-bold text-white hover:text-neon-cyan flex items-center gap-2 transition-colors">
                      Find Mentors for this Step <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Success End */}
            <div className="relative pl-4 md:pl-0">
               <div className="absolute -left-[25px] md:-left-[41px] top-0 w-4 h-4 md:w-6 md:h-6 rounded-full bg-neon-cyan shadow-[0_0_15px_#00FFD1]"></div>
               <div className="text-white font-bold text-lg py-1">Goal Achieved: {pathData.jobTitle}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
