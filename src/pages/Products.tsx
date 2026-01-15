import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
};

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedProductId, setAddedProductId] =
    useState<number | null>(null);

  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Debounced search
  useEffect(() => {
    setSearchLoading(true);
    setError("");

    const timer = setTimeout(() => {
      if (!search.trim()) {
        setFilteredProducts(products);
        setSearchLoading(false);
        return;
      }

      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );

      if (filtered.length === 0) {
        setError("No products found");
      }

      setFilteredProducts(filtered);
      setSearchLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, products]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Product Catalog
      </h1>

      <div className="mb-6 max-w-md mx-auto">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="text-center">Loading products...</p>}
      {searchLoading && <p className="text-center">Searching...</p>}
      {error && !loading && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Dialog
              key={product.id}
              onOpenChange={(open) => {
                if (!open) {
                  setSelectedProduct(null);
                  setQuantity(1);
                  setAddedProductId(null);
                }
              }}
            >
              <DialogTrigger asChild>
                <Card
                  className="cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>
                      Category: {product.category}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="line-clamp-3">
                      {product.description}
                    </p>
                  </CardContent>

                  <CardFooter className="text-center">
                    <span className="font-semibold">
                      ${product.price}
                    </span>
                  </CardFooter>
                </Card>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedProduct?.title}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedProduct?.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Category: {selectedProduct?.category}
                    </span>
                    <span className="text-xl font-bold">
                      ${selectedProduct?.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Quantity
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        disabled={quantity === 1}
                        onClick={() =>
                          setQuantity((q) =>
                            Math.max(1, q - 1)
                          )
                        }
                      >
                        −
                      </Button>

                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          setQuantity((q) => q + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      addedProductId === selectedProduct?.id
                    }
                    variant={
                      addedProductId === selectedProduct?.id
                        ? "secondary"
                        : "default"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!selectedProduct) return;

                      addToCart(
                        {
                          id: selectedProduct.id,
                          title: selectedProduct.title,
                          price: selectedProduct.price,
                        },
                        quantity
                      );

                      setAddedProductId(selectedProduct.id);
                    }}
                  >
                    {addedProductId === selectedProduct?.id
                      ? "Added ✓"
                      : `Add ${quantity} to Cart`}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </ul>
      )}
    </div>
  );
}
