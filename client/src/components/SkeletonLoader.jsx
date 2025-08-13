// src/components/SkeletonLoader.jsx

import React from "react";

// This is a simple, reusable skeleton loader component.
// It creates a grey box with a pulsing animation.
// We can customize its width and height using props.
const SkeletonLoader = ({ className }) => {
  return (
    <div className={`bg-gray-200 rounded-md animate-pulse ${className}`}></div>
  );
};

export default SkeletonLoader;
