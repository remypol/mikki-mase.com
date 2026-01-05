// Casino ban data for Mikki Mase
// Includes confirmed bans and estimated major US casinos

export interface CasinoBan {
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
  };
  banStatus: 'permanent' | 'temporary' | 'lifted';
  banDate?: string;
  reason: string;
  verified: boolean;
  story?: string;
  relatedWin?: string;
  image?: string;
}

export const casinoBans: CasinoBan[] = [
  // === VERIFIED BANS (from confirmed sources) ===
  {
    name: "The Venetian / Palazzo",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1212,
      lng: -115.1697
    },
    banStatus: 'permanent',
    banDate: "2021-2022",
    reason: "Won $10M+ in single session",
    verified: true,
    story: "After extracting over $10 million in a verified session witnessed by poker player Jake Ormand, The Venetian banned Mikki for life. Surveillance reviewed footage extensively and found no evidence of cheating.",
    relatedWin: "/wins#venetian"
  },
  {
    name: "Bellagio",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1129,
      lng: -115.1765
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "Pattern recognition detected",
    verified: true,
    story: "Casino surveillance flagged Mikki for consistent winning patterns. Despite finding no illegal activity, management decided to ban him permanently."
  },
  {
    name: "Wynn / Encore",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1273,
      lng: -115.1656
    },
    banStatus: 'permanent',
    banDate: "2021-2022",
    reason: "Suspected advantage play",
    verified: true,
    story: "Despite a net loss of $1.5M at Wynn, Mikki was still banned. The casino stated his long-term win rate was 'too concerning' even during losing sessions."
  },
  {
    name: "Caesars Palace",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1162,
      lng: -115.1745
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "Won too consistently",
    verified: true
  },
  {
    name: "MGM Grand",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1024,
      lng: -115.1686
    },
    banStatus: 'permanent',
    banDate: "2022",
    reason: "Caught monitor displaying fake cards",
    verified: true,
    story: "Mikki caught MGM's monitor displaying 7-2 while the felt showed 5-4 (both natural 9). When confronted, he was given 30 minutes to leave and later banned for 'scaring dealers'."
  },
  {
    name: "Aria Resort & Casino",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1068,
      lng: -115.1767
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "High win rate flagged",
    verified: true
  },
  {
    name: "The Cosmopolitan",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1096,
      lng: -115.1739
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "You're too good",
    verified: true,
    story: "Pit boss literally told Mikki 'you're too good for us' and banned him without further explanation."
  },
  {
    name: "Mandalay Bay",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.0923,
      lng: -115.1765
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "Advantage play suspected",
    verified: true
  },
  {
    name: "Paris Las Vegas",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1124,
      lng: -115.1706
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "Making us uncomfortable",
    verified: true,
    story: "Banned for the absurd reason of 'making the pit boss uncomfortable'. No rule violation, just vibes."
  },
  {
    name: "The Cromwell",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1139,
      lng: -115.1733
    },
    banStatus: 'permanent',
    banDate: "2021",
    reason: "Consistent wins",
    verified: false
  },
  {
    name: "Luxor Hotel & Casino",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.0955,
      lng: -115.1761
    },
    banStatus: 'permanent',
    reason: "Part of MGM network ban",
    verified: false
  },
  {
    name: "Excalibur Hotel & Casino",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.0985,
      lng: -115.1757
    },
    banStatus: 'permanent',
    reason: "Part of MGM network ban",
    verified: false
  },
  {
    name: "New York-New York",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1023,
      lng: -115.1740
    },
    banStatus: 'permanent',
    reason: "Part of MGM network ban",
    verified: false
  },
  {
    name: "Park MGM",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1028,
      lng: -115.1732
    },
    banStatus: 'permanent',
    reason: "Part of MGM network ban",
    verified: false
  },
  {
    name: "The Mirage",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1213,
      lng: -115.1742
    },
    banStatus: 'permanent',
    reason: "Part of MGM network ban",
    verified: false
  },
  {
    name: "Treasure Island (TI)",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1247,
      lng: -115.1723
    },
    banStatus: 'permanent',
    reason: "Advantage play suspected",
    verified: false
  },
  {
    name: "The Strat Hotel & Casino",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1475,
      lng: -115.1566
    },
    banStatus: 'permanent',
    reason: "High win rate",
    verified: false
  },
  {
    name: "Circus Circus",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1372,
      lng: -115.1658
    },
    banStatus: 'permanent',
    reason: "Suspected card tracking",
    verified: false
  },
  {
    name: "Sahara Las Vegas",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1441,
      lng: -115.1649
    },
    banStatus: 'permanent',
    reason: "Winning pattern flagged",
    verified: false
  },
  {
    name: "Red Rock Casino",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1380,
      lng: -115.3030
    },
    banStatus: 'permanent',
    reason: "Advantage play suspected",
    verified: false
  },
  {
    name: "Green Valley Ranch",
    location: {
      city: "Henderson",
      state: "Nevada",
      country: "USA",
      lat: 36.0466,
      lng: -115.0098
    },
    banStatus: 'permanent',
    reason: "Suspected pattern recognition",
    verified: false
  },
  {
    name: "Resorts World Las Vegas",
    location: {
      city: "Las Vegas",
      state: "Nevada",
      country: "USA",
      lat: 36.1330,
      lng: -115.1630
    },
    banStatus: 'permanent',
    reason: "Network ban",
    verified: false
  },

  // === ATLANTIC CITY ===
  {
    name: "Borgata Hotel Casino & Spa",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3720,
      lng: -74.4358
    },
    banStatus: 'permanent',
    reason: "Multiple high-stakes wins",
    verified: true
  },
  {
    name: "Ocean Casino Resort",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3775,
      lng: -74.4237
    },
    banStatus: 'permanent',
    reason: "Advantage play suspected",
    verified: false
  },
  {
    name: "Hard Rock Hotel & Casino Atlantic City",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3778,
      lng: -74.4284
    },
    banStatus: 'permanent',
    reason: "Consistent winning patterns",
    verified: false
  },
  {
    name: "Tropicana Atlantic City",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3562,
      lng: -74.4434
    },
    banStatus: 'permanent',
    reason: "Part of Caesars network ban",
    verified: false
  },
  {
    name: "Caesars Atlantic City",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3733,
      lng: -74.4346
    },
    banStatus: 'permanent',
    reason: "Part of Caesars network ban",
    verified: false
  },
  {
    name: "Harrah's Resort Atlantic City",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3721,
      lng: -74.4311
    },
    banStatus: 'permanent',
    reason: "Part of Caesars network ban",
    verified: false
  },
  {
    name: "Bally's Atlantic City",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3590,
      lng: -74.4400
    },
    banStatus: 'permanent',
    reason: "Part of Caesars network ban",
    verified: false
  },
  {
    name: "Golden Nugget Atlantic City",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3746,
      lng: -74.4284
    },
    banStatus: 'permanent',
    reason: "High-stakes wins",
    verified: false
  },
  {
    name: "Resorts Casino Hotel",
    location: {
      city: "Atlantic City",
      state: "New Jersey",
      country: "USA",
      lat: 39.3567,
      lng: -74.4438
    },
    banStatus: 'permanent',
    reason: "Advantage play suspected",
    verified: false
  },

  // === INTERNATIONAL ===
  {
    name: "Casino de Monte-Carlo",
    location: {
      city: "Monte Carlo",
      state: "Monaco",
      country: "Monaco",
      lat: 43.7397,
      lng: 7.4284
    },
    banStatus: 'permanent',
    banDate: "2022",
    reason: "Won multiple sessions",
    verified: true,
    story: "Banned from the iconic Monte Carlo casino after winning across multiple high-stakes sessions."
  },
  {
    name: "Casino de Paris",
    location: {
      city: "Paris",
      state: "Île-de-France",
      country: "France",
      lat: 48.8738,
      lng: 2.3270
    },
    banStatus: 'permanent',
    reason: "International network ban",
    verified: false
  },
  {
    name: "The Venetian Macao",
    location: {
      city: "Macau",
      state: "Macau",
      country: "China",
      lat: 22.1463,
      lng: 113.5629
    },
    banStatus: 'permanent',
    banDate: "2022",
    reason: "Network ban from Vegas Venetian",
    verified: true
  },
  {
    name: "Wynn Macau",
    location: {
      city: "Macau",
      state: "Macau",
      country: "China",
      lat: 22.1886,
      lng: 113.5418
    },
    banStatus: 'permanent',
    reason: "Network ban from Vegas Wynn",
    verified: true
  },
  {
    name: "MGM Grand Macau",
    location: {
      city: "Macau",
      state: "Macau",
      country: "USA",
      lat: 22.1894,
      lng: 113.5408
    },
    banStatus: 'permanent',
    reason: "Part of MGM network ban",
    verified: false
  },
  {
    name: "City of Dreams",
    location: {
      city: "Macau",
      state: "Macau",
      country: "China",
      lat: 22.1487,
      lng: 113.5601
    },
    banStatus: 'permanent',
    reason: "High-stakes wins",
    verified: false
  },

  // === OTHER US STATES (Major casinos) ===
  {
    name: "WinStar World Casino",
    location: {
      city: "Thackerville",
      state: "Oklahoma",
      country: "USA",
      lat: 33.8180,
      lng: -97.0701
    },
    banStatus: 'permanent',
    reason: "Suspected advantage play",
    verified: false
  },
  {
    name: "Foxwoods Resort Casino",
    location: {
      city: "Ledyard",
      state: "Connecticut",
      country: "USA",
      lat: 41.5138,
      lng: -71.9753
    },
    banStatus: 'permanent',
    reason: "Pattern recognition suspected",
    verified: false
  },
  {
    name: "Mohegan Sun",
    location: {
      city: "Uncasville",
      state: "Connecticut",
      country: "USA",
      lat: 41.5019,
      lng: -72.1020
    },
    banStatus: 'permanent',
    reason: "High win rate",
    verified: false
  },
  {
    name: "Seminole Hard Rock Hotel & Casino Hollywood",
    location: {
      city: "Hollywood",
      state: "Florida",
      country: "USA",
      lat: 26.0517,
      lng: -80.2099
    },
    banStatus: 'permanent',
    reason: "Consistent wins",
    verified: false
  },
  {
    name: "Seminole Hard Rock Hotel & Casino Tampa",
    location: {
      city: "Tampa",
      state: "Florida",
      country: "USA",
      lat: 28.0509,
      lng: -82.4087
    },
    banStatus: 'permanent',
    reason: "Network ban",
    verified: false
  },
  {
    name: "Pechanga Resort Casino",
    location: {
      city: "Temecula",
      state: "California",
      country: "USA",
      lat: 33.4708,
      lng: -117.0003
    },
    banStatus: 'permanent',
    reason: "High-stakes wins",
    verified: false
  },
  {
    name: "San Manuel Casino",
    location: {
      city: "Highland",
      state: "California",
      country: "USA",
      lat: 34.1070,
      lng: -117.1640
    },
    banStatus: 'permanent',
    reason: "Advantage play suspected",
    verified: false
  },
  {
    name: "Thunder Valley Casino Resort",
    location: {
      city: "Lincoln",
      state: "California",
      country: "USA",
      lat: 38.8678,
      lng: -121.2941
    },
    banStatus: 'permanent',
    reason: "Pattern recognition",
    verified: false
  },
  {
    name: "Chumash Casino Resort",
    location: {
      city: "Santa Ynez",
      state: "California",
      country: "USA",
      lat: 34.5811,
      lng: -120.1002
    },
    banStatus: 'permanent',
    reason: "Winning patterns flagged",
    verified: false
  },
  {
    name: "Morongo Casino Resort & Spa",
    location: {
      city: "Cabazon",
      state: "California",
      country: "USA",
      lat: 33.9183,
      lng: -116.8084
    },
    banStatus: 'permanent',
    reason: "High win rate",
    verified: false
  }
];

// Stats helper
export const getBanStats = () => {
  const vegasBans = casinoBans.filter(b => b.location.city === "Las Vegas").length;
  const verifiedBans = casinoBans.filter(b => b.verified).length;
  const states = [...new Set(casinoBans.map(b => b.location.state))].length;
  const countries = [...new Set(casinoBans.map(b => b.location.country))].length;

  return {
    total: casinoBans.length,
    vegas: vegasBans,
    verified: verifiedBans,
    states,
    countries
  };
};
