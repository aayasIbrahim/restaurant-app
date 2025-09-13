
import Pizza from "../components/FoodDetails/Pizza";
import Burger from "../components/FoodDetails/Burger";
import Biryani from "../components/FoodDetails/Biryani";
import Cake from "../components/FoodDetails/Cake";
import Wings from "../components/FoodDetails/Wings";
import Sandwich from "../components/FoodDetails/Sandwich";
import BBQ from "../components/FoodDetails/BBQ";

export interface MenuItem {
  id: string;
  label: string;
  emoji: string;
  content: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    id: "pizza",
    label: "Pizza Margherita",
    emoji: "🍕",
    content: <Pizza />,
  },
  {
    id: "veggie-pizza",
    label: "Veggie Pizza",
    emoji: "🥗",
    content: <Pizza />,
  },
  {
    id: "burger",
    label: "Beef Burger",
    emoji: "🍔",
    content: <Burger />,
  },
  {
    id: "chicken-biryani",
    label: "Chicken Biryani",
    emoji: "🍛",
    content: <Biryani />,
  },
  {
    id: "chocolate-cake",
    label: "Chocolate Cake",
    emoji: "🎂",
    content: <Cake />,
  },
  {
    id: "chicken-wings",
    label: "Chicken Wings",
    emoji: "🍗",
    content: <Wings />,
  },
  {
    id: "sandwich",
    label: "Sandwich",
    emoji: "🥪",
    content: <Sandwich />,
  },
  {
    id: "bbq",
    label: "BBQ Special",
    emoji: "🔥",
    content: <BBQ />,
  },
  {
    id: "bbq",
    label: "BBQ Special",
    emoji: "🔥",
    content: <BBQ />,
  },
];
