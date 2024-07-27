import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';

const ProductDetails = ({ product }) => {
  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <Container>
      <Typography variant="h3" component="h1">
        {product.title}
      </Typography>
      <Grid container spacing={2}>
        {product.images.map((image, index) => (
          <Grid item xs={12} md={6} key={index}>
            <img src={image} alt={product.title} style={{ width: '100%' }} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" component="h2">
        מחיר: {product.price} ₪
      </Typography>
      <Typography variant="h6" component="h3">
        עיר: {product.city}
      </Typography>
      <Button variant="contained" color="primary">
        התחל לשוחח עם המוכר
      </Button>
    </Container>
  );
};

export default ProductDetails;
