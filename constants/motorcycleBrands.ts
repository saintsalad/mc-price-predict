// Data sources:
// - Honda Philippines (https://www.hondaph.com/motorcycles/)
// - Yamaha Philippines (https://www.yamaha-motor.com.ph/)
// - Suzuki Philippines (https://www.suzuki.com.ph/motorcycle)
// - Kawasaki Philippines (https://www.kawasaki.ph/)
// - Motorstar Philippines (https://www.motorstar.com.ph/)
// - MotorTrade Philippines (https://www.motortrade.com.ph/)
// - MotoMarket PH (https://www.motomarket.com.ph/)
// - ZigWheels Philippines (https://www.zigwheels.ph/)
// Prices and availability last updated: March 2024

// Price and specification data sources (last updated: March 2024):
// Each brand's data is verified from multiple sources to ensure accuracy

export type TransmissionType =
  | "Manual"
  | "Automatic"
  | "Semi-Automatic"
  | "CVT"; // Continuously Variable Transmission

export type MotorcycleModel = {
  name: string;
  priceRange: {
    min: number;
    max: number;
  };
  yearRange: string;
  category:
    | "Scooter"
    | "Underbone"
    | "Backbone"
    | "Sport"
    | "Adventure"
    | "Cruiser";
  displacement: number; // in cc
  transmission: TransmissionType;
};

export type MotorcycleBrand = {
  name: string;
  models: MotorcycleModel[];
};

export const motorcycleBrands: MotorcycleBrand[] = [
  {
    name: "Honda",
    models: [
      {
        name: "Click 125i",
        priceRange: { min: 77900, max: 82900 },
        yearRange: "2018-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Click 160i",
        priceRange: { min: 116900, max: 122900 },
        yearRange: "2022-2024",
        category: "Scooter",
        displacement: 160,
        transmission: "CVT",
      },
      {
        name: "PCX 160",
        priceRange: { min: 133900, max: 147900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 160,
        transmission: "CVT",
      },
      {
        name: "ADV 160",
        priceRange: { min: 164900, max: 169900 },
        yearRange: "2022-2024",
        category: "Scooter",
        displacement: 160,
        transmission: "CVT",
      },
      {
        name: "BeAT",
        priceRange: { min: 69900, max: 72900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "Manual",
      },
      {
        name: "TMX Supremo",
        priceRange: { min: 51400, max: 54900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 125,
        transmission: "Manual",
      },
      {
        name: "XRM125",
        priceRange: { min: 69900, max: 74900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 125,
        transmission: "Manual",
      },
      {
        name: "RS150",
        priceRange: { min: 96900, max: 99900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "CBR150R",
        priceRange: { min: 159900, max: 165900 },
        yearRange: "2021-2024",
        category: "Sport",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "CB150X",
        priceRange: { min: 163900, max: 168900 },
        yearRange: "2022-2024",
        category: "Adventure",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "BeAT Premium ISS/CBS",
        priceRange: { min: 74900, max: 79900 },
        yearRange: "2019-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "CRF250L",
        priceRange: { min: 259900, max: 269900 },
        yearRange: "2018-2024",
        category: "Adventure",
        displacement: 250,
        transmission: "Manual",
      },
    ],
  },
  {
    name: "Yamaha",
    models: [
      {
        name: "Mio i125",
        priceRange: { min: 75900, max: 79900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Mio Soul i125",
        priceRange: { min: 79900, max: 84900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Mio Aerox",
        priceRange: { min: 119900, max: 132900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "NMAX",
        priceRange: { min: 143900, max: 159900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 150,
        transmission: "CVT",
      },
      {
        name: "Sniper 155",
        priceRange: { min: 114900, max: 122900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 155,
        transmission: "Manual",
      },
      {
        name: "XSR155",
        priceRange: { min: 162900, max: 169900 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 155,
        transmission: "Manual",
      },
      {
        name: "MT-15",
        priceRange: { min: 159900, max: 164900 },
        yearRange: "2021-2024",
        category: "Sport",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "YZF-R15",
        priceRange: { min: 166900, max: 171900 },
        yearRange: "2021-2024",
        category: "Sport",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "XMAX",
        priceRange: { min: 259900, max: 289900 },
        yearRange: "2017-2024",
        category: "Scooter",
        displacement: 300,
        transmission: "CVT",
      },
      {
        name: "Mio Fazzio",
        priceRange: { min: 88900, max: 92900 },
        yearRange: "2022-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "MT-03",
        priceRange: { min: 254000, max: 269000 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 321,
        transmission: "Manual",
      },
    ],
  },
  {
    name: "Suzuki",
    models: [
      {
        name: "Raider R150 Fi",
        priceRange: { min: 97900, max: 102900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "Skydrive Fi",
        priceRange: { min: 69900, max: 75900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Burgman Street",
        priceRange: { min: 76900, max: 82900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Gixxer Fi",
        priceRange: { min: 92900, max: 99900 },
        yearRange: "2020-2024",
        category: "Backbone",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "GSX-R150",
        priceRange: { min: 155900, max: 162900 },
        yearRange: "2021-2024",
        category: "Sport",
        displacement: 150,
        transmission: "Manual",
      },
    ],
  },
  {
    name: "Kawasaki",
    models: [
      {
        name: "Rouser NS160",
        priceRange: { min: 94900, max: 98900 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 160,
        transmission: "Manual",
      },
      {
        name: "Rouser NS200",
        priceRange: { min: 116900, max: 122900 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 200,
        transmission: "Manual",
      },
      {
        name: "Rouser RS200",
        priceRange: { min: 127900, max: 134900 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 200,
        transmission: "Manual",
      },
      {
        name: "Ninja 400",
        priceRange: { min: 331000, max: 342000 },
        yearRange: "2021-2024",
        category: "Sport",
        displacement: 400,
        transmission: "Manual",
      },
      {
        name: "Dominar 400",
        priceRange: { min: 189900, max: 199900 },
        yearRange: "2021-2024",
        category: "Sport",
        displacement: 400,
        transmission: "Manual",
      },
      {
        name: "Ninja 300",
        priceRange: { min: 259000, max: 269000 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 300,
        transmission: "Manual",
      },
    ],
  },
  {
    name: "Motorstar",
    models: [
      {
        name: "Cafe 400",
        priceRange: { min: 168000, max: 175000 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 400,
        transmission: "Manual",
      },
      {
        name: "Classic 150",
        priceRange: { min: 55900, max: 59900 },
        yearRange: "2020-2024",
        category: "Cruiser",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "Explorer 250",
        priceRange: { min: 88000, max: 95000 },
        yearRange: "2020-2024",
        category: "Adventure",
        displacement: 250,
        transmission: "Manual",
      },
      {
        name: "Star-X 125",
        priceRange: { min: 39900, max: 42900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 125,
        transmission: "Manual",
      },
      {
        name: "Xplorer 200",
        priceRange: { min: 69900, max: 75900 },
        yearRange: "2020-2024",
        category: "Adventure",
        displacement: 200,
        transmission: "Manual",
      },
    ],
  },
  {
    name: "Rusi",
    models: [
      {
        name: "Classic 250",
        priceRange: { min: 68000, max: 75000 },
        yearRange: "2020-2024",
        category: "Cruiser",
        displacement: 250,
        transmission: "Manual",
      },
      {
        name: "SDR 150",
        priceRange: { min: 49900, max: 55900 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "MP150",
        priceRange: { min: 45900, max: 49900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "VRF 150",
        priceRange: { min: 52900, max: 58900 },
        yearRange: "2020-2024",
        category: "Sport",
        displacement: 150,
        transmission: "Manual",
      },
      {
        name: "Cruiser 250",
        priceRange: { min: 75000, max: 82000 },
        yearRange: "2020-2024",
        category: "Cruiser",
        displacement: 250,
        transmission: "Manual",
      },
    ],
  },
  {
    name: "SYM",
    models: [
      {
        name: "Magic 110",
        priceRange: { min: 44900, max: 48900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 110,
        transmission: "Manual",
      },
      {
        name: "Bonus 110",
        priceRange: { min: 42900, max: 46900 },
        yearRange: "2020-2024",
        category: "Underbone",
        displacement: 110,
        transmission: "Manual",
      },
      {
        name: "Jet 14",
        priceRange: { min: 99900, max: 109900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Mask 150",
        priceRange: { min: 89900, max: 94900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 150,
        transmission: "CVT",
      },
      {
        name: "MaxSym 400i",
        priceRange: { min: 335000, max: 345000 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 400,
        transmission: "CVT",
      },
    ],
  },
  {
    name: "Kymco",
    models: [
      {
        name: "Like 125",
        priceRange: { min: 78900, max: 84900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 125,
        transmission: "CVT",
      },
      {
        name: "Super 8 150",
        priceRange: { min: 88900, max: 94900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 150,
        transmission: "CVT",
      },
      {
        name: "X-Town CT300i",
        priceRange: { min: 239000, max: 249000 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 300,
        transmission: "CVT",
      },
      {
        name: "Agility 160i",
        priceRange: { min: 99900, max: 106900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 160,
        transmission: "CVT",
      },
      {
        name: "DTX 360",
        priceRange: { min: 289000, max: 299000 },
        yearRange: "2022-2024",
        category: "Adventure",
        displacement: 360,
        transmission: "Manual",
      },
      {
        name: "Skytown 150",
        priceRange: { min: 119900, max: 129900 },
        yearRange: "2021-2024",
        category: "Scooter",
        displacement: 150,
        transmission: "CVT",
      },
      {
        name: "Like S 150",
        priceRange: { min: 119900, max: 124900 },
        yearRange: "2020-2024",
        category: "Scooter",
        displacement: 150,
        transmission: "CVT",
      },
    ],
  },
  {
    name: "Royal Enfield",
    models: [
      {
        name: "Shotgun 650",
        priceRange: { min: 369000, max: 379000 },
        yearRange: "2022-2024",
        category: "Cruiser",
        displacement: 648,
        transmission: "Manual",
      },
    ],
  },
];
