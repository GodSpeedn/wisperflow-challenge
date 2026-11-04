import React, { createContext, useContext } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import dossierData from '../../data/dossierData.json';

const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
  const value = {
    portfolioData: PORTFOLIO_DATA,
    dossierData: dossierData,
    candidate: PORTFOLIO_DATA.candidate,
    resumeFacts: PORTFOLIO_DATA.resumeFacts,
    timelineStory: PORTFOLIO_DATA.timelineStory,
    growthPlaybook: PORTFOLIO_DATA.growthPlaybook,
    twoTruthsAndLie: PORTFOLIO_DATA.twoTruthsAndLie,
    aiTwin: PORTFOLIO_DATA.aiTwin,
    videoPitch: dossierData.videoPitch,
  };

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
