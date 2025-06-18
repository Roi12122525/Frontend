'use client';

import { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { QRScanner } from './QRScanner';
import { VerificationResult } from './VerificationResult';
import { SearchAndFilter } from './SearchAndFilter';
import { useVerificationHistory } from '../hooks/useVerificationHistory';
import { motion, AnimatePresence } from 'framer-motion';

interface VerificationData {
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

export const VerifierDashboard = () => {
  const [verificationResult, setVerificationResult] = useState<VerificationData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: {
      start: '',
      end: '',
    },
  });

  const { verifications, isLoading, error } = useVerificationHistory();

  const handleScanSuccess = (result: VerificationData) => {
    setVerificationResult(result);
  };

  const handleScanError = (error: Error) => {
    console.error('Scan error:', error);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredVerifications = verifications?.filter((verification) => {
    const matchesSearch = searchQuery === '' || 
      verification.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verification.hash.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filters.status === 'all' || 
      verification.status.toLowerCase() === filters.status.toLowerCase();

    const matchesDateRange = (!filters.dateRange.start || new Date(verification.verificationDate) >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || new Date(verification.verificationDate) <= new Date(filters.dateRange.end));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Verifier Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Scan diploma QR codes to verify their authenticity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Scan Diploma</h2>
            <QRScanner
              onSuccess={handleScanSuccess}
              onError={handleScanError}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-4">Verification Result</h2>
                <VerificationResult
                  valid={verificationResult.valid}
                  diploma={verificationResult.diploma}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Verification History</h2>
            <SearchAndFilter
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">
              Error loading verification history: {error.message}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hash
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVerifications?.map((verification) => (
                    <motion.tr
                      key={verification.hash}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {verification.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            verification.status === 'valid'
                              ? 'bg-green-100 text-green-800'
                              : verification.status === 'invalid'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {verification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(verification.verificationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {verification.degree}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {verification.field}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {verification.hash.slice(0, 8)}...
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}; 