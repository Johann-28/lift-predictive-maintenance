import React, { useState } from 'react';
import './ElevatorsList.css';

interface Elevator {
  id: string;
  number: string;
  status: number;
  location: string;
  building: string;
  lastMaintenance: string;
  floor?: number;
  direction?: 'up' | 'down' | 'idle';
  capacity?: number;
  currentLoad?: number;
}

interface ElevatorsListProps {
  elevators: Elevator[];
  onClose: () => void;
  onElevatorSelect: (elevatorId: string) => void;
}

const ElevatorsList: React.FC<ElevatorsListProps> = ({ 
  elevators, 
  onClose, 
  onElevatorSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'number' | 'status' | 'location'>('number');
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warning' | 'critical'>('all');

  const getStatusCategory = (status: number): 'good' | 'warning' | 'critical' => {
    if (status >= 70) return 'good';
    if (status >= 50) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status: number): string => {
    if (status >= 70) return '#10b981';
    if (status >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const filteredAndSortedElevators = elevators
    .filter(elevator => {
      const matchesSearch = elevator.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           elevator.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           elevator.building.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || getStatusCategory(elevator.status) === filterStatus;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'number':
          return a.number.localeCompare(b.number);
        case 'status':
          return b.status - a.status;
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

  return (
    <div className="elevators-list-modal">
      <div className="elevators-list-container">
        <div className="elevators-list-header">
          <h2>All Elevators</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="elevators-list-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search elevators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'number' | 'status' | 'location')}
              className="sort-select"
            >
              <option value="number">Sort by Number</option>
              <option value="status">Sort by Status</option>
              <option value="location">Sort by Location</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'good' | 'warning' | 'critical')}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="good">Good (70%+)</option>
              <option value="warning">Warning (50-69%)</option>
              <option value="critical">Critical (&lt;50%)</option>
            </select>
          </div>
        </div>

        <div className="elevators-list-content">
          <div className="elevators-list-table">
            <div className="table-header">
              <div className="table-cell">Elevator</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Location</div>
              <div className="table-cell">Floor</div>
              <div className="table-cell">Last Maintenance</div>
              <div className="table-cell">Actions</div>
            </div>

            {filteredAndSortedElevators.map((elevator) => (
              <div 
                key={elevator.id} 
                className="table-row"
                onClick={() => onElevatorSelect(elevator.id)}
              >
                <div className="table-cell">
                  <div className="elevator-info">
                    <div className="elevator-number">{elevator.number}</div>
                    <div className="elevator-meta">{elevator.building}</div>
                  </div>
                </div>

                <div className="table-cell">
                  <div className="status-indicator">
                    <div 
                      className="status-dot"
                      style={{ backgroundColor: getStatusColor(elevator.status) }}
                    ></div>
                    <span className="status-text">{elevator.status}%</span>
                  </div>
                </div>

                <div className="table-cell">
                  <div className="location-info">
                    <div className="location-name">{elevator.location}</div>
                    <div className="building-name">{elevator.building}</div>
                  </div>
                </div>

                <div className="table-cell">
                  <div className="floor-info">
                    <span className="floor-number">{elevator.floor || 'G'}</span>
                    {elevator.direction && (
                      <span className={`direction-indicator ${elevator.direction}`}>
                        {elevator.direction === 'up' ? '↑' : elevator.direction === 'down' ? '↓' : '⏸'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="table-cell">
                  <div className="maintenance-date">{elevator.lastMaintenance}</div>
                </div>

                <div className="table-cell">
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onElevatorSelect(elevator.id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedElevators.length === 0 && (
            <div className="no-results">
              <p>No elevators found matching your criteria.</p>
            </div>
          )}
        </div>

        <div className="elevators-list-footer">
          <div className="results-count">
            Showing {filteredAndSortedElevators.length} of {elevators.length} elevators
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorsList;