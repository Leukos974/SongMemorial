#!/bin/bash

echo "🧹 Cleaning frontend and backend..."

rm -rf frontend/node_modules frontend/dist
rm -rf backend/node_modules backend/dist

rm -f frontend/package-lock.json
rm -f backend/package-lock.json

echo "✅ Clean done."
