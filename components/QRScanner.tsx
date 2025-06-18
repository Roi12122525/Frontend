'use client';

import { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useVerifyDiploma } from '../hooks/useVerifyDiploma';

interface QRScannerProps {
  onSuccess: (data: any) => void;
  onError: (error: Error) => void;
}

export const QRScanner = ({ onSuccess, onError }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { verifyDiploma, isLoading } = useVerifyDiploma();

  const handleScan = async (result: any) => {
    if (result) {
      try {
        setScanning(false);
        const verificationResult = await verifyDiploma(result.text);
        onSuccess(verificationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to verify diploma');
        onError(err instanceof Error ? err : new Error('Failed to verify diploma'));
      }
    }
  };

  const handleError = (err: Error) => {
    setError(err.message);
    onError(err);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
        {scanning ? (
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">Camera is off</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setScanning(!scanning)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {scanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center p-2 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}; 