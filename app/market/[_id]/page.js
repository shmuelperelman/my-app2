import { getProductById } from "@/utils/functions/apiCalls";
import { getCookie } from "cookies-next";
import Image from "next/image";

export default async function ProductPage({ params: { id } }) {
  const token = getCookie("token");
  const product = await getProductById(id, token);
  return (
    <div className="row">
      <div>
        <Image
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
          src={product.mainImg}
          alt={product.title}
        />
      </div>
      <div className="column">
        <h1>{product.title}</h1>
        <span>{product.price}₪</span>
        <p>{product.desc}</p>
      </div>
    </div>
  );
}
