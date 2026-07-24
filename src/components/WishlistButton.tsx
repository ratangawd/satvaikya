import { Heart } from "lucide-react";
import { useWishlist, type WishlistItem } from "@/contexts/WishlistContext";

interface Props {
  item: WishlistItem;
  className?: string;
}

export default function WishlistButton({ item, className = "" }: Props) {
  const { has, toggle } = useWishlist();
  const active = has(item.id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 backdrop-blur border border-border shadow-sm hover:bg-white transition ${className}`}
    >
      <Heart
        className={`h-4 w-4 transition ${active ? "fill-brand text-brand" : "text-foreground"}`}
      />
    </button>
  );
}