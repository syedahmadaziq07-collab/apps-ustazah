import React from 'react';
import { SoftSkyBackground, StarSparklePattern, CloudDecoration, GreenHillBackground } from './Decorations';

interface AppBackgroundProps {
  children?: React.ReactNode;
  variant?: 'sky' | 'sunset' | 'night' | 'garden';
  showHills?: boolean;
  showClouds?: boolean;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ 
  children, 
  variant = 'sky', 
  showHills = false, 
  showClouds = true 
}) => {
  return (
    <SoftSkyBackground variant={variant}>
      <StarSparklePattern />
      {showClouds && (
        <>
          <CloudDecoration className="absolute top-12 left-4 opacity-75" speed="slow" />
          <CloudDecoration className="absolute top-32 -right-4 opacity-60" speed="normal" />
        </>
      )}
      {showHills && <GreenHillBackground />}
      {children}
    </SoftSkyBackground>
  );
};
