import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/button";

export default function Cart() {
  const { cart, removeFromCart, addToCart, loadingIds } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return <p className="text-center mt-6">Your cart is empty.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map((item) => {
          const isLoading = loadingIds.includes(item.id);

          return (
            <li
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center border rounded p-4 gap-3 opacity-90"
            >
              <div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={item.quantity <= 1 || isLoading}
                    onClick={() =>
                      addToCart(
                        { id: item.id, title: item.title, price: item.price },
                        -1
                      )
                    }
                  >
                    −
                  </Button>

                  <span className="w-8 text-center font-medium">
                    {isLoading ? "…" : item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() =>
                      addToCart(
                        { id: item.id, title: item.title, price: item.price },
                        1
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                disabled={isLoading}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
