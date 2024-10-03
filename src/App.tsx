import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react"; // Import useState
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

function App() {
  // const [products, setProducts] = useState([]); // State to hold the products

  useEffect(() => {
    // Subscribe to product additions
    const sub = client.subscriptions.onProductAdd().subscribe({
      next: (event) => {
        // const newProduct = event.data.onProductAdded;
        // console.log(newProduct);
        console.log(event);
      },
    });

    // Clean up subscription on unmount
    return () => sub.unsubscribe();
  }, []);

  const addProduct = async () => {
    try {
      const newProduct = {
        name: "New Product",
        price: 199.99,
        // Add other fields as needed, matching the schema
      };

      const result = await client.mutations.addProduct({
        name: newProduct.name,
        price: newProduct.price,
      });

      console.log("Product added successfully:", result);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <div>
            <h1>Product List</h1>
            <button onClick={addProduct}>Add Product</button>
            <ul>
              {/* {products.map((product, index) => (
                <li key={index}>{product.name}</li> // Assuming each product has a name
              ))} */}
            </ul>
            <button onClick={signOut}>Sign out</button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
