import React, { useState } from 'react';
import UploadZone from './UploadZone';
import SettingsCard, { UpscalerSettings } from './SettingsCard';
import ProgressTracker from './ProgressTracker';
import './styles.css';

type ProcessingState = 'idle' | 'uploading' | 'initializing' | 'processing' | 'saving' | 'complete' | 'error';

interface UploaderState {
  file: File | null;
  state: ProcessingState;
  progress: number;
  currentFrame: number;
  totalFrames: number;
  estimatedTimeLeft: string;
}

const DEFAULT_SETTINGS: UpscalerSettings = {
  model: 'anime4k',
  quality: 'medium',
  processing: 'webgpu',
  format: 'mp4',
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<UpscalerSettings>(DEFAULT_SETTINGS);
  const [uploader, setUploader] = useState<UploaderState>({
    file: null,
    state: 'idle',
    progress: 0,
    currentFrame: 0,
    totalFrames: 0,
    estimatedTimeLeft: '',
  });

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name, file.size);
    setUploader(prev => ({
      ...prev,
      file,
      state: 'uploading',
    }));
    
    // Simulate file upload
    setTimeout(() => {
      setUploader(prev => ({
        ...prev,
        state: 'initializing',
      }));
    }, 500);
  };

  const handleSettingChange = (key: keyof UpscalerSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const startUpscaling = () => {
    if (!uploader.file) return;

    setUploader(prev => ({
      ...prev,
      state: 'processing',
      totalFrames: 1350,
      estimatedTimeLeft: '12 minutes',
    }));

    // Simulate progress
    let frame = 0;
    const interval = setInterval(() => {
      frame += Math.floor(Math.random() * 5) + 1;
      const progress = Math.min((frame / 1350) * 100, 100);
      
      setUploader(prev => ({
        ...prev,
        currentFrame: frame,
        progress,
        estimatedTimeLeft: Math.ceil((1350 - frame) / 50) + ' minutes',
      }));

      if (frame >= 1350) {
        clearInterval(interval);
        setUploader(prev => ({
          ...prev,
          state: 'saving',
          estimatedTimeLeft: '1 minute',
        }));
        
        // Simulate saving
        setTimeout(() => {
          setUploader(prev => ({
            ...prev,
            state: 'complete',
          }));
        }, 2000);
      }
    }, 500);
  };

  const resetUploader = () => {
    setUploader({
      file: null,
      state: 'idle',
      progress: 0,
      currentFrame: 0,
      totalFrames: 0,
      estimatedTimeLeft: '',
    });
  };

  const getProgressSteps = () => {
    const steps = [
      {
        id: 'upload',
        title: 'File loaded',
        description: `${uploader.file?.name} • ${formatFileSize(uploader.file?.size || 0)}`,
        status: uploader.state !== 'idle' ? 'completed' : 'pending' as const,
        icon: '📁',
      },
      {
        id: 'initialize',
        title: 'Initializing',
        description: `Model: ${settings.model.toUpperCase()} • Quality: ${settings.quality}`,
        status: 
          uploader.state === 'processing' || uploader.state === 'saving' || uploader.state === 'complete'
            ? 'completed'
            : uploader.state === 'initializing'
            ? 'in-progress'
            : 'pending',
        icon: '⚙',
      },
      {
        id: 'upscale',
        title: 'Upscaling video',
        description: `Using ${settings.processing.toUpperCase()} • ${settings.quality} quality`,
        status:
          uploader.state === 'processing'
            ? 'in-progress'
            : uploader.state === 'saving' || uploader.state === 'complete'
            ? 'completed'
            : 'pending',
        progress: uploader.progress,
        icon: '🎬',
      },
      {
        id: 'save',
        title: 'Saving output',
        description: `Format: ${settings.format.toUpperCase()} • Ready to download`,
        status:
          uploader.state === 'saving' ? 'in-progress' : uploader.state === 'complete' ? 'completed' : 'pending',
        icon: '💾',
      },
    ];

    return steps;
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>AI Video Upscaler</h1>
        <p>Enhance your videos with intelligent upscaling • Fast • Free • No signup</p>
      </div>

      {/* Main Content */}
      {uploader.state === 'idle' ? (
        <>
          {/* Upload Zone */}
          <UploadZone onFileSelect={handleFileSelect} />

          {/* Settings */}
          <SettingsCard settings={settings} onSettingChange={handleSettingChange} />

          {/* Action Buttons */}
          <div className="action-group">
            <button 
              className="btn"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              Choose file
            </button>
            <button 
              className="btn primary"
              onClick={startUpscaling}
              disabled={!uploader.file}
            >
              Start upscaling
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Processing State */}
          <ProgressTracker
            steps={getProgressSteps()}
            stats={{
              originalResolution: '1920×1080',
              upscaledResolution: '4K (3840×2160)',
              currentFrame: uploader.currentFrame,
              totalFrames: uploader.totalFrames,
              estimatedTimeLeft: uploader.estimatedTimeLeft,
              duration: '45 seconds',
              fileSize: formatFileSize(uploader.file?.size || 0),
            }}
          />

          {/* Comparison Section */}
          {uploader.state === 'complete' && (
            <div className="comparison-section">
              <div className="comparison-box">
                <div className="comparison-label">Original</div>
                <p>Video preview would appear here</p>
              </div>
              <div className="comparison-box">
                <div className="comparison-label">Upscaled</div>
                <p>Upscaled video preview</p>
              </div>
            </div>
          )}

          {/* Complete Actions */}
          {uploader.state === 'complete' && (
            <div className="action-group">
              <button className="btn">Download video</button>
              <button className="btn primary" onClick={resetUploader}>
                Upscale another
              </button>
            </div>
          )}

          {/* Processing Actions */}
          {(uploader.state === 'processing' || uploader.state === 'saving') && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              <p style={{ margin: 0 }}>
                ⚠️ Keep this tab open while upscaling. Closing the tab will interrupt the process.
              </p>
            </div>
          )}
        </>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        id="file-input"
        onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
        accept="video/*,image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

// Utility function
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export default App;
