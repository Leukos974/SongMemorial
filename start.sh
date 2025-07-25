#!/bin/bash

set -e

# Lancer le backend
echo "🚀 Lancement du backend..."
cd backend
npm install
npm run dev &

# Lancer le frontend
echo "🚀 Lancement du frontend..."
cd ../frontend
npm install
npm run dev &

# Attente infinie pour que les deux serveurs continuent de tourner
wait
