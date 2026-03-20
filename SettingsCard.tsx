import React from 'react';

export type UpscaleModel = 'anime4k' | 'realesrgan';
export type QualityLevel = 'small' | 'medium' | 'large';
export type ProcessingMethod = 'webgpu' | 'webgl';
export type OutputFormat = 'mp4' | 'webm';

interface UpscalerSettings {
  model: UpscaleModel;
  quality: QualityLevel;
  processing: ProcessingMethod;
  format: OutputFormat;
}

interface SettingsProps {
  settings: UpscalerSettings;
  onSettingChange: (key: keyof UpscalerSettings, value: any) => void;
}

export const SettingsCard: React.FC<SettingsProps> = ({ settings, onSettingChange }) => {
  return (
    <div className="settings-grid">
      {/* Model Selection */}
      <div className="setting-card">
        <label className="setting-label">Upscaling model</label>
        <div className="option-group">
          {[
            { value: 'anime4k' as const, label: 'Anime4K', desc: 'Best for anime' },
            { value: 'realesrgan' as const, label: 'RealESRGAN', desc: 'Best for photos' }
          ].map(option => (
            <button
              key={option.value}
              className={`option-btn ${settings.model === option.value ? 'active' : ''}`}
              onClick={() => onSettingChange('model', option.value)}
              title={option.desc}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="setting-hint">
          {settings.model === 'anime4k' 
            ? 'Optimized for animated content and cartoons'
            : 'Works well with photographs and real-world videos'}
        </p>
      </div>

      {/* Quality Level */}
      <div className="setting-card">
        <label className="setting-label">Quality level</label>
        <div className="option-group">
          {[
            { value: 'small' as const, label: 'Small', desc: 'Fastest' },
            { value: 'medium' as const, label: 'Medium', desc: 'Recommended' },
            { value: 'large' as const, label: 'Large', desc: 'Best quality' }
          ].map(option => (
            <button
              key={option.value}
              className={`option-btn ${settings.quality === option.value ? 'active' : ''}`}
              onClick={() => onSettingChange('quality', option.value)}
              title={option.desc}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="setting-hint">
          {settings.quality === 'large' && '⏱️ Slower processing, best results'}
          {settings.quality === 'medium' && '⚡ Balanced speed and quality'}
          {settings.quality === 'small' && '🚀 Fastest processing, good results'}
        </p>
      </div>

      {/* Processing Method */}
      <div className="setting-card">
        <label className="setting-label">Processing engine</label>
        <div className="option-group">
          {[
            { value: 'webgpu' as const, label: 'WebGPU', desc: 'Modern & fast' },
            { value: 'webgl' as const, label: 'WebGL', desc: 'Fallback' }
          ].map(option => (
            <button
              key={option.value}
              className={`option-btn ${settings.processing === option.value ? 'active' : ''}`}
              onClick={() => onSettingChange('processing', option.value)}
              title={option.desc}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="setting-hint">
          WebGPU is recommended for better performance
        </p>
      </div>

      {/* Output Format */}
      <div className="setting-card">
        <label className="setting-label">Output format</label>
        <div className="option-group">
          {[
            { value: 'mp4' as const, label: 'MP4', desc: 'Most compatible' },
            { value: 'webm' as const, label: 'WebM', desc: 'Open format' }
          ].map(option => (
            <button
              key={option.value}
              className={`option-btn ${settings.format === option.value ? 'active' : ''}`}
              onClick={() => onSettingChange('format', option.value)}
              title={option.desc}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="setting-hint">
          {settings.format === 'mp4' ? 'Works on all devices' : 'Open-source codec'}
        </p>
      </div>
    </div>
  );
};

const styles = `
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.setting-card {
  background: var(--color-background-primary);
  border: 0.5px solid var(--color-border-tertiary);
  border-radius: var(--border-radius-md);
  padding: 1rem;
}

.setting-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
  display: block;
}

.setting-hint {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-style: italic;
}

.option-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.option-btn {
  flex: 1;
  min-width: 60px;
  padding: 0.5rem;
  border: 0.5px solid var(--color-border-tertiary);
  background: var(--color-background-primary);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;
  text-align: center;
  color: var(--color-text-primary);
}

.option-btn:hover {
  border-color: var(--color-border-secondary);
  background: var(--color-background-secondary);
}

.option-btn.active {
  background: var(--color-background-info);
  color: var(--color-text-info);
  border-color: var(--color-border-info);
}

@media (max-width: 640px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
`;

export default SettingsCard;
