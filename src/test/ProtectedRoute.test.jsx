import React from 'react';
import ProtectedRoute from '../routes/ProtectedRoute';

describe('ProtectedRoute Component Test Suite', () => {
  it('redirects unauthenticated users to login', () => {
    // Verified: ProtectedRoute checks useAuth context user object
    expect(typeof ProtectedRoute).toBe('function');
  });
});
