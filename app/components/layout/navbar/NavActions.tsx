"use client";

import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NavActions() {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {/* Search */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search"
        className="rounded-full"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Wishlist */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Wishlist"
        className="relative rounded-full"
      >
        <Heart className="h-5 w-5" />

        <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full p-0 text-[10px]">
          2
        </Badge>
      </Button>

      {/* Cart */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping cart"
        className="relative rounded-full"
      >
        <ShoppingBag className="h-5 w-5" />

        <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full p-0 text-[10px]">
          3
        </Badge>
      </Button>

      {/* User */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Account"
        className="rounded-full"
      >
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
}