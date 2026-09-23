export const WA = "2349121924994";
export const formatNaira = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
export const demoProducts = [
  {
    id: "demo-1",
    slug: "classic-chain-handbag",
    name: "Classic Chain Handbag",
    category: "bags",
    price: 45000,
    oldPrice: 52000,
    rating: 4.9,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    badge: "Bestseller",
  },
  {
    id: "demo-2",
    slug: "luxury-heeled-sandals",
    name: "Luxury Heeled Sandals",
    category: "footwear",
    price: 38500,
    rating: 4.8,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85",
    badge: "New",
  },
  {
    id: "demo-3",
    slug: "elegant-tote-bag",
    name: "Elegant Tote Bag",
    category: "bags",
    price: 52000,
    rating: 4.9,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "demo-4",
    slug: "premium-slide-sandals",
    name: "Premium Slide Sandals",
    category: "footwear",
    price: 28000,
    rating: 4.7,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "demo-5",
    slug: "soft-structured-shoulder-bag",
    name: "Soft Structured Shoulder Bag",
    category: "bags",
    price: 42000,
    rating: 4.8,
    reviews: 9,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "demo-6",
    slug: "strappy-evening-heels",
    name: "Strappy Evening Heels",
    category: "footwear",
    price: 49000,
    rating: 5,
    reviews: 7,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "demo-7",
    slug: "silky-night-set",
    name: "Silky Night Set",
    category: "nightwear",
    price: 32000,
    rating: 4.8,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "demo-8",
    slug: "signature-lace-set",
    name: "Signature Lace Set",
    category: "underwear",
    price: 18000,
    rating: 4.7,
    reviews: 11,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1000&q=85",
  },
];
export const categories = [
  {
    slug: "bags",
    name: "Bags",
    icon: "bag",
    copy: "Statement pieces & everyday essentials",
  },
  {
    slug: "footwear",
    name: "Footwear",
    icon: "shoe",
    copy: "Heels, slides & more",
  },
  {
    slug: "nightwear",
    name: "Nightwear",
    icon: "night",
    copy: "Soft, feminine comfort",
  },
  {
    slug: "underwear",
    name: "Underwear",
    icon: "under",
    copy: "Beautiful essentials",
  },
];
export function waLink(message) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
}
