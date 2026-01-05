#!/bin/bash
# Rollback script for hero mobile fix
# Run this if the mobile layout changes break anything

echo "Rolling back Hero.astro to backup version..."
cp src/pages/index.astro.backup-20251126-100906 src/pages/index.astro
cp src/components/Hero.astro.backup-20251126-100906 src/components/Hero.astro 2>/dev/null || echo "No Hero.astro backup found (changes were in Hero.astro)"

echo "Rebuilding site..."
npm run build

echo "Deploying rollback..."
rsync -avz --delete dist/ /var/www/mikki-mase.com/html/

echo "✅ Rollback complete!"
echo "The site has been restored to the previous version."
