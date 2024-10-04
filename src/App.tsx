import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

function App() {
  const [productNameInput, setProductNameInput] = useState(""); // State for product name input (string)
  const [productList, setProductList] = useState<string[]>([]); // State for the list of products (array)

  useEffect(() => {
    // Subscribe to product additions
    const sub = client.subscriptions.onProductAdd().subscribe({
      next: (event: any) => {
        const newProduct = event.product; // Assuming product is an array of strings
        console.log(newProduct);
        setProductList(newProduct); // Update the product lists
        console.log(event);
      },
      error: (error) => console.error("Subscription error:", error),
    });

    // Clean up subscription on unmount
    return () => sub.unsubscribe();
  }, []);

  const addProduct = async () => {
    try {
      // Create new product using the value from the input field
      const result = await client.mutations.addProduct({
        name: productNameInput,
        price: 199.99,
      });

      console.log("Product added successfully:", result);

      // Optionally, reset the input after adding the product
      setProductNameInput("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <div>
            <h1>User {user?.signInDetails?.loginId}</h1>
            <h1>Product List</h1>
            <input
              type="text"
              placeholder="Product name"
              value={productNameInput} // Bind input value to state (string)
              onChange={(e) => setProductNameInput(e.target.value)} // Update the input state
            />
            <button onClick={addProduct}>Add Product</button>

            <ul>
              {productList?.map((product, index) => (
                <li key={index}>{product}</li> // Display the list of products
              ))}
            </ul>

            <button onClick={signOut}>Sign out</button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
