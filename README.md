# Plateforme de Vérification de Diplômes Blockchain

Une application web moderne pour la création et la vérification de diplômes sur la blockchain.

## 🚀 Fonctionnalités

- Connexion via Metamask
- Création de diplômes avec validation
- Vérification par QR code
- Dashboards personnalisés selon le rôle utilisateur
- Intégration blockchain pour la vérification

## 🛠️ Stack Technique

- **Framework Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Typage**: TypeScript
- **Formulaires**: React Hook Form + Zod
- **État global**: Zustand
- **Données**: React Query
- **Blockchain**: Ethers.js

## 🏗️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/Roi12122525/Frontend.git
cd Frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet :
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=votre_adresse_contrat
NEXT_PUBLIC_RPC_URL=votre_url_rpc
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

## 📁 Structure du Projet

```
├── components/         # Composants React réutilisables
├── pages/             # Pages de l'application
├── public/            # Fichiers statiques
├── styles/            # Styles globaux
├── utils/             # Fonctions utilitaires
└── services/          # Services (API, blockchain)
```

## 🔐 Authentification

L'application utilise Metamask pour l'authentification. Assurez-vous d'avoir l'extension installée dans votre navigateur.

## 📝 Création de Diplômes

1. Connectez votre wallet Metamask
2. Remplissez le formulaire de création de diplôme
3. Validez la transaction blockchain
4. Recevez le QR code de vérification

## 🔍 Vérification

1. Scannez le QR code avec l'application
2. Vérifiez les informations du diplôme
3. Confirmez l'authenticité via la blockchain

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT 
