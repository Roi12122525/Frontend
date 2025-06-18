import React from 'react';
import { DashboardLayout } from './DashboardLayout';

const users = [
  { address: '0x1234567890123456789012345678901234567890', role: 'admin' },
  { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', role: 'issuer' },
  { address: '0x9876543210987654321098765432109876543210', role: 'verifier' },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Utilisateurs & Rôles</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.address}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Statistiques</h3>
          <ul className="list-disc pl-6">
            <li>Nombre total d'utilisateurs : {users.length}</li>
            <li>Admins : {users.filter(u => u.role === 'admin').length}</li>
            <li>Issuers : {users.filter(u => u.role === 'issuer').length}</li>
            <li>Verifiers : {users.filter(u => u.role === 'verifier').length}</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 