"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard, { Product } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { IconFilter } from "@tabler/icons-react";

interface ShopInterfaceProps {
  products: Product[];
  t: {
    addToCart: string;
    filters: string;
    sort: string;
    sortBy: {
      newest: string;
      priceLowToHigh: string;
      priceHighToLow: string;
    };
    category: string;
    priceRange: string;
    clearFilters: string;
    results: string;
    categories?: Record<string, string>;
  };
  lang: string;
}

function ShopContent({ products, t, lang }: ShopInterfaceProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [sort, setSort] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  // Sync category from URL to state
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  // Derive categories from product slugs
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      const source = p.slug || p.title;
      if (source.toLowerCase().includes("suit")) cats.add("Suits");
      else if (source.toLowerCase().includes("dress")) cats.add("Dresses");
      else if (source.toLowerCase().includes("shirt")) cats.add("Tops");
      else if (source.toLowerCase().includes("pant")) cats.add("Bottoms");
      else if (source.toLowerCase().includes("knit")) cats.add("Knitwear");
      else if (source.toLowerCase().includes("kimono")) cats.add("Outerwear");
      else cats.add("Other");
    });
    return Array.from(cats).sort();
  }, [products]);

  const getCategory = (product: Product) => {
    const source = (product.slug || product.title).toLowerCase();
    if (source.includes("suit")) return "Suits";
    if (source.includes("dress")) return "Dresses";
    if (source.includes("shirt")) return "Tops";
    if (source.includes("pant")) return "Bottoms";
    if (source.includes("knit")) return "Knitwear";
    if (source.includes("kimono")) return "Outerwear";
    return "Other";
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(getCategory(p));
        const matchesPrice =
          p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0; // Default to original order
      });
  }, [products, sort, selectedCategories, priceRange]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden lg:block w-64 space-y-8 shrink-0 sticky top-24 h-fit">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t.category}</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${cat}`}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                />
                <label
                  htmlFor={`cat-${cat}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {t.categories?.[cat] || cat}
                </label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t.priceRange}</h3>
          <Slider
            defaultValue={[0, 200000]}
            max={200000}
            step={1000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="py-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>¥{priceRange[0].toLocaleString()}</span>
            <span>¥{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([0, 200000]);
          }}
        >
          {t.clearFilters}
        </Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredProducts.length} {t.results}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    className="lg:hidden flex-1 sm:flex-none"
                  >
                    <IconFilter className="w-4 h-4 mr-2" />
                    {t.filters}
                  </Button>
                }
              />
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>{t.filters}</SheetTitle>
                  <SheetDescription>Refine your search</SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{t.category}</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-cat-${cat}`}
                            checked={selectedCategories.includes(cat)}
                            onCheckedChange={() => toggleCategory(cat)}
                          />
                          <label
                            htmlFor={`mobile-cat-${cat}`}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {t.categories?.[cat] || cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{t.priceRange}</h3>
                    <Slider
                      defaultValue={[0, 200000]}
                      max={200000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>¥{priceRange[0].toLocaleString()}</span>
                      <span>¥{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 200000]);
                    }}
                  >
                    {t.clearFilters}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder={t.sort} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t.sortBy.newest}</SelectItem>
                <SelectItem value="price-asc">
                  {t.sortBy.priceLowToHigh}
                </SelectItem>
                <SelectItem value="price-desc">
                  {t.sortBy.priceHighToLow}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${product.title}-${index}`}
              product={product}
              addToCartText={t.addToCart}
              className="h-full"
              lang={lang}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No products found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export function ShopInterface(props: ShopInterfaceProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen animate-pulse bg-accent/5 rounded-lg" />
      }
    >
      <ShopContent {...props} />
    </Suspense>
  );
}
