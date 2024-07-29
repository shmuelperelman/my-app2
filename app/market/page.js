import ProductsGrid from "@/utils/components/productsGrid/productsGrid";
import { getAllProducts } from "@/utils/functions/apiCalls";
import { getCookie } from "cookies-next";

export default async function MarketPage() {
  try {
    console.log("Fetching token from cookies...");
    const token = getCookie("token");
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
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }
}
