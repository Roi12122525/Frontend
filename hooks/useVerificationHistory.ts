import { useState, useEffect } from 'react';
import { useApi } from './useApi';

interface VerificationHistory {
  studentName: string;
  status: 'valid' | 'invalid' | 'pending';
  verificationDate: string;
  degree: string;
  field: string;
  hash: string;
}

export const useVerificationHistory = () => {
  const [verifications, setVerifications] = useState<VerificationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { get } = useApi();

  useEffect(() => {
    const fetchVerificationHistory = async () => {
      try {
        setIsLoading(true);
        const response = await get('/api/verifications/history');
        setVerifications(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch verification history'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerificationHistory();
  }, [get]);

  return { verifications, isLoading, error };
}; 