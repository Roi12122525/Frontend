'use client';

import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { DiplomaForm } from './DiplomaForm';

interface Diploma {
  id: string;
  studentName: string;
  degree: string;
  field: string;
  graduationDate: string;
  hash: string;
}

export const IssuerDashboard = () => {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDiplomaCreated = (newDiploma: Diploma) => {
    setDiplomas([...diplomas, newDiploma]);
    setIsFormOpen(false);
  };

  const filteredDiplomas = diplomas.filter((diploma) =>
    diploma.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    diploma.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
    diploma.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Issuer Dashboard" role="issuer">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Issuer Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Créez et gérez les diplômes
        </p>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Créer un nouveau diplôme
        </button>

        {isFormOpen && (
          <div className="mt-4">
            <DiplomaForm onDiplomaCreated={handleDiplomaCreated} />
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Diplômes émis</h2>
          <input
            type="text"
            placeholder="Rechercher un diplôme..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredDiplomas.length === 0 ? (
            <p className="text-gray-500">Aucun diplôme émis.</p>
          ) : (
            <ul className="space-y-4">
              {filteredDiplomas.map((diploma) => (
                <li key={diploma.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <p><strong>Étudiant:</strong> {diploma.studentName}</p>
                  <p><strong>Diplôme:</strong> {diploma.degree}</p>
                  <p><strong>Domaine:</strong> {diploma.field}</p>
                  <p><strong>Date de graduation:</strong> {diploma.graduationDate}</p>
                  <p><strong>Hash:</strong> {diploma.hash}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IssuerDashboard; 