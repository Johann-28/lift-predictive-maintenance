import React, { useState } from 'react';
import './Recommendations.css';

interface Recommendation {
  id: string;
  type: 'warning' | 'critical';
  title: string;
  description: string;
  icon: string;
  priority?: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  elevator?: string;
}

interface MaintenanceSuggestion {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedDuration?: string;
  requiredParts?: string[];
}

interface RecommendationsProps {
  recommendations: Recommendation[];
  maintenanceSuggestions: MaintenanceSuggestion[];
  onViewAll: () => void;
  onRecommendationClick: (id: string) => void;
  onSuggestionClick: (id: string) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  maintenanceSuggestions,
  onViewAll,
  onRecommendationClick,
  onSuggestionClick
}) => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'suggestions'>('alerts');

  const getPriorityClass = (priority: string = 'medium'): string => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority: string = 'medium'): string => {
    switch (priority) {
      case 'high': return '🔴';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  return (
    <section className="recommendations-section">
      <div className="recommendations-header">
        <h2 className="recommendations-title">Recommendations</h2>
        <div className="recommendations-tabs">
          <button 
            className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            Alerts ({recommendations.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions ({maintenanceSuggestions.length})
          </button>
        </div>
      </div>
      
      <div className="recommendations-container">
        {activeTab === 'alerts' ? (
          <div className="recommendations-left">
            {recommendations.map((recommendation) => (
              <div 
                key={recommendation.id} 
                className={`alert-item alert-${recommendation.type}`}
                onClick={() => onRecommendationClick(recommendation.id)}
              >
                <div className="alert-header">
                  <div className="alert-icon-title">
                    <span className="alert-icon">{recommendation.icon}</span>
                    <strong className="alert-title">{recommendation.title}</strong>
                  </div>
                  {recommendation.priority && (
                    <div className={`priority-badge ${getPriorityClass(recommendation.priority)}`}>
                      {getPriorityIcon(recommendation.priority)} {recommendation.priority.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="alert-description">{recommendation.description}</div>
                {recommendation.estimatedTime && (
                  <div className="alert-meta">
                    <span className="estimated-time">⏱ Est. time: {recommendation.estimatedTime}</span>
                  </div>
                )}
                {recommendation.elevator && (
                  <div className="alert-meta">
                    <span className="elevator-ref">🏢 {recommendation.elevator}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="recommendations-right">
            {maintenanceSuggestions.map((suggestion, index) => (
              <div 
                key={suggestion.id} 
                className="suggestion-item"
                onClick={() => onSuggestionClick(suggestion.id)}
              >
                <div className="suggestion-header">
                  <div className="suggestion-number">{index + 1}</div>
                  <div className="suggestion-content">
                    <div className="suggestion-title-row">
                      <div className="suggestion-title">{suggestion.title}</div>
                      <div className={`priority-badge ${getPriorityClass(suggestion.priority)}`}>
                        {getPriorityIcon(suggestion.priority)} {suggestion.priority.toUpperCase()}
                      </div>
                    </div>
                    <div className="suggestion-description">{suggestion.description}</div>
                    {suggestion.estimatedDuration && (
                      <div className="suggestion-meta">
                        <span className="duration">⏱ Duration: {suggestion.estimatedDuration}</span>
                      </div>
                    )}
                    {suggestion.requiredParts && suggestion.requiredParts.length > 0 && (
                      <div className="suggestion-meta">
                        <span className="parts">🔧 Parts: {suggestion.requiredParts.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recommendations-footer">
        <button 
          className="view-all-btn"
          onClick={onViewAll}
        >
          View All Recommendations
        </button>
        <div className="recommendations-summary">
          <span className="summary-text">
            {activeTab === 'alerts' 
              ? `${recommendations.filter(r => r.type === 'critical').length} critical, ${recommendations.filter(r => r.type === 'warning').length} warnings`
              : `${maintenanceSuggestions.filter(s => s.priority === 'high').length} high priority, ${maintenanceSuggestions.filter(s => s.priority === 'medium').length} medium priority`
            }
          </span>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;