import React from 'react';
import './SystemOverviewPanel.css';

interface SystemOverviewData {
  maintenanceScheduled: {
    priority: string;
    date: string;
    type: string;
    elevator: string;
    location: string;
  };
  elevatorsConnected: {
    connected: number;
    total: number;
  };
  alertsRemaining: number;
}

interface SystemOverviewPanelProps {
  data: SystemOverviewData;
}

const SystemOverviewPanel: React.FC<SystemOverviewPanelProps> = ({ data }) => {
  // Función para crear el gráfico circular SVG
  const createCircularProgress = (percentage: number, size: number = 120) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const color = '#10b981'; // green for connected elevators

    return (
      <svg width={size} height={size} className="circular-progress">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    );
  };

  const handleDetailsClick = (section: string) => {
    console.log(`Details clicked for: ${section}`);
    // Aquí puedes agregar la lógica para mostrar detalles
  };

  return (
    <section className="system-overview-card">
      <h2 className="system-overview-title">System overview Panel</h2>
      
      <div className="overview-metrics">
        {/* Maintenance Scheduled */}
        <div className="metric-card">
          <div className="metric-label">Maintenance scheduled</div>
          <div className="maintenance-info">
            <div className="maintenance-icon">
              <div className="calendar-icon">
                <div className="calendar-header">December 2022</div>
                <div className="calendar-grid">
                  <div className="calendar-day">23</div>
                </div>
              </div>
            </div>
            <div className="maintenance-details">
              <div className="priority-badge">Priority: {data.maintenanceScheduled.priority}</div>
              <div className="maintenance-date">Date: {data.maintenanceScheduled.date}</div>
              <div className="maintenance-meta">
                <div>Type: {data.maintenanceScheduled.type}</div>
                <div>Elevator: {data.maintenanceScheduled.elevator}</div>
                <div>Location: {data.maintenanceScheduled.location}</div>
              </div>
            </div>
          </div>
          <button 
            className="details-btn" 
            onClick={() => handleDetailsClick('maintenance')}
          >
            Details
          </button>
        </div>
        
        {/* Elevators Connected */}
        <div className="metric-card">
          <div className="metric-label">Elevators connected</div>
          <div className="elevators-connected">
            <div className="connected-chart">
              {createCircularProgress(100)}
              <div className="connected-text">
                {data.elevatorsConnected.connected}/{data.elevatorsConnected.total}
              </div>
            </div>
          </div>
          <button 
            className="details-btn" 
            onClick={() => handleDetailsClick('connected')}
          >
            Details
          </button>
        </div>
        
        {/* Alerts Remaining */}
        <div className="metric-card">
          <div className="metric-label">Alerts remaining</div>
          <div className="alerts-gauge">
            <div className="gauge-container">
              <div className="gauge-arc">
                <div className="gauge-needle"></div>
              </div>
              <div className="gauge-value">{data.alertsRemaining}</div>
            </div>
          </div>
          <button 
            className="details-btn" 
            onClick={() => handleDetailsClick('alerts')}
          >
            Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default SystemOverviewPanel;