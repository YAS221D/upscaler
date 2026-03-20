import React from 'react';

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress?: number; // 0-100
  icon: string;
}

interface ProgressTrackerProps {
  steps: ProcessingStep[];
  stats: {
    originalResolution?: string;
    upscaledResolution?: string;
    currentFrame?: number;
    totalFrames?: number;
    estimatedTimeLeft?: string;
    fileSize?: string;
    duration?: string;
  };
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return '✓';
    case 'in-progress':
      return '⚙';
    case 'pending':
      return '⏳';
    default:
      return '○';
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'warning';
    case 'pending':
      return 'tertiary';
    default:
      return 'secondary';
  }
};

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ steps, stats }) => {
  const currentFrame = stats.currentFrame || 0;
  const totalFrames = stats.totalFrames || 1;
  const overallProgress = Math.round((currentFrame / totalFrames) * 100);

  return (
    <div className="progress-section">
      <div className="section-header">
        <h2>Processing progress</h2>
        {stats.estimatedTimeLeft && (
          <span className="time-estimate">⏱️ ~{stats.estimatedTimeLeft} remaining</span>
        )}
      </div>

      <div className="progress-container">
        {steps.map((step) => (
          <div key={step.id} className={`progress-item status-${step.status}`}>
            <div className={`progress-icon bg-${getStatusBg(step.status)}`}>
              {getStatusIcon(step.status)}
            </div>
            <div className="progress-content">
              <div className="progress-text">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
              {step.status === 'in-progress' && step.progress !== undefined && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Grid */}
      <div className="stat-grid">
        {stats.originalResolution && (
          <div className="stat-box">
            <p className="stat-label">Original</p>
            <p className="stat-value">{stats.originalResolution}</p>
          </div>
        )}
        {stats.upscaledResolution && (
          <div className="stat-box">
            <p className="stat-label">Upscaled</p>
            <p className="stat-value">{stats.upscaledResolution}</p>
          </div>
        )}
        {stats.currentFrame && stats.totalFrames && (
          <div className="stat-box">
            <p className="stat-label">Progress</p>
            <p className="stat-value">{overallProgress}%</p>
          </div>
        )}
        {stats.estimatedTimeLeft && (
          <div className="stat-box">
            <p className="stat-label">Time left</p>
            <p className="stat-value">{stats.estimatedTimeLeft}</p>
          </div>
        )}
        {stats.duration && (
          <div className="stat-box">
            <p className="stat-label">Duration</p>
            <p className="stat-value">{stats.duration}</p>
          </div>
        )}
        {stats.fileSize && (
          <div className="stat-box">
            <p className="stat-label">File size</p>
            <p className="stat-value">{stats.fileSize}</p>
          </div>
        )}
      </div>

      {/* Overall Progress Bar */}
      {stats.currentFrame && stats.totalFrames && (
        <div className="overall-progress">
          <div className="progress-info">
            <span>Processing video</span>
            <span className="progress-number">
              Frame {stats.currentFrame} of {stats.totalFrames}
            </span>
          </div>
          <div className="progress-bar-lg">
            <div 
              className="progress-fill-lg"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = `
.progress-section {
  margin: 2rem 0;
  padding-top: 2rem;
  border-top: 0.5px solid var(--color-border-tertiary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: var(--color-text-primary);
}

.time-estimate {
  font-size: 13px;
  color: var(--color-text-secondary);
  background: var(--color-background-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-md);
}

.progress-container {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.progress-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  border: 0.5px solid transparent;
  transition: all 0.2s ease;
}

.progress-item.status-completed {
  opacity: 0.8;
}

.progress-item.status-in-progress {
  background: var(--color-background-primary);
  border-color: var(--color-border-secondary);
}

.progress-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
  font-size: 18px;
  color: white;
}

.progress-icon.bg-success {
  background: var(--color-background-success);
  color: var(--color-text-success);
}

.progress-icon.bg-warning {
  background: var(--color-background-warning);
  color: var(--color-text-warning);
}

.progress-icon.bg-tertiary {
  background: var(--color-background-tertiary);
  color: var(--color-text-secondary);
}

.progress-content {
  flex: 1;
}

.progress-text h4 {
  margin: 0 0 0.25rem;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.progress-text p {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--color-background-tertiary);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.75rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-background-info), var(--color-background-success));
  border-radius: 2px;
  transition: width 0.3s ease;
}

.overall-progress {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.progress-number {
  font-weight: 500;
  color: var(--color-text-primary);
}

.progress-bar-lg {
  width: 100%;
  height: 6px;
  background: var(--color-background-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill-lg {
  height: 100%;
  background: linear-gradient(90deg, var(--color-background-info), var(--color-background-success));
  border-radius: 3px;
  transition: width 0.3s ease;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.stat-box {
  background: var(--color-background-primary);
  padding: 1rem;
  border-radius: var(--border-radius-md);
  border: 0.5px solid var(--color-border-tertiary);
  text-align: center;
  transition: all 0.2s ease;
}

.stat-box:hover {
  border-color: var(--color-border-secondary);
}

.stat-value {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0.5rem 0;
}

.stat-label {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 640px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
`;

export default ProgressTracker;
