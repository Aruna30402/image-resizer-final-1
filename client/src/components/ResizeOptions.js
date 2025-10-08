import React from 'react';
import './ResizeOptions.css';

const ResizeOptions = ({ options, onChange, disabled }) => {
  const handleChange = (field, value) => {
    onChange({
      ...options,
      [field]: value
    });
  };

  const handleNumberChange = (field, value) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      handleChange(field, numValue);
    }
  };

  return (
    <div className="resize-options">
      <h2>Resize Options</h2>
      
      <div className="options-grid">
        <div className="option-group">
          <label htmlFor="width">Width (px)</label>
          <input
            id="width"
            type="number"
            min="1"
            value={options.width}
            onChange={(e) => handleNumberChange('width', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="option-group">
          <label htmlFor="height">Height (px)</label>
          <input
            id="height"
            type="number"
            min="1"
            value={options.height}
            onChange={(e) => handleNumberChange('height', e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="option-group">
          <label htmlFor="format">Output Format</label>
          <select
            id="format"
            value={options.format}
            onChange={(e) => handleChange('format', e.target.value)}
            disabled={disabled}
          >
            <option value="jpg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>

      <div className="option-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={options.maintainAspectRatio}
            onChange={(e) => handleChange('maintainAspectRatio', e.target.checked)}
            disabled={disabled}
          />
          <span className="checkmark"></span>
          Maintain aspect ratio
        </label>
        <p className="checkbox-description">
          When enabled, images will be resized to fit within the specified dimensions while preserving their original proportions.
        </p>
      </div>

    </div>
  );
};

export default ResizeOptions;
