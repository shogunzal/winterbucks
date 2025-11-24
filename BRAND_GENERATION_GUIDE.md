# 🎯 Brand Generation Guide - Complete Instructions

## 🚀 Quick Start

### Smart Prompt Template
Use this flexible prompt - Claude will ask for missing critical info:

```
Create branded survey from surveybrand-template:

**Brand:** [BRAND NAME] ← Required
**Logo:** [IMAGE/URL] ← Required  
**Type:** [settlement/gift-card/sweepstakes] ← Optional (default: settlement)
**Amount:** [£500/€200/$100] ← Optional (will prompt if missing)
**Region:** [UK/US/EU] ← Optional (infer from currency or default UK)
**Color:** [#hex or name] ← Optional (extract from logo)

Read BRAND_GENERATION_GUIDE.md for technical steps.
```

### Smart Defaults
- **Type:** settlement (if not specified)
- **Region:** UK (or infer from currency: £=UK, $=US, €=EU)
- **Amount:** £500 settlement / £200 gift card
- **Color:** Extract dominant color from logo

---

## ⚠️ CRITICAL STEPS - Follow Exactly

### 1. 🚨 Copy Template Correctly
```bash
# CORRECT - Use rsync with exclusions
rsync -av --exclude='node_modules' --exclude='package-lock.json' --exclude='dist' /Users/zal/Documents/campaign-generator/_template/surveybrand-template/ /Users/zal/Documents/campaign-generator/campaigns/[brandname]-settlement/

# WRONG - NEVER use cp -r (causes module resolution errors)
cp -r surveybrand-template amazon-survey  # ❌ DON'T DO THIS
```

### 2. 🚨 Download Logo Locally
```bash
# Download logo to exact filename
curl -o public/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png "https://logo-url.com/logo.png"

# Update brand config to use local path
logoPath: "/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png"
```

### 3. 🚨 Update Brand Configuration
Edit `src/config/brand.ts` with ALL brand details:

```typescript
export const brandConfig: BrandConfig = {
  campaignType: "settlement", // or "gift-card" or "sweepstakes"
  name: "Amazon",
  logoPath: "/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png",
  primaryColor: "#FF9900",
  secondaryColor: "#232F3E", 
  settlementAmount: "£500",
  phoneNumber: "0800-496-1081", // Hardcoded string - NO self-references
  targetUrl: "https://lulovers.com/amazon?_lp=1",
  websiteUrl: "https://amazon.co.uk",
  additionalFooterText: "Call 0800-496-1081" // Static string only
};
```

### 4. 🚨 Update HTML Title
Edit `index.html` line 8:
```html
<title>Amazon | Product Reviewer Rewards</title>
```

### 5. 🚨 Adapt Footer Language for Brand Category
**CRITICAL:** Update footer text in `src/pages/Index.tsx` to match brand category:

**Food/Delivery Brands (DoorDash, Uber Eats):**
```jsx
More ways to order: <a href={...}>Download the {brand.name} app</a> or <a href={...}>find restaurants near you</a>
// Footer link: "Order Now"
```

**Music/Streaming Brands (Spotify, Apple Music):**
```jsx
More ways to listen: <a href={...}>Download the {brand.name} app</a> or <a href={...}>explore playlists and podcasts</a>
// Footer link: "Subscribe"
```

**Retail Brands (Amazon, Target):**
```jsx
More ways to shop: <a href={...}>Download the {brand.name} app</a> or <a href={...}>find stores near you</a>
// Footer link: "Shop Now"
```

**Tech/Software Brands (Microsoft, Google):**
```jsx
More ways to connect: <a href={...}>Download the {brand.name} app</a> or <a href={...}>explore features</a>
// Footer link: "Get Started"
```

### 6. 🚨 Install & Test
```bash
cd [brandname]-settlement
npm install
npm run dev
```

---

## 🎭 Campaign Types & Language

### Settlement (`"settlement"`)
- **Title:** "Complete Your Claim Form"
- **Language:** Legal claim terminology
- **Amount:** "£500 Amazon Settlement"
- **Tone:** Formal, compliance-focused

### Gift Card (`"gift-card"`) 
- **Title:** "Complete Your Registration"
- **Language:** Promotional reward terminology
- **Amount:** "£200 Amazon Gift Card"
- **Tone:** Casual, promotional

### Sweepstakes (`"sweepstakes"`)
- **Title:** "Complete Your Registration" 
- **Language:** Contest/prize terminology
- **Amount:** "£500 Amazon Prize"
- **Tone:** Exciting, contest-focused

---

## 🔧 Technical Implementation

### Brand Configuration Interface
```typescript
export interface BrandConfig {
  campaignType: "settlement" | "gift-card" | "sweepstakes";
  name: string;
  logoPath: string;
  primaryColor: string;   // Valid hex code
  secondaryColor: string; // Valid hex code
  settlementAmount: string;
  phoneNumber: string;    // Hardcoded - NO brandConfig references
  targetUrl: string;
  websiteUrl: string;
  additionalFooterText: string; // Static string only
}
```

### Automatic Systems
- **Color Theming:** BrandThemeProvider converts hex to HSL and applies CSS variables
- **Campaign Language:** Completion component adapts based on campaignType
- **Logo Integration:** Consistent file naming with local storage

---

## 🚨 CRITICAL MISTAKES TO AVOID

### 1. Copy Method Errors
❌ **WRONG:** `cp -r surveybrand-template amazon-survey`
✅ **CORRECT:** `rsync -av --exclude='node_modules' --exclude='package-lock.json' --exclude='dist' surveybrand-template/ amazon-settlement/`

**Why:** Copying node_modules causes module resolution errors that break the project.

### 2. Circular Reference Crashes
❌ **WRONG:** 
```typescript
additionalFooterText: `Call ${brandConfig?.phoneNumber || "fallback"}`
```
✅ **CORRECT:**
```typescript
additionalFooterText: "Call 1-800-555-0123"
```

**Why:** Referencing brandConfig inside itself causes JavaScript circular reference errors and blank screen crashes.

### 3. External Logo URLs
❌ **WRONG:** `logoPath: "https://external-site.com/logo.png"`
✅ **CORRECT:** Download locally and use `logoPath: "/lovable-uploads/5bf80884-cfdd-46db-8815-e9875d034ea3.png"`

### 4. Project Naming
❌ **WRONG:** `amazon-survey`, `brand-quiz`
✅ **CORRECT:** `amazon-settlement`, `starbucks-settlement`

### 5. Missing Campaign Type
❌ **WRONG:** Leave campaignType undefined
✅ **CORRECT:** Always set `campaignType: "settlement"` (or gift-card/sweepstakes)

### 6. Food-Specific Language for Non-Food Brands
❌ **WRONG:** "More ways to order", "find restaurants", "Order Now" for Spotify/Netflix/etc.
✅ **CORRECT:** Adapt language to brand category:
- **Music/Streaming:** "More ways to listen", "explore playlists", "Subscribe"
- **Technology:** "More ways to connect", "explore features", "Get Started"
- **Retail:** "More ways to shop", "find stores", "Shop Now"
- **Financial:** "More ways to bank", "find branches", "Apply Now"

**Why:** Food delivery terminology doesn't fit non-food brands and breaks authenticity.

---

## ✅ Validation Checklist

### Pre-Generation:
- [ ] Template project exists at correct path
- [ ] Have brand logo URL or image ready
- [ ] Campaign type determined (settlement/gift-card/sweepstakes)
- [ ] Settlement amount and region determined

### Copy Method:
- [ ] Used `rsync` with exclusions, NOT `cp -r`
- [ ] Excluded `node_modules`, `package-lock.json`, `dist`
- [ ] Project copied to `[brandname]-settlement/` format

### Logo Integration:
- [ ] Logo downloaded to local file using `curl`
- [ ] Saved as exact filename: `5bf80884-cfdd-46db-8815-e9875d034ea3.png`
- [ ] Brand config updated to use local path
- [ ] Logo displays properly in browser

### Brand Configuration:
- [ ] `campaignType` set correctly
- [ ] All brand details updated (name, colors, phone, URLs)
- [ ] **NO self-references** in `additionalFooterText` or other fields
- [ ] Settlement amount includes currency symbol

### HTML Updates:
- [ ] `index.html` title updated from template placeholder
- [ ] Format: "[Brand Name] | Redeems" or similar

### Installation Test:
- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts successfully
- [ ] Page loads without blank screen
- [ ] No JavaScript errors in browser console

### Visual Verification:
- [ ] **Logo:** Correct brand logo displays at top
- [ ] **Colors:** Brand colors applied to progress bars, buttons, borders
- [ ] **Typography:** Brand name appears correctly throughout
- [ ] **Campaign Language:** Appropriate for settlement/gift-card type
- [ ] **Content:** Brand-specific questions and contact info
- [ ] **Footer Language:** Appropriate for brand category (not food-specific for non-food brands)

---

## 🔍 Troubleshooting

### Blank Screen Issues
**Symptoms:** Page loads but shows nothing
**Causes:**
- Circular reference in brand config
- JavaScript syntax errors  
- Missing imports or components

**Solutions:**
1. Check browser console for errors
2. Verify no circular references in `brand.ts`
3. Ensure all template literals are properly closed

### Logo/Styling Issues  
**Symptoms:** Logo doesn't display or wrong colors
**Causes:**
- External logo URLs (should be local)
- Wrong color hex codes
- Missing CSS variables

**Solutions:**
1. Verify logo file exists at correct path
2. Check brand config uses local path
3. Ensure filename is exactly correct

### Module Resolution Errors
**Symptoms:** Import errors, dependency issues
**Causes:**
- Copied `node_modules` directory
- Wrong project structure
- Missing dependencies

**Solutions:**
1. Remove node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
2. Verify project was copied with rsync
3. Check package.json integrity

---

## 📋 Example Brand Configurations

### McDonald's Settlement
```typescript
{
  campaignType: "settlement",
  name: "McDonald's",
  primaryColor: "#FFC72C", // Golden yellow
  secondaryColor: "#DA020E", // Red
  settlementAmount: "£500",
  phoneNumber: "0800-587-0077",
  additionalFooterText: "Call 0800-587-0077"
}
```

### Starbucks Gift Card
```typescript
{
  campaignType: "gift-card", 
  name: "Starbucks",
  primaryColor: "#00704A", // Forest green
  secondaryColor: "#F4F4F4", // Light gray
  settlementAmount: "£200 gift card",
  phoneNumber: "0800-032-3232",
  additionalFooterText: "Call 0800-032-3232"
}
```

### Amazon Sweepstakes
```typescript
{
  campaignType: "sweepstakes",
  name: "Amazon", 
  primaryColor: "#FF9900", // Orange
  secondaryColor: "#232F3E", // Dark blue
  settlementAmount: "£1000 prize",
  phoneNumber: "0800-496-1081",
  additionalFooterText: "Call 0800-496-1081"
}
```

---

## 🎯 Success Criteria

A successful brand generation should result in:

✅ **Complete project ready to run with `npm install && npm run dev`**
✅ **Authentic branding throughout (logo, colors, content)**
✅ **Campaign-appropriate language (settlement vs gift card vs sweepstakes)**
✅ **No JavaScript errors or blank screen issues**
✅ **Mobile responsive design**
✅ **Brand-specific survey questions and contact details**
✅ **Proper file structure and naming conventions**

---

## 📞 Final Notes

- This template system is designed to be bulletproof when proper procedures are followed
- The brand configuration system automatically handles theming and language adaptation
- Always test the complete survey flow before considering the generation complete
- Keep this guide as the single source of truth for all brand generation tasks

**Template Location:** `/Users/zal/Documents/campaign-generator/_template/surveybrand-template/`
**Generated Projects:** `/Users/zal/Documents/campaign-generator/campaigns/[brandname]-settlement/`