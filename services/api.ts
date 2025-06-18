import { API_CONFIG } from '@/utils/api-config';

interface ApiError extends Error {
  status?: number;
  data?: any;
}

class ApiService {
  private static instance: ApiService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = new Headers(options.headers);

    // Add wallet address if available
    const walletAddress = localStorage.getItem('walletAddress');
    if (walletAddress) {
      headers.set('X-Wallet-Address', walletAddress);
    }

    // Add content type if not set
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error: ApiError = new Error('API request failed');
        error.status = response.status;
        try {
          error.data = await response.json();
        } catch {
          error.data = await response.text();
        }
        throw error;
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text() as unknown as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  // Auth endpoints
  public async login(walletAddress: string): Promise<{ token: string }> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    });
  }

  public async logout(): Promise<void> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  }

  public async verifyToken(): Promise<{ valid: boolean }> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.VERIFY);
  }

  // Admin endpoints
  public async getStats(): Promise<{
    totalDiplomas: number;
    totalIssuers: number;
    totalVerifiers: number;
    recentVerifications: number;
  }> {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.STATS);
  }

  public async getUsers(): Promise<Array<{
    id: string;
    address: string;
    role: 'issuer' | 'verifier';
    createdAt: string;
    status: 'active' | 'inactive';
  }>> {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.USERS);
  }

  public async updateUserStatus(
    userId: string,
    status: 'active' | 'inactive'
  ): Promise<void> {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.USER_STATUS(userId), {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Issuer endpoints
  public async getDiplomas(): Promise<Array<{
    id: string;
    studentName: string;
    studentId: string;
    degree: string;
    field: string;
    graduationDate: string;
    createdAt: string;
    status: 'pending' | 'confirmed' | 'rejected';
    hash: string;
  }>> {
    return this.request(API_CONFIG.ENDPOINTS.ISSUER.DIPLOMAS);
  }

  public async createDiploma(data: {
    studentName: string;
    studentId: string;
    degree: string;
    field: string;
    graduationDate: string;
    issuerName: string;
    issuerId: string;
  }): Promise<{
    id: string;
    hash: string;
    status: 'pending' | 'confirmed' | 'rejected';
  }> {
    return this.request(API_CONFIG.ENDPOINTS.ISSUER.CREATE_DIPLOMA, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Verifier endpoints
  public async verifyDiploma(hash: string): Promise<{
    valid: boolean;
    diploma: {
      studentName: string;
      degree: string;
      field: string;
      graduationDate: string;
      issuerName: string;
    };
  }> {
    return this.request(API_CONFIG.ENDPOINTS.VERIFIER.VERIFY_DIPLOMA(hash));
  }

  public async getVerificationHistory(): Promise<Array<{
    id: string;
    diplomaHash: string;
    studentName: string;
    degree: string;
    field: string;
    verifiedAt: string;
    status: 'valid' | 'invalid' | 'pending';
  }>> {
    return this.request(API_CONFIG.ENDPOINTS.VERIFIER.HISTORY);
  }

  // Blockchain endpoints
  public async getBlockchainProof(hash: string): Promise<{
    proof: string;
    transactionHash: string;
  }> {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.PROOF(hash));
  }

  public async getTransactionStatus(txHash: string): Promise<{
    status: 'pending' | 'confirmed' | 'failed';
    blockNumber?: number;
    timestamp?: number;
  }> {
    return this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN.TRANSACTION(txHash));
  }
}

export const api = ApiService.getInstance(); 