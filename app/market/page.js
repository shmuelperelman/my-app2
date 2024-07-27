import ProductsGrid from "@/utils/components/productsGrid/productsGrid";
import { getAllProducts } from "@/utils/functions/apiCalls";
import { getCookie } from "cookies-next";

export default async function MarketPage() {
  const token = getCookie("token");
  console.log(token)
  const products = await getAllProducts(token);
  return (
    <div>
      <ProductsGrid products={products} />
    </div>
  );
}
