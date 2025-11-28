import { Part } from "./types";

export const partsData: Part[] = [
  {
    id: "oil-filter",
    name: "Engine Oil Filter",
    category: "Filters",
    oemPartNumber: "16510-82703",
    alternatives: [
      { brand: "Suzuki", partNumber: "16510-81404", notes: "Also compatible" },
      { brand: "HKS", partNumber: "52009-AK011" },
      { brand: "K&N", partNumber: "KN-138" }
    ],
    specifications: "Thread: UNF 3/4-16"
  },
  {
    id: "air-filter",
    name: "Engine Air Filter",
    category: "Filters",
    oemPartNumber: "13780-81A00",
    alternatives: [
      { brand: "K&N", partNumber: "33-3151", notes: "Reusable" },
      { brand: "Mann", partNumber: "C 1858" }
    ]
  },
  {
    id: "spark-plugs",
    name: "Spark Plugs (set of 4)",
    category: "Ignition",
    oemPartNumber: "NGK KR6A-10",
    alternatives: [
      { brand: "Denso", partNumber: "ZXU20PR11" },
      { brand: "NGK", partNumber: "LKAR7A-9", notes: "Iridium upgrade" }
    ],
    specifications: "Gap: 1.0-1.1mm"
  },
  {
    id: "front-brake-pads",
    name: "Front Brake Pads",
    category: "Brakes",
    oemPartNumber: "55200-70AA0",
    alternatives: [
      { brand: "Bendix", partNumber: "DB2236GCT" },
      { brand: "TRW", partNumber: "GDB3548" }
    ],
    specifications: "Solid disc brakes (JB74 3-door)"
  },
  {
    id: "rear-brake-shoes",
    name: "Rear Brake Shoes",
    category: "Brakes",
    oemPartNumber: "53200-78R00",
    alternatives: [
      { brand: "Bendix", partNumber: "BS1926" },
      { brand: "TRW", partNumber: "GS8775" }
    ],
    specifications: "Drum brakes"
  },
  {
    id: "cabin-filter",
    name: "Cabin Air Filter",
    category: "Filters",
    oemPartNumber: "95860-78R00",
    alternatives: [
      { brand: "Mann", partNumber: "CU 2141" },
      { brand: "Bosch", partNumber: "0986AF5096" }
    ]
  },
  {
    id: "fuel-filter",
    name: "Fuel Filter",
    category: "Filters",
    oemPartNumber: "15410-78R00",
    alternatives: [
      { brand: "Mann", partNumber: "WK 55/1" },
      { brand: "Bosch", partNumber: "F026402824" }
    ],
    specifications: "In-tank fuel filter"
  },
  {
    id: "drive-belt",
    name: "Accessory Drive Belt",
    category: "Engine",
    oemPartNumber: "17521-77M00",
    alternatives: [
      { brand: "Gates", partNumber: "4PK850" },
      { brand: "Continental", partNumber: "4PK855" }
    ],
    specifications: "4PK850-855 ribbed belt"
  },
  {
    id: "thermostat",
    name: "Thermostat",
    category: "Cooling",
    oemPartNumber: "17670-74P00",
    alternatives: [
      { brand: "Gates", partNumber: "TH49682G1" },
      { brand: "Tridon", partNumber: "TT2074-180" }
    ],
    specifications: "Opening temp: 82°C"
  },
  {
    id: "radiator-cap",
    name: "Radiator Cap",
    category: "Cooling",
    oemPartNumber: "17931-60A11",
    alternatives: [
      { brand: "Tridon", partNumber: "CA1610" }
    ],
    specifications: "1.1 bar (16 psi)"
  },
  {
    id: "wiper-blades-front",
    name: "Front Wiper Blades",
    category: "Body",
    oemPartNumber: "38340-78R00 / 38330-78R00",
    alternatives: [
      { brand: "Bosch", partNumber: "A295S", notes: "Aerotwin set" },
      { brand: "PIAA", partNumber: "95040/95045" }
    ],
    specifications: "Driver: 400mm, Passenger: 450mm"
  },
  {
    id: "wiper-blade-rear",
    name: "Rear Wiper Blade",
    category: "Body",
    oemPartNumber: "38340-78R10",
    alternatives: [
      { brand: "Bosch", partNumber: "H311" }
    ],
    specifications: "300mm"
  }
];
