import React, { useState } from 'react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isDragging?: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isDragging = false }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`upload-zone ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="upload-icon">📹</div>
      <div className="upload-text">
        <h3>Drop your video or image here</h3>
        <p>Or click to browse • MP4, WebM, PNG, JPEG • Up to 4GB</p>
      </div>
      <input
        type="file"
        onChange={handleChange}
        accept="video/*,image/*"
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input" style={{ cursor: 'pointer', position: 'absolute', inset: 0 }} />
    </div>
  );
};

const styles = `
.upload-zone {
  border: 2px dashed var(--color-border-secondary);
  border-radius: var(--border-radius-lg);
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-background-secondary);
  position: relative;
}

.upload-zone:hover {
  border-color: var(--color-border-primary);
  background: var(--color-background-tertiary);
}

.upload-zone.active {
  border-color: var(--color-border-primary);
  background: var(--color-background-tertiary);
  transform: scale(1.02);
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 1rem;
  display: block;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.upload-zone:hover .upload-icon {
  opacity: 1;
}

.upload-text h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 0.25rem;
  color: var(--color-text-primary);
}

.upload-text p {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0;
}
`;

export default UploadZone;
