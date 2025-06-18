import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur la Plateforme de Vérification de Diplômes</h1>
      <p className="mb-8 text-lg text-gray-600">Vous allez être redirigé vers votre dashboard...</p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => router.push('/dashboard')}
      >
        Accéder au Dashboard
      </button>
    </div>
  );
} 