import { useWalletStore } from '../WalletConnector';
import AdminDashboard from '../AdminDashboard';
import IssuerDashboard from '../IssuerDashboard';
import VerifierDashboard from '../VerifierDashboard';

const RoleDashboardSelector = () => {
  const { role, isConnected } = useWalletStore();

  if (!isConnected) {
    return <div className="text-center text-gray-500">Veuillez connecter votre wallet.</div>;
  }

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'issuer':
      return <IssuerDashboard />;
    case 'verifier':
      return <VerifierDashboard />;
    default:
      return <div className="text-center text-red-500">Aucun rôle associé à ce wallet.</div>;
  }
};

export default RoleDashboardSelector; 