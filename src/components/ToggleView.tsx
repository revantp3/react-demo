import React, { useState } from 'react';

const ToggleView = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const toggleView = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };

  return (
    <button onClick={toggleView}>
      Switch to {viewMode === 'list' ? 'Grid' : 'List'} View
    </button>
  );
};

export default ToggleView;
