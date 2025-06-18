import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/services/api';

// Admin hooks
export const useAdminStats = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => api.getStats(),
    ...options,
  });
};

export const useAdminUsers = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => api.getUsers(),
    ...options,
  });
};

export const useUpdateUserStatus = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'inactive' }) =>
      api.updateUserStatus(userId, status),
    ...options,
  });
};

// Issuer hooks
export const useIssuerDiplomas = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['issuer', 'diplomas'],
    queryFn: () => api.getDiplomas(),
    ...options,
  });
};

export const useCreateDiploma = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: (data: {
      studentName: string;
      studentId: string;
      degree: string;
      field: string;
      graduationDate: string;
      issuerName: string;
      issuerId: string;
    }) => api.createDiploma(data),
    ...options,
  });
};

// Verifier hooks
export const useVerifyDiploma = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: (hash: string) => api.verifyDiploma(hash),
    ...options,
  });
};

export const useVerificationHistory = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['verifier', 'history'],
    queryFn: () => api.getVerificationHistory(),
    ...options,
  });
};

// Blockchain hooks
export const useBlockchainProof = (hash: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['blockchain', 'proof', hash],
    queryFn: () => api.getBlockchainProof(hash),
    enabled: !!hash,
    ...options,
  });
};

export const useTransactionStatus = (txHash: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['blockchain', 'transaction', txHash],
    queryFn: () => api.getTransactionStatus(txHash),
    enabled: !!txHash,
    ...options,
  });
};

// Auth hooks
export const useLogin = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: (walletAddress: string) => api.login(walletAddress),
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: () => api.logout(),
    ...options,
  });
};

export const useVerifyToken = (options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ['auth', 'verify'],
    queryFn: () => api.verifyToken(),
    ...options,
  });
}; 