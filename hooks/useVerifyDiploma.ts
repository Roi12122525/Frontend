import { useState } from 'react';

interface VerificationResult {
  valid: boolean;
  diploma: {
    studentName: string;
    degree: string;
    field: string;
    graduationDate: string;
    issuerName: string;
    hash: string;
  };
}

export const useVerifyDiploma = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyDiploma = async (hash: string): Promise<VerificationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simuler un résultat de vérification
      const result: VerificationResult = {
        valid: true,
        diploma: {
          studentName: 'John Doe',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          graduationDate: '2023-05-15',
          issuerName: 'University of Example',
          hash,
        },
      };

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify diploma');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyDiploma, isLoading, error };
}; 