// Brand Configuration - Central place for all brand-specific content
// Update this file to customize for different brands (DoorDash, Tesco, McDonald's, etc.)

import logo from "@/images/starbuckslogo.png";
import favicon from "@/images/icon.png";

export interface BrandConfig {
  // Company Identity
  name: string;
  primaryColor: string;
  secondaryColor?: string;
  
  // Logo & Assets
  logoPath: string;
  faviconPath: string;
  
  // Campaign Details
  campaignType: "settlement" | "gift-card" | "sweepstakes";
  settlementAmount: string;
  currency: string;
  
  // Contact Information
  phoneNumber: string;
  region: string;
  
  // Survey Questions (brand-specific)
  questions: {
    question: string;
    options: string[];
  }[];
  
  // External Links
  targetUrl: string;
  appDownloadUrl: string;
  findStoresUrl: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  helpCenterUrl: string;
  aboutUrl: string;
  orderNowUrl: string;
  
  // Legal & Footer
  copyrightText: string;
  additionalFooterText?: string;
}

// DEFAULT CONFIGURATION (Starbucks Winter Quiz)
export const brandConfig: BrandConfig = {
  // Company Identity
  name: "Starbucks",
  primaryColor: "#016241", // Starbucks green
  secondaryColor: "#1D3A31", // Deep winter green
  
  // Logo & Assets
  logoPath: logo,
  faviconPath: favicon,
  
  // Campaign Details
  campaignType: "gift-card",
  settlementAmount: "$100 Starbucks Gift Card",
  currency: "USD",
  
  // Contact Information
  phoneNumber: "800-782-7282", // 800-STARBUCKS
  region: "United States",
  
  // Survey Questions (Starbucks Winter Quiz)
  questions: [
    {
      question: "How often do you visit Starbucks during the winter season?",
      options: [
        "Several times a week",
        "Once a week",
        "A few times a month",
        "Rarely or never",
      ],
    },
    {
      question: "What is your go-to Starbucks winter drink?",
      options: [
        "Peppermint Mocha",
        "Caramel Brulée",
        "Toasted Mocha",
        "Hot Chocolate",
      ],
    },
    {
      question: "How do you usually enjoy Starbucks in winter?",
      options: [
        "Sipping in-store",
        "Mobile order & pickup",
        "Drive-thru",
        "Delivery",
      ],
    },
    {
      question: "What do you enjoy most at Starbucks in winter?",
      options: [
        "Seasonal drinks",
        "Holiday merch",
        "Bakery items",
        "Rewards offers",
      ],
    },
    {
      question: "Are you currently 18 years or older?",
      options: ["Yes, I am 18+", "Yes, I am 21+", "Yes, I am 30+", "No, I am under 18"],
    },
  ],
  
  // External Links
  targetUrl: "http://link.pmreviewers.com/click",
  appDownloadUrl: "https://www.starbucks.com/rewards/mobile-apps/",
  findStoresUrl: "https://www.starbucks.com/store-locator",
  privacyPolicyUrl: "https://www.starbucks.com/terms/privacy-notice/",
  termsOfServiceUrl: "https://www.starbucks.com/terms/starbucks-terms-of-use/",
  helpCenterUrl: "https://customerservice.starbucks.com/sbux",
  aboutUrl: "https://www.starbucks.com/about-us/",
  orderNowUrl: "https://www.starbucks.com/",
  
  // Legal & Footer
  copyrightText: "Starbucks Corporation. All rights reserved.",
  additionalFooterText: "More ways to enjoy Starbucks this winter: Download the Starbucks app, find a store near you, or call 800-STARBUCKS."
};

// EXAMPLE CONFIGURATIONS for reference

// Tesco Configuration Example
export const tescoConfig: BrandConfig = {
  name: "Tesco",
  primaryColor: "#00539F", // Tesco blue
  secondaryColor: "#FFFFFF",
  logoPath: "/lovable-uploads/tesco-logo.png", // Would need to be uploaded
  faviconPath: "/lovable-uploads/tesco-logo.png",
  settlementAmount: "£300",
  currency: "GBP",
  phoneNumber: "0800-505-555",
  region: "United Kingdom",
  questions: [
    {
      question: "How often do you shop at Tesco?",
      options: ["Daily", "Weekly", "Monthly", "Never"]
    },
    {
      question: "What do you primarily buy at Tesco?",
      options: ["Groceries", "Clothing", "Electronics", "Other"]
    },
    {
      question: "How would you rate your overall Tesco shopping experience?",
      options: ["Excellent", "Good", "Average", "Poor"]
    },
    {
      question: "Have you experienced any issues with Tesco products or services?",
      options: ["Yes, frequently", "Yes, occasionally", "Rarely", "Never"]
    },
    {
      question: "Are you currently 18 years or older?",
      options: ["Yes, I am 18+", "Yes, I am 21+", "Yes, I am 30+", "No, I am under 18"]
    }
  ],
  targetUrl: "https://lulovers.com/tesco?_lp=1",
  appDownloadUrl: "https://www.tesco.com/groceries/en-GB/",
  findStoresUrl: "https://www.tesco.com/store-locator/",
  privacyPolicyUrl: "https://www.tesco.com/help/privacy-and-cookies/",
  termsOfServiceUrl: "https://www.tesco.com/help/terms-and-conditions/",
  helpCenterUrl: "https://www.tesco.com/help/",
  aboutUrl: "https://www.tesco.com/about/",
  orderNowUrl: "https://www.tesco.com/groceries/en-GB/",
  copyrightText: "Tesco Stores Ltd. All rights reserved.",
  additionalFooterText: "Follow us"
};

// Helper function to get current brand config
export const getBrandConfig = (): BrandConfig => {
  return brandConfig;
};

// Helper function to get brand-specific CSS variables
export const getBrandCSSVariables = (config: BrandConfig = brandConfig) => {
  return {
    '--brand-primary': config.primaryColor,
    '--brand-secondary': config.secondaryColor || '#FFFFFF',
  };
};