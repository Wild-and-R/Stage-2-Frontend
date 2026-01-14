import { useState, useEffect} from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { api } from "../services/api";

type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
}
export default function Products() {
  const [Products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/products")
        setProducts(res.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  } , []);

  return (
    <div className="pd-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Catalog</h1>
      {loading && <p>Loading products...</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Products.map((product) => (
      <Dialog key={product.id}>
        <DialogTrigger asChild>
      <Card key={product.id} className="w-full max-w-md mb-4 cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>Category: {product.category}</CardDescription>
        </CardHeader>
      <CardContent>
        <p>Description: {product.description}</p>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground w-full text-center">
          Price: ${product.price}
        </p>
      </CardFooter>
    </Card>
    </DialogTrigger>
    <DialogContent>
  <DialogHeader>
    <DialogTitle>{selectedProduct?.title}</DialogTitle>
    <DialogDescription>
      {selectedProduct?.description}
    </DialogDescription>
  </DialogHeader>

  <div className="mt-4 flex justify-between items-center">
    <span className="text-sm text-muted-foreground">
      Category: {selectedProduct?.category}
    </span>
    <span className="text-xl font-bold">
      ${selectedProduct?.price}
    </span>
  </div>
</DialogContent>
  </Dialog>
    ))}</ul>
    </div>
  )
}