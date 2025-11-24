#!/usr/bin/env node

/**
 * Brand Generator Script
 * 
 * This script generates a new branded project from the surveybrand-template.
 * Usage: node scripts/generate-brand.js --name="McDonald's" --output="../mcdonalds-claim"
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1].replace(/['"]/g, '') : null;
};

const brandName = getArg('name');
const outputDir = getArg('output') || `../${brandName?.toLowerCase().replace(/[^a-z0-9]/g, '')}-claim`;
const primaryColor = getArg('color') || '#FF3008';

if (!brandName) {
  console.error('❌ Error: --name parameter is required');
  console.log('Usage: node scripts/generate-brand.js --name="McDonald\'s" --output="../mcdonalds-claim"');
  process.exit(1);
}

console.log(`🎯 Generating brand project for: ${brandName}`);
console.log(`📁 Output directory: ${outputDir}`);
console.log(`🎨 Primary color: ${primaryColor}`);

async function copyDirectory(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, dist, and scripts directories, plus any output directories
        if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name === 'scripts' || srcPath.includes('mcdonalds-test')) {
          continue;
        }
        await copyDirectory(srcPath, destPath);
      } else {
        // Skip the generation script itself
        if (entry.name === 'generate-brand.js') {
          continue;
        }
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(`Error copying directory: ${error.message}`);
    throw error;
  }
}

async function updateBrandConfig(projectPath, brandName, primaryColor) {
  const configPath = path.join(projectPath, 'src', 'config', 'brand.ts');
  
  try {
    let content = await fs.readFile(configPath, 'utf8');
    
    // Generate brand-specific configuration
    const brandConfig = generateBrandConfig(brandName, primaryColor);
    
    // Replace the default brandConfig export
    const configRegex = /export const brandConfig: BrandConfig = \{[\s\S]*?\};/;
    content = content.replace(configRegex, `export const brandConfig: BrandConfig = ${JSON.stringify(brandConfig, null, 2).replace(/"/g, '"')};`);
    
    await fs.writeFile(configPath, content, 'utf8');
    console.log('✅ Updated brand configuration');
  } catch (error) {
    console.error(`Error updating brand config: ${error.message}`);
    throw error;
  }
}

async function updateHtmlTitle(projectPath, brandName) {
  const htmlPath = path.join(projectPath, 'index.html');
  
  try {
    let content = await fs.readFile(htmlPath, 'utf8');
    content = content.replace('{{BRAND_NAME}}', brandName);
    await fs.writeFile(htmlPath, content, 'utf8');
    console.log('✅ Updated HTML title');
  } catch (error) {
    console.error(`Error updating HTML title: ${error.message}`);
    throw error;
  }
}

async function updatePackageJson(projectPath, brandName) {
  const packagePath = path.join(projectPath, 'package.json');
  
  try {
    const content = await fs.readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(content);
    
    packageJson.name = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}_survey`;
    packageJson.description = `${brandName} Settlement Survey Application`;
    
    await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
    console.log('✅ Updated package.json');
  } catch (error) {
    console.error(`Error updating package.json: ${error.message}`);
    throw error;
  }
}

function generateBrandConfig(brandName, primaryColor) {
  // Generate brand-specific questions
  const questions = generateBrandQuestions(brandName);
  
  // Generate URLs (these would need to be customized per brand)
  const brandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return {
    name: brandName,
    primaryColor: primaryColor,
    secondaryColor: "#FFFFFF",
    logoPath: "/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png", // TODO: Update with brand logo
    faviconPath: "/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png",
    settlementAmount: "$500", // TODO: Customize per brand
    currency: "USD",
    phoneNumber: "1-800-555-0123", // TODO: Customize per brand
    region: "United States",
    questions: questions,
    targetUrl: `https://lulovers.com/${brandSlug}?_lp=1`,
    appDownloadUrl: `https://www.${brandSlug}.com/mobile-app/`,
    findStoresUrl: `https://www.${brandSlug}.com/stores/`,
    privacyPolicyUrl: `https://www.${brandSlug}.com/privacy-policy`,
    termsOfServiceUrl: `https://www.${brandSlug}.com/terms-and-conditions`,
    helpCenterUrl: `https://www.${brandSlug}.com/help/`,
    aboutUrl: `https://www.${brandSlug}.com/about/`,
    orderNowUrl: `https://www.${brandSlug}.com/`,
    copyrightText: `${brandName} Inc. All rights reserved.`,
    additionalFooterText: `More ways to order: Download the ${brandName} app or find restaurants near you. Or call 1-800-555-0123.`
  };
}

function generateBrandQuestions(brandName) {
  // Generate generic questions that can work for most brands
  return [
    {
      question: `How often do you use ${brandName}?`,
      options: [
        "Multiple times a week",
        "Once a week", 
        "A few times a month",
        "Rarely or never"
      ]
    },
    {
      question: `What do you primarily use ${brandName} for?`,
      options: [
        "Food delivery",
        "Dining out",
        "Takeout orders",
        "Other services"
      ]
    },
    {
      question: `How would you rate your overall experience with ${brandName}?`,
      options: [
        "Excellent",
        "Good", 
        "Average",
        "Poor"
      ]
    },
    {
      question: `Have you ever had issues with ${brandName} orders or services?`,
      options: [
        "Yes, frequently",
        "Yes, occasionally",
        "Rarely",
        "Never"
      ]
    },
    {
      question: "Are you currently 18 years or older?",
      options: [
        "Yes, I am 18+",
        "Yes, I am 21+", 
        "Yes, I am 30+",
        "No, I am under 18"
      ]
    }
  ];
}

async function main() {
  try {
    console.log('🚀 Starting brand generation process...');
    
    // Copy template to new directory
    console.log('📋 Copying template files...');
    const templatePath = path.resolve(path.dirname(__dirname));
    const targetPath = path.resolve(outputDir);
    
    // Ensure we don't copy into ourselves
    if (targetPath.startsWith(templatePath + path.sep) || targetPath === templatePath) {
      throw new Error('Output directory cannot be inside the template directory');
    }
    
    await copyDirectory(templatePath, targetPath);
    
    // Update brand configuration
    console.log('🎨 Updating brand configuration...');
    await updateBrandConfig(targetPath, brandName, primaryColor);
    
    // Update HTML title
    console.log('📝 Updating HTML title...');
    await updateHtmlTitle(targetPath, brandName);
    
    // Update package.json
    console.log('📦 Updating package.json...');
    await updatePackageJson(targetPath, brandName);
    
    // Create README with brand-specific instructions
    const readmeContent = `# ${brandName} Settlement Survey

Generated from surveybrand-template.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Customization Needed

1. **Logo**: Replace \`public/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png\` with ${brandName} logo
2. **Colors**: Update brand colors in \`src/config/brand.ts\`
3. **URLs**: Update all URLs in brand config to point to actual ${brandName} websites
4. **Settlement Amount**: Adjust settlement amount as appropriate
5. **Questions**: Customize survey questions for ${brandName} context

## Generated Configuration

- Brand Name: ${brandName}
- Primary Color: ${primaryColor}
- Generated: ${new Date().toISOString()}

Refer to PROJECT_GUIDE.md for detailed customization instructions.
`;
    
    await fs.writeFile(path.join(targetPath, 'README.md'), readmeContent, 'utf8');
    
    console.log('✅ Brand generation completed successfully!');
    console.log('');
    console.log('📋 Next Steps:');
    console.log(`1. cd ${outputDir}`);
    console.log('2. Replace the logo file with your brand logo');
    console.log('3. Update URLs in src/config/brand.ts');
    console.log('4. Customize colors and settlement amount');
    console.log('5. npm install && npm run dev');
    console.log('');
    console.log('📖 See PROJECT_GUIDE.md for detailed instructions');
    
  } catch (error) {
    console.error('❌ Brand generation failed:', error.message);
    process.exit(1);
  }
}

main();