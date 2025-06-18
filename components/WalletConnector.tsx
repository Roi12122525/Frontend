'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { create } from 'zustand';

// Mapping local d'adresses vers rôles (à adapter selon besoin)
const addressRoleMap: Record<string, 'admin' | 'issuer' | 'verifier'> = {
  '0x1234567890123456789012345678901234567890': 'admin',
  '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd': 'issuer',
  '0x9876543210987654321098765432109876543210': 'verifier',
};

interface WalletState {
  address: string | null;
  isConnected: boolean;
  role: 'admin' | 'issuer' | 'verifier' | null;
  setAddress: (address: string | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setRole: (role: 'admin' | 'issuer' | 'verifier' | null) => void;
}

export const useWalletStore = create<WalletState>((set: any) => ({
  address: null,
  isConnected: false,
  role: null,
  setAddress: (address: string | null) => set({ address }),
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  setRole: (role: 'admin' | 'issuer' | 'verifier' | null) => set({ role }),
}));

declare global {
  interface Window {
    ethereum: any;
  }
}

export const WalletConnector = () => {
  const { address, isConnected, setAddress, setIsConnected, role, setRole } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this feature');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        const userAddress = accounts[0];
        setAddress(userAddress);
        setIsConnected(true);
        localStorage.setItem('walletAddress', userAddress);
        // Déterminer le rôle à partir du mapping local
        const userRole = addressRoleMap[userAddress] || null;
        setRole(userRole);
        localStorage.setItem('userRole', userRole || '');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    setRole(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedRole = localStorage.getItem('userRole') as 'admin' | 'issuer' | 'verifier' | null;
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
      setRole(savedRole);
    }
  }, [setAddress, setIsConnected, setRole]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Wallet Connection</h2>
        <p className="text-gray-600">Connect your wallet to access the platform</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isConnected ? (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                  <p className="text-xs text-gray-500">Role: {role || 'Aucun rôle'}</p>
                </div>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2 shadow-md"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}; 