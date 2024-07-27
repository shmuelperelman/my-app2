import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`} passHref>
      <Card component="a">
        <CardMedia
          component="img"
          height="140"
          image={product.images[0]} // נניח שיש לפחות תמונה אחת
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price} ₪
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.city}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
