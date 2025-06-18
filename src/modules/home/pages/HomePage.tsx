import React, { useState, useEffect } from 'react';
import './HomePage.css';
import AlertRemainings from '../components/AlertRemainings/AlertRemainings';
import ElevatorsGrid from '../components/ElevatorsGrid/ElevatorsGrid';
import ElevatorsList from '../components/ElevatorsList/ElevatorsList';
import Recommendations from '../components/Recommendations/Recommendations';
import SystemOverviewPanel from '../components/SystemOverviewPanel/SystemOverviewPanel';

// Interfaces principales
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

interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

const HomePage: React.FC = () => {
  // Estados principales
  const [systemOverview] = useState<SystemOverviewData>({
    maintenanceScheduled: {
      priority: 'Medium',
      date: '22/12/22',
      type: 'Motor maintenance',
      elevator: '#EI2323',
      location: 'Bangalore, Building 28'
    },
    elevatorsConnected: {
      connected: 80,
      total: 80
    },
    alertsRemaining: 4
  });

  const [elevators, setElevators] = useState<Elevator[]>([
    {
      id: '1',
      number: '#1428',
      status: 39,
      location: 'Bangalore',
      building: 'Building 14',
      lastMaintenance: '23.05.2024',
      floor: 5,
      direction: 'up'
    },
    {
      id: '2',
      number: '#1423',
      status: 47,
      location: 'Bangalore',
      building: 'Building 8',
      lastMaintenance: '15.03.2024',
      floor: 12,
      direction: 'down'
    },
    {
      id: '3',
      number: '#1500',
      status: 87,
      location: 'Bangalore',
      building: 'Building 12',
      lastMaintenance: '02.05.2024',
      floor: 1,
      direction: 'idle'
    }
  ]);

  // Datos de elevadores adicionales para la lista completa
  const [allElevators] = useState<Elevator[]>([
    ...elevators,
    {
      id: '4',
      number: '#1501',
      status: 72,
      location: 'Mumbai',
      building: 'Building A',
      lastMaintenance: '10.04.2024',
      floor: 8,
      direction: 'up'
    },
    {
      id: '5',
      number: '#1502',
      status: 55,
      location: 'Chennai',
      building: 'Building C',
      lastMaintenance: '28.03.2024',
      floor: 3,
      direction: 'idle'
    },
    // Agregar más elevadores simulados...
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 6}`,
      number: `#${1503 + i}`,
      status: Math.floor(Math.random() * 60) + 30,
      location: ['Bangalore', 'Mumbai', 'Chennai', 'Delhi'][Math.floor(Math.random() * 4)],
      building: `Building ${String.fromCharCode(65 + Math.floor(Math.random() * 10))}`,
      lastMaintenance: `${Math.floor(Math.random() * 28) + 1}.${Math.floor(Math.random() * 12) + 1}.2024`,
      floor: Math.floor(Math.random() * 20) + 1,
      direction: (['up', 'down', 'idle'] as const)[Math.floor(Math.random() * 3)]
    }))
  ]);

  const [recommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'warning',
      title: 'RUL Warning - Motor',
      description: 'It is predicted that the motor in Elevator #2342, located in Bangalore Tower 48, will drop below 75% remaining useful life within the next 5 days.',
      icon: '⚠',
      priority: 'high',
      estimatedTime: '2-3 hours',
      elevator: '#2342'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Vibration Anomaly Detected',
      description: 'Elevator #1120 in TechPark Sector C is showing vibration spikes reaching 2.4g on the traction cable, indicating potential imbalance in the system.',
      icon: '⚠',
      priority: 'medium',
      estimatedTime: '1-2 hours',
      elevator: '#1120'
    },
    {
      id: '3',
      type: 'critical',
      title: 'Temperature Risk - Brake Unit',
      description: 'Brake temperature in Elevator #0078 (Mumbai HQ) has been consistently above 85°C for 3 hours and is expected to breach critical limits.',
      icon: '🌡️',
      priority: 'high',
      estimatedTime: '30 minutes',
      elevator: '#0078'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Load Pattern Stress',
      description: 'Elevator #3105 in Chennai IT Hub has experienced 60+ high-load cycles (>400kg) in the last 48 hours. Component wear is accelerating.',
      icon: '⚖️',
      priority: 'medium',
      estimatedTime: '4-6 hours',
      elevator: '#3105'
    }
  ]);

  const [maintenanceSuggestions] = useState<MaintenanceSuggestion[]>([
    {
      id: '1',
      title: 'Maintenance Suggestion for Motor',
      description: 'Based on current usage patterns, schedule a motor check for Elevator #2342 within the next 3 days, as no maintenance is currently booked for that window.',
      priority: 'high',
      estimatedDuration: '2-3 hours',
      requiredParts: ['Motor oil', 'Belt']
    },
    {
      id: '2',
      title: 'Door System Inspection',
      description: 'We recommend to verify the door operation of Elevator #1100 by end of week. Vibrations indicate a possible misalignment causing friction during operation.',
      priority: 'medium',
      estimatedDuration: '1-2 hours',
      requiredParts: ['Door sensors', 'Lubricant']
    },
    {
      id: '3',
      title: 'Cooling System Check',
      description: 'Activate emergency ventilation and schedule a thermal system inspection for Elevator #0078 within 24 hours to avoid overheating.',
      priority: 'high',
      estimatedDuration: '3-4 hours',
      requiredParts: ['Cooling fan', 'Thermal sensors']
    },
    {
      id: '4',
      title: 'Cycle Load Balancing',
      description: 'Usage patterns suggest overload on Elevator #3105. Consider temporarily redistributing floor access load to Elevator #3106 during peak hours.',
      priority: 'low',
      estimatedDuration: '1 hour',
      requiredParts: []
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'RUL Warning - Motor',
      description: 'It is predicted that the motor in Elevator #2342, located in Bangalore Tower 48, will drop below 75% remaining useful life within the next 5 days.',
      icon: '⚠',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      elevator: '#2342',
      location: 'Bangalore Tower 48',
      priority: 'high',
      acknowledged: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Vibration Anomaly Detected',
      description: 'Elevator #1120 in TechPark Sector C is showing vibration spikes reaching 2.4g on the traction cable, indicating potential imbalance in the system.',
      icon: '⚠',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      elevator: '#1120',
      location: 'TechPark Sector C',
      priority: 'medium',
      acknowledged: true
    },
    {
      id: '3',
      type: 'critical',
      title: 'Temperature Risk - Brake Unit',
      description: 'Brake temperature in Elevator #0078 (Mumbai HQ) has been consistently above 85°C for 3 hours and is expected to breach critical limits.',
      icon: '🌡️',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      elevator: '#0078',
      location: 'Mumbai HQ',
      priority: 'high',
      acknowledged: false
    },
    {
      id: '4',
      type: 'warning',
      title: 'Load Pattern Stress',
      description: 'Elevator #3105 in Chennai IT Hub has experienced 60+ high-load cycles (>400kg) in the last 48 hours. Component wear is accelerating.',
      icon: '⚖️',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      elevator: '#3105',
      location: 'Chennai IT Hub',
      priority: 'medium',
      acknowledged: false
    },
    {
      id: '5',
      type: 'info',
      title: 'Maintenance Completed',
      description: 'Scheduled maintenance for Elevator #1428 has been completed successfully. All systems are operational.',
      icon: '✅',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      elevator: '#1428',
      location: 'Bangalore Building 14',
      priority: 'low',
      acknowledged: true
    },
    {
      id: '6',
      type: 'warning',
      title: 'Door Response Delay',
      description: 'Elevator #1423 is experiencing delayed door response times. Average opening time has increased to 4.2 seconds.',
      icon: '🚪',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      elevator: '#1423',
      location: 'Bangalore Building 8',
      priority: 'medium',
      acknowledged: false
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'What is this chat for?',
      timestamp: '14/02/2025 23:22',
      isUser: true
    },
    {
      id: '2',
      text: 'This chat helps you monitor your elevator conditions and address maintenance needs. Ask me about component status, alerts, or when a part might need 😊',
      timestamp: '14/02/2025 23:23',
      isUser: false
    }
  ]);

  // Estados para UI
  const [chatInput, setChatInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showElevatorsList, setShowElevatorsList] = useState(false);

  // Handlers para eventos
  const handleChatSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: String(chatMessages.length + 1),
        text: chatInput,
        timestamp: new Date().toLocaleString(),
        isUser: true
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // Simular respuesta del bot
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: String(chatMessages.length + 2),
          text: 'I understand your question. Let me check the elevator systems for you.',
          timestamp: new Date().toLocaleString(),
          isUser: false
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleViewAllElevators = () => {
    setShowElevatorsList(true);
  };

  const handleCloseElevatorsList = () => {
    setShowElevatorsList(false);
  };

  const handleElevatorSelect = (elevatorId: string) => {
    console.log('Elevator selected:', elevatorId);
    // Aquí puedes agregar lógica para mostrar detalles del elevador
  };

  const handleRecommendationClick = (id: string) => {
    console.log('Recommendation clicked:', id);
    // Aquí puedes agregar lógica para manejar recomendaciones
  };

  const handleSuggestionClick = (id: string) => {
    console.log('Suggestion clicked:', id);
    // Aquí puedes agregar lógica para manejar sugerencias
  };

  const handleViewAllRecommendations = () => {
    console.log('View all recommendations');
    // Aquí puedes agregar lógica para mostrar todas las recomendaciones
  };

  const handleAlertClick = (alertId: string) => {
    console.log('Alert clicked:', alertId);
    // Aquí puedes agregar lógica para mostrar detalles de la alerta
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  // Efecto para simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setElevators(prev => prev.map(elevator => ({
        ...elevator,
        status: Math.max(35, Math.min(95, elevator.status + Math.floor(Math.random() * 3) - 1))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-icon active">🏢</div>
        <div className="sidebar-icon">🏠</div>
        <div className="sidebar-icon">✓</div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <span style={{ color: '#4a90e2', fontWeight: 700 }}>Infosys</span>
            <span style={{ color: '#64748b' }}>InStep</span>
          </div>
          
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Placeholder"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          
          <div className="user-profile">
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Niiraj</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Operations manager</div>
            </div>
            <div className="user-avatar">N</div>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          <div className="left-panel">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
              <a href="#" onClick={() => console.log('Navigation')}>🏠</a>
              <span>›</span>
              <span>System Overview Panel</span>
            </nav>

            {/* System Overview Panel */}
            <SystemOverviewPanel data={systemOverview} />

            {/* Elevators Grid */}
            <ElevatorsGrid 
              elevators={elevators}
              onViewAll={handleViewAllElevators}
              additionalCount={12}
            />

            {/* Recommendations */}
            <Recommendations
              recommendations={recommendations}
              maintenanceSuggestions={maintenanceSuggestions}
              onViewAll={handleViewAllRecommendations}
              onRecommendationClick={handleRecommendationClick}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>

          {/* Right Panel */}
          <aside className="right-panel">
            {/* Chat */}
            <div className="card">
              <div className="chat-container">
                <div className="chat-header">
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Chat</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    Gemini-2.0-flash
                  </div>
                  <div className="chat-info">
                    What is this chat for?
                    <span className="chat-timestamp">14/02/2025 23:22</span>
                  </div>
                </div>
                
                <div className="chat-messages">
                  {chatMessages.map((message) => (
                    <div key={message.id}>
                      {message.isUser ? (
                        <div className="user-message">
                          <div className="message-bubble user-bubble">
                            {message.text}
                          </div>
                          <div className="message-timestamp">{message.timestamp}</div>
                        </div>
                      ) : (
                        <div className="bot-message">
                          <div className="message-bubble bot-bubble">
                            {message.text}
                          </div>
                          <div className="message-timestamp">{message.timestamp}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="chat-input-area">
                  <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="Is the motor in good condition...?"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleChatSubmit}
                  />
                </div>
              </div>
            </div>

            {/* Alert Remainings */}
            <AlertRemainings
              alerts={alerts}
              onAlertClick={handleAlertClick}
              onAcknowledge={handleAcknowledgeAlert}
              onDismiss={handleDismissAlert}
              maxDisplayed={6}
            />
          </aside>
        </main>
      </div>

      {/* Elevators List Modal */}
      {showElevatorsList && (
        <ElevatorsList
          elevators={allElevators}
          onClose={handleCloseElevatorsList}
          onElevatorSelect={handleElevatorSelect}
        />
      )}
    </div>
  );
};

export default HomePage;