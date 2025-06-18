export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify',
    },
    // Admin
    ADMIN: {
      STATS: '/admin/stats',
      USERS: '/admin/users',
      USER_STATUS: (userId: string) => `/admin/users/${userId}/status`,
    },
    // Issuer
    ISSUER: {
      DIPLOMAS: '/issuer/diplomas',
      CREATE_DIPLOMA: '/issuer/diplomas',
      DIPLOMA_STATUS: (diplomaId: string) => `/issuer/diplomas/${diplomaId}/status`,
    },
    // Verifier
    VERIFIER: {
      VERIFY_DIPLOMA: (hash: string) => `/verifier/verify/${hash}`,
      HISTORY: '/verifier/history',
    },
    // Blockchain
    BLOCKCHAIN: {
      PROOF: (hash: string) => `/blockchain/proof/${hash}`,
      TRANSACTION: (txHash: string) => `/blockchain/transaction/${txHash}`,
    },
  },
} as const; 