import React, { useState, useMemo } from 'react';
import './AlertRemainings.css';

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  description: string;
  icon: string;
  timestamp: string;
  elevator?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
  acknowledged?: boolean;
}

interface AlertRemainingsProps {
  alerts: Alert[];
  onAlertClick: (alertId: string) => void;
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
  maxDisplayed?: number;
}

const AlertRemainings: React.FC<AlertRemainingsProps> = ({
  alerts,
  onAlertClick,
  onAcknowledge,
  onDismiss,
  maxDisplayed = 10
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'unacknowledged'>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'priority' | 'type'>('timestamp');

  const getAlertTypeClass = (type: string): string => {
    switch (type) {
      case 'critical': return 'alert-critical';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-warning';
    }
  };

  const getPriorityWeight = (priority: string = 'medium'): number => {
    switch (priority) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 2;
    }
  };

  const getTypeWeight = (type: string): number => {
    switch (type) {
      case 'critical': return 3;
      case 'warning': return 2;
      case 'info': return 1;
      default: return 2;
    }
  };

  const filteredAndSortedAlerts = useMemo(() => {
    const filtered = alerts.filter(alert => {
      switch (filter) {
        case 'critical':
          return alert.type === 'critical';
        case 'warning':
          return alert.type === 'warning';
        case 'unacknowledged':
          return !alert.acknowledged;
        default:
          return true;
      }
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'timestamp':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'priority':
          return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
        case 'type':
          return getTypeWeight(b.type) - getTypeWeight(a.type);
        default:
          return 0;
      }
    });

    return filtered.slice(0, maxDisplayed);
  }, [alerts, filter, sortBy, maxDisplayed]);

  const alertCounts = useMemo(() => {
    return {
      total: alerts.length,
      critical: alerts.filter(a => a.type === 'critical').length,
      warning: alerts.filter(a => a.type === 'warning').length,
      unacknowledged: alerts.filter(a => !a.acknowledged).length
    };
  }, [alerts]);

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="alert-remainings-container">
      <div className="alert-remainings-header">
        <h3 className="alert-remainings-title">Alert remainings</h3>
        <div className="alert-counts">
          <span className="count-badge critical">{alertCounts.critical}</span>
          <span className="count-badge warning">{alertCounts.warning}</span>
          <span className="count-badge total">{alertCounts.total}</span>
        </div>
      </div>

      <div className="alert-controls">
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as never)}
            className="filter-select"
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical Only</option>
            <option value="warning">Warnings Only</option>
            <option value="unacknowledged">Unacknowledged</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as never)}
            className="sort-select"
          >
            <option value="timestamp">Recent First</option>
            <option value="priority">Priority</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>
      
      <div className="alerts-list">
        {filteredAndSortedAlerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`alert-item ${getAlertTypeClass(alert.type)} ${alert.acknowledged ? 'acknowledged' : ''}`}
            onClick={() => onAlertClick(alert.id)}
          >
            <div className="alert-content">
              <div className="alert-main">
                <div className="alert-header-row">
                  <div className="alert-icon-title">
                    <span className="alert-icon">{alert.icon}</span>
                    <strong className="alert-title">{alert.title}</strong>
                  </div>
                  <div className="alert-timestamp">{formatTimestamp(alert.timestamp)}</div>
                </div>
                
                <div className="alert-description">
                  <small>{alert.description}</small>
                </div>

                {(alert.elevator || alert.location) && (
                  <div className="alert-meta">
                    {alert.elevator && (
                      <span className="alert-elevator">🏢 {alert.elevator}</span>
                    )}
                    {alert.location && (
                      <span className="alert-location">📍 {alert.location}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="alert-actions">
                {!alert.acknowledged && (
                  <button
                    className="action-btn acknowledge-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAcknowledge(alert.id);
                    }}
                    title="Acknowledge alert"
                  >
                    ✓
                  </button>
                )}
                
                <button
                  className="action-btn dismiss-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss(alert.id);
                  }}
                  title="Dismiss alert"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedAlerts.length === 0 && (
          <div className="no-alerts">
            <div className="no-alerts-icon">✅</div>
            <div className="no-alerts-text">
              {filter === 'all' 
                ? 'No alerts at this time'
                : `No ${filter} alerts found`
              }
            </div>
          </div>
        )}

        {alerts.length > maxDisplayed && (
          <div className="view-more">
            <button 
              className="view-more-btn"
              onClick={() => console.log('View more alerts')}
            >
              View {alerts.length - maxDisplayed} more alerts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertRemainings;