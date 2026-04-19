import biryani from "@/assets/recipe-biryani.jpg";
import nihari from "@/assets/recipe-nihari.jpg";
import karahi from "@/assets/recipe-karahi.jpg";
import malaiBoti from "@/assets/recipe-malai-boti.jpg";
import haleem from "@/assets/recipe-haleem.jpg";
import chapli from "@/assets/recipe-chapli.jpg";

export type RecipeTag =
  | "Quick"
  | "Vegetarian"
  | "BBQ"
  | "Dessert"
  | "Spicy"
  | "Mild"
  | "Weekend"
  | "One-Pot"
  | "Crowd-Pleaser";

export type Recipe = {
  slug: string;
  title: string;
  category: "Biryani & Rice" | "Curry" | "BBQ & Kebabs" | "Slow-Cooked";
  time: string;
  serves: string;
  spice: 1 | 2 | 3;
  excerpt: string;
  image: string;
  date: string;
  tags: RecipeTag[];
};

export const recipes: Recipe[] = [
  {
    slug: "sindhi-biryani",
    title: "Sindhi Biryani",
    category: "Biryani & Rice",
    time: "1 hr 30 min",
    serves: "6",
    spice: 3,
    excerpt:
      "Spicy chicken and potato biryani layered with saffron rice, fried onions, and aloo bukhara. The Sunday classic in Karachi homes.",
    image: biryani,
    date: "Jul 26, 2025",
    tags: ["Spicy", "Weekend", "One-Pot", "Crowd-Pleaser"],
  },
  {
    slug: "beef-nihari",
    title: "Beef Nihari",
    category: "Slow-Cooked",
    time: "5 hr",
    serves: "8",
    spice: 3,
    excerpt:
      "Slow-simmered beef stew with bone marrow, finished with ginger and lemon. Sunday morning, naan in hand — pure tradition.",
    image: nihari,
    date: "Jul 20, 2025",
    tags: ["Spicy", "Weekend", "Crowd-Pleaser"],
  },
  {
    slug: "chicken-karahi",
    title: "Chicken Karahi",
    category: "Curry",
    time: "45 min",
    serves: "4",
    spice: 2,
    excerpt:
      "Tomato-forward, ginger-loaded, finished in a screaming-hot wok. The dhaba favourite that comes together in under an hour.",
    image: karahi,
    date: "Jul 12, 2025",
    tags: ["Quick", "One-Pot"],
  },
  {
    slug: "chicken-malai-boti",
    title: "Chicken Malai Boti",
    category: "BBQ & Kebabs",
    time: "40 min",
    serves: "4",
    spice: 1,
    excerpt:
      "Cream and yoghurt marinated chicken skewers — soft, mild, and built for the grill. A daawat staple.",
    image: malaiBoti,
    date: "Jun 17, 2025",
    tags: ["Mild", "BBQ", "Quick"],
  },
  {
    slug: "haleem",
    title: "Haleem",
    category: "Slow-Cooked",
    time: "4 hr",
    serves: "10",
    spice: 2,
    excerpt:
      "Slow-cooked beef and lentils pounded to a velvety stew. Topped with fried onions, ginger, and a squeeze of lemon.",
    image: haleem,
    date: "Jun 16, 2025",
    tags: ["Weekend", "Crowd-Pleaser", "One-Pot"],
  },
  {
    slug: "chapli-kebab",
    title: "Chapli Kebab",
    category: "BBQ & Kebabs",
    time: "30 min",
    serves: "4",
    spice: 2,
    excerpt:
      "Peshawar's flat, fragrant beef kebabs with pomegranate seeds and crushed coriander. Crispy edges, juicy middle.",
    image: chapli,
    date: "Jun 19, 2025",
    tags: ["BBQ", "Quick"],
  },
];

export const getRecipe = (slug: string) =>
  recipes.find((r) => r.slug === slug);
