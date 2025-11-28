import { MaintenanceItem } from "./types";

export const maintenanceItems: MaintenanceItem[] = [
  {
    id: "engine-oil",
    name: "Engine Oil & Filter",
    category: "engine",
    description: "Replace engine oil and oil filter",
    intervals: {
      "asia-pacific": {
        normal: { km: 15000, months: 12 },
        severe: { km: 7500, months: 6 }
      },
      europe: {
        normal: { km: 20000, months: 12 },
        severe: { km: 10000, months: 6 }
      }
    },
    notes: "Use 0W-20 or 5W-30 synthetic oil. Capacity: ~4L with filter."
  },
  {
    id: "air-filter",
    name: "Engine Air Filter",
    category: "filters",
    description: "Inspect and replace engine air filter",
    intervals: {
      "asia-pacific": {
        normal: { km: 45000, months: 36 },
        severe: { km: 30000, months: 24 }
      },
      europe: {
        normal: { km: 40000, months: 24 },
        severe: { km: 30000, months: 24 }
      }
    },
    notes: "Inspect every 15,000 km. Replace more often in dusty conditions."
  },
  {
    id: "spark-plugs",
    name: "Spark Plugs",
    category: "engine",
    description: "Replace spark plugs (NGK KR6A-10 or Denso ZXU20PR11)",
    intervals: {
      "asia-pacific": {
        normal: { km: 105000, months: 84 },
        severe: { km: 10000, months: 8 }
      },
      europe: {
        normal: { km: 100000, months: 84 },
        severe: { km: 30000, months: 24 }
      }
    },
    notes: "Check gap: 1.0-1.1mm"
  },
  {
    id: "valve-clearance",
    name: "Valve Clearance",
    category: "engine",
    description: "Inspect valve clearance",
    intervals: {
      "asia-pacific": {
        normal: { km: 20000, months: null },
        severe: { km: 20000, months: null }
      },
      europe: {
        normal: { km: 20000, months: null },
        severe: { km: 20000, months: null }
      }
    },
    notes: "Intake: 0.17-0.23mm, Exhaust: 0.27-0.33mm (cold)"
  },
  {
    id: "coolant-blue",
    name: "Engine Coolant (Blue - Super Long Life)",
    category: "fluids",
    description: "Replace engine coolant",
    intervals: {
      "asia-pacific": {
        normal: { km: 150000, months: 96 },
        severe: { km: 150000, months: 96 }
      },
      europe: {
        normal: { km: 160000, months: 96 },
        severe: { km: 160000, months: 96 }
      }
    },
    applicableTo: { coolantType: ["blue"] },
    notes: "First change at 150k/8yrs, then every 75,000 km / 4 years. Capacity: ~5L"
  },
  {
    id: "coolant-green",
    name: "Engine Coolant (Green - Long Life)",
    category: "fluids",
    description: "Replace engine coolant",
    intervals: {
      "asia-pacific": {
        normal: { km: 45000, months: 36 },
        severe: { km: 45000, months: 36 }
      },
      europe: {
        normal: { km: 45000, months: 36 },
        severe: { km: 45000, months: 36 }
      }
    },
    applicableTo: { coolantType: ["green"] },
    notes: "Capacity: ~5L. Do not mix with blue coolant."
  },
  {
    id: "brake-fluid",
    name: "Brake Fluid",
    category: "brakes",
    description: "Replace brake fluid (shared with clutch on manual)",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: 24 },
        severe: { km: 30000, months: 24 }
      },
      europe: {
        normal: { km: 40000, months: 24 },
        severe: { km: 40000, months: 24 }
      }
    },
    notes: "DOT-3 required (DOT-4 compatible). Capacity: ~800mL"
  },
  {
    id: "brake-pads-front",
    name: "Front Brake Pads",
    category: "brakes",
    description: "Inspect front brake pads and discs",
    intervals: {
      "asia-pacific": {
        normal: { km: 15000, months: 12 },
        severe: { km: 15000, months: 12 }
      },
      europe: {
        normal: { km: 20000, months: 12 },
        severe: { km: 20000, months: 12 }
      }
    },
    notes: "Replace when pad thickness < 2mm. OEM: 55200-70AA0"
  },
  {
    id: "brake-drums-rear",
    name: "Rear Brake Drums & Shoes",
    category: "brakes",
    description: "Inspect rear brake drums and shoes",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: 24 },
        severe: { km: 30000, months: 24 }
      },
      europe: {
        normal: { km: 40000, months: 24 },
        severe: { km: 40000, months: 24 }
      }
    },
    notes: "Replace shoes when lining thickness < 1.5mm"
  },
  {
    id: "manual-transmission-oil",
    name: "Manual Transmission Oil",
    category: "transmission",
    description: "Inspect/replace manual transmission oil",
    intervals: {
      "asia-pacific": {
        normal: { km: 45000, months: 36 },
        severe: { km: 60000, months: 48 }
      },
      europe: {
        normal: { km: 40000, months: null },
        severe: { km: 80000, months: 48 }
      }
    },
    applicableTo: { transmission: ["manual"] },
    notes: "75W-80 GL-4. Capacity: 1.2L. Replace at these intervals if using non-Suzuki oil."
  },
  {
    id: "auto-transmission-fluid",
    name: "Automatic Transmission Fluid",
    category: "transmission",
    description: "Inspect level / replace ATF",
    intervals: {
      "asia-pacific": {
        normal: { km: 165000, months: null },
        severe: { km: 30000, months: 24 }
      },
      europe: {
        normal: { km: 165000, months: null },
        severe: { km: 30000, months: null }
      }
    },
    applicableTo: { transmission: ["automatic"] },
    notes: "Suzuki ATF3317. Capacity: 3-4L (5.7L total). Inspect level every 45,000 km."
  },
  {
    id: "transfer-case-oil",
    name: "Transfer Case Oil",
    category: "transmission",
    description: "Inspect/replace transfer case oil",
    intervals: {
      "asia-pacific": {
        normal: { km: 45000, months: 36 },
        severe: { km: 60000, months: 48 }
      },
      europe: {
        normal: { km: 40000, months: null },
        severe: { km: 80000, months: 48 }
      }
    },
    notes: "75W-80 GL-4 (same as manual transmission). Capacity: 1.2L"
  },
  {
    id: "front-differential-oil",
    name: "Front Differential Oil",
    category: "transmission",
    description: "Replace front differential oil",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: null },
        severe: { km: 15000, months: null }
      },
      europe: {
        normal: { km: 20000, months: null },
        severe: { km: 20000, months: null }
      }
    },
    notes: "75W-85 GL-5 synthetic. Capacity: 1.6L. Replace at first service only under normal conditions."
  },
  {
    id: "rear-differential-oil",
    name: "Rear Differential Oil",
    category: "transmission",
    description: "Replace rear differential oil",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: null },
        severe: { km: 15000, months: null }
      },
      europe: {
        normal: { km: 20000, months: null },
        severe: { km: 20000, months: null }
      }
    },
    notes: "75W-85 GL-5 synthetic. Capacity: 1.3L. Replace at first service only under normal conditions."
  },
  {
    id: "drive-belt",
    name: "Accessory Drive Belt",
    category: "engine",
    description: "Inspect tension, adjust, or replace drive belt",
    intervals: {
      "asia-pacific": {
        normal: { km: 60000, months: null },
        severe: { km: 45000, months: 36 }
      },
      europe: {
        normal: { km: 80000, months: null },
        severe: { km: 60000, months: 36 }
      }
    },
    notes: "Inspect at 30,000 km intervals"
  },
  {
    id: "fuel-filter",
    name: "Fuel Filter",
    category: "filters",
    description: "Replace fuel filter",
    intervals: {
      "asia-pacific": {
        normal: { km: 105000, months: null },
        severe: { km: 105000, months: null }
      },
      europe: {
        normal: { km: 100000, months: null },
        severe: { km: 100000, months: null }
      }
    },
    notes: "Replace more often if using low-quality fuel"
  },
  {
    id: "cabin-filter",
    name: "Cabin Air Filter (Pollen Filter)",
    category: "filters",
    description: "Replace cabin air filter",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: 24 },
        severe: { km: 15000, months: 12 }
      },
      europe: {
        normal: { km: 40000, months: 24 },
        severe: { km: 20000, months: 12 }
      }
    },
    notes: "Not all Jimnys come with cabin filter from factory. Check if installed."
  },
  {
    id: "wheel-bearings",
    name: "Wheel Bearings",
    category: "other",
    description: "Inspect wheel bearings for play and noise",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: null },
        severe: { km: 15000, months: null }
      },
      europe: {
        normal: { km: 40000, months: null },
        severe: { km: 20000, months: null }
      }
    },
    notes: "Check for play and unusual noise"
  },
  {
    id: "propeller-shafts",
    name: "Propeller Shafts",
    category: "other",
    description: "Inspect propeller shafts and U-joints",
    intervals: {
      "asia-pacific": {
        normal: { km: 45000, months: null },
        severe: { km: 15000, months: null }
      },
      europe: {
        normal: { km: 40000, months: null },
        severe: { km: 20000, months: null }
      }
    },
    notes: "Grease U-joints with Suzuki Super Grease C (99000-25030)"
  },
  {
    id: "suspension",
    name: "Suspension System",
    category: "other",
    description: "Inspect suspension components",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: null },
        severe: { km: 30000, months: null }
      },
      europe: {
        normal: { km: 40000, months: null },
        severe: { km: 40000, months: null }
      }
    },
    notes: "Check for leaks, damage, worn bushings"
  },
  {
    id: "steering",
    name: "Steering System",
    category: "other",
    description: "Inspect steering components",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: null },
        severe: { km: 30000, months: null }
      },
      europe: {
        normal: { km: 40000, months: null },
        severe: { km: 40000, months: null }
      }
    },
    notes: "Electric power steering - no fluid to change"
  },
  {
    id: "tyres",
    name: "Tyres & Wheels",
    category: "other",
    description: "Inspect tyres, rotate, check pressure",
    intervals: {
      "asia-pacific": {
        normal: { km: 15000, months: 12 },
        severe: { km: 15000, months: 12 }
      },
      europe: {
        normal: { km: 20000, months: 12 },
        severe: { km: 20000, months: 12 }
      }
    },
    notes: "Rotate tyres every oil change. Check pressure monthly."
  },
  {
    id: "ac-filter",
    name: "Air Conditioner Filter",
    category: "filters",
    description: "Inspect/replace A/C filter element",
    intervals: {
      "asia-pacific": {
        normal: { km: 30000, months: 24 },
        severe: { km: 22500, months: 18 }
      },
      europe: {
        normal: { km: 40000, months: 24 },
        severe: { km: 30000, months: 18 }
      }
    },
    notes: "Inspect at 15,000 km intervals"
  }
];
