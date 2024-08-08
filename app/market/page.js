import AddProduct from "@/utils/components/addProduct/addProduct";
import ProductsGrid from "@/utils/components/productsGrid/productsGrid";
import { getAllProducts } from "@/utils/functions/apiCalls";
import { cookies } from "next/headers";

export default async function MarketPage() {
  try {
    console.log("Fetching token from cookies...");
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    console.log("Token fetched:", token);

    if (!token) {
      throw new Error("No token found");
    }

    console.log("Fetching products...");
    const products = await getAllProducts(token);
    console.log("Products fetched:", products);

    return (
      <div>
        <ProductsGrid products={products} />
      </div>
    );
  } catch (error) {
    console.error("Error in MarketPage:", error);
    return (
      <div>
        <AddProduct />
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }
}
