// redux/Api/restaurantTypes.ts

// Single Dish
export interface Dish {
  id: number;
  name: string;
  description: string;
  price: string; // চাইলে number করো
  image: string;
}

// Restaurant
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceLabel: "Low" | "Medium" | "High";
  price: number; // average price
  offer?: "Free delivery" | "Deals" | "Vouchers" | "";
  rating: number;
  distance: number;
  deliveryTime: number;
  isSuper: boolean;
  image: string;
  menu: Dish[];
}
