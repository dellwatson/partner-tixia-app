// Test file to isolate import issues
import { useState } from 'react';
import { Container } from '~/components/ui/container';
import { LoadingWrapper } from '~/components/ui/loading-wrapper';

// Test imports one by one
try {
  // Navigation
  const { HotelNavigation } = await import('./0_navigation/HotelNavigation');
  console.log('✅ HotelNavigation imported successfully');
} catch (error) {
  console.error('❌ HotelNavigation import failed:', error);
}

try {
  // Overview
  const HotelOverview = await import('./1_overview/HotelOverview');
  console.log('✅ HotelOverview imported successfully');
} catch (error) {
  console.error('❌ HotelOverview import failed:', error);
}

try {
  // Room
  const AvailabilityArea = await import('./2_room/AvailabilityArea');
  console.log('✅ AvailabilityArea imported successfully');
} catch (error) {
  console.error('❌ AvailabilityArea import failed:', error);
}

export function TestImports() {
  return <div>Testing imports...</div>;
}
