import React from 'react';
import './ElevatorsGrid.css';

interface Elevator {
  id: string;
  number: string;
  status: number;
  location: string;
  building: string;
  lastMaintenance: string;
}

interface ElevatorsGridProps {
  elevators: Elevator[];
  onViewAll: () => void;
  additionalCount?: number;
}

const ElevatorsGrid: React.FC<ElevatorsGridProps> = ({ 
  elevators, 
  onViewAll, 
  additionalCount = 12 
}) => {
  // Función para crear el gráfico circular SVG
  const createCircularProgress = (percentage: number, size: number = 60) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    let color = '#ef4444'; // red for warning
    if (percentage >= 70) color = '#10b981'; // green for good
    else if (percentage >= 50) color = '#f59e0b'; // yellow for medium

    return (
      <svg width={size} height={size} className="circular-progress">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dy="0.3em"
          fontSize="12"
          fontWeight="600"
          fill="#1f2937"
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  const handleElevatorClick = (elevatorId: string) => {
    console.log(`Elevator clicked: ${elevatorId}`);
    // Aquí puedes agregar la lógica para mostrar detalles del elevador
  };

  return (
    <section className="elevators-section">
      <h2 className="elevators-title">Elevators</h2>
      
      <div className="elevators-grid">
        {elevators.map((elevator) => (
          <div 
            key={elevator.id} 
            className="elevator-card"
            onClick={() => handleElevatorClick(elevator.id)}
          >
            <div className="elevator-id">Elevator {elevator.number}</div>
            <div className="elevator-status-container">
              {createCircularProgress(elevator.status)}
            </div>
            <div className="elevator-location">
              {elevator.location}<br />{elevator.building}
            </div>
            <div className="elevator-maintenance">
              Last maintenance<br />{elevator.lastMaintenance}
            </div>
          </div>
        ))}
        
        <div 
          className="elevator-card elevator-more" 
          onClick={onViewAll}
        >
          <div className="elevator-id">Elevators</div>
          <div className="more-count">+{additionalCount}</div>
          <div className="more-text">More elevators</div>
        </div>
      </div>
    </section>
  );
};

export default ElevatorsGrid;