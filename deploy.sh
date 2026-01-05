#!/bin/bash

# Mikki Mase Site - Quick Deploy Script
# Usage: ./deploy.sh

set -e  # Exit on any error

echo "🏗️  Building site..."
npm run build

echo "🚀 Deploying to production..."
rsync -av --delete /root/projects/mikki-mase-site-v2/dist/ /var/www/mikki-mase.com/

echo "✅ Deploy complete!"
echo "🌐 Site live at: https://mikki-mase.com"
