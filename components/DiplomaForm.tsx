'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWalletStore } from './WalletConnector';

const diplomaSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters'),
  studentId: z.string().min(1, 'Student ID is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
  issuerName: z.string().min(1, 'Issuer name is required'),
  issuerId: z.string().min(1, 'Issuer ID is required'),
});

type DiplomaFormData = z.infer<typeof diplomaSchema>;

interface DiplomaFormProps {
  onDiplomaCreated: (diploma: DiplomaFormData) => void;
}

export const DiplomaForm = ({ onDiplomaCreated }: DiplomaFormProps) => {
  const { address, isConnected } = useWalletStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiplomaFormData>({
    resolver: zodResolver(diplomaSchema),
  });

  const onSubmit = async (data: DiplomaFormData) => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      // TODO: Implement API call and blockchain transaction
      const response = await fetch('/api/diplomas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Address': address,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create diploma');
      }

      setSuccess(true);
      reset();
      onDiplomaCreated(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create diploma');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Diploma</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Diploma created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Name
          </label>
          <input
            type="text"
            {...register('studentName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.studentName && (
            <p className="mt-1 text-sm text-red-600">{errors.studentName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            {...register('studentId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.studentId && (
            <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <input
            type="text"
            {...register('degree')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.degree && (
            <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field of Study
          </label>
          <input
            type="text"
            {...register('field')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.field && (
            <p className="mt-1 text-sm text-red-600">{errors.field.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Graduation Date
          </label>
          <input
            type="date"
            {...register('graduationDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.graduationDate && (
            <p className="mt-1 text-sm text-red-600">{errors.graduationDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Issuer Name
          </label>
          <input
            type="text"
            {...register('issuerName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.issuerName && (
            <p className="mt-1 text-sm text-red-600">{errors.issuerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Issuer ID
          </label>
          <input
            type="text"
            {...register('issuerId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.issuerId && (
            <p className="mt-1 text-sm text-red-600">{errors.issuerId.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isConnected}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Diploma'}
        </button>
      </form>
    </div>
  );
}; 