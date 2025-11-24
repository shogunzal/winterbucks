import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { getBrandConfig } from "@/config/brand";

const queryClient = new QueryClient();

// Helper function to convert hex to HSL
const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h! /= 6;
  }

  return [Math.round(h! * 360), Math.round(s * 100), Math.round(l * 100)];
};

const BrandThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const brand = getBrandConfig();
    const [h, s, l] = hexToHsl(brand.primaryColor);
    
    // Set CSS custom properties for brand colors
    document.documentElement.style.setProperty('--primary', `${h} ${s}% ${l}%`);
    document.documentElement.style.setProperty('--ring', `${h} ${s}% ${l}%`);
    document.documentElement.style.setProperty('--border', `${h} ${s}% ${l}%`);
    
    // Set the red-600 equivalent for links (slightly darker version)
    const linkL = Math.max(l - 15, 25); // Ensure it's not too dark
    document.documentElement.style.setProperty('--brand-link', `${h} ${s}% ${linkL}%`);
  }, []);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BrandThemeProvider>
  </QueryClientProvider>
);

export default App;
