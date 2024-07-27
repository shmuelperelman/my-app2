import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({ product }) => {
  return (
    <Link href={`/market/${product.id}`} className="product-item">
      <Image src={product.imageUrl} alt={product.name} width={200} height={200} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </Link>
  );
};

export default ProductItem;