'use client';

import { useBlockchainProof } from '@/hooks/useApi';

interface VerificationResultProps {
  data: {
    valid: boolean;
    diploma: {
      studentName: string;
      degree: string;
      field: string;
      graduationDate: string;
      issuerName: string;
    };
  };
}

export const VerificationResult = ({ data }: VerificationResultProps) => {
  const { data: blockchainProof, isLoading: isLoadingProof } = useBlockchainProof(
    data.valid ? data.diploma.studentName : ''
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Verification Result</h2>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            data.valid
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {data.valid ? 'Valid' : 'Invalid'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Student Information</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {data.diploma.studentName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Degree</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {data.diploma.degree}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Field of Study</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {data.diploma.field}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Graduation Date</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {new Date(data.diploma.graduationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Issuer Information</h3>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">
              {data.diploma.issuerName}
            </p>
          </div>
        </div>

        {data.valid && blockchainProof && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Blockchain Proof</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-900">
                Transaction Hash: {blockchainProof.transactionHash}
              </p>
              {isLoadingProof ? (
                <div className="mt-2 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-sm text-gray-500">Loading proof...</span>
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  Proof: {blockchainProof.proof}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 