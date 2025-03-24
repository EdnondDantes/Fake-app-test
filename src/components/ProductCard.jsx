import React, { useContext, memo } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const ProductCard = memo(({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: 'contain', padding: 2 }}
        image={product.image || '/placeholder.jpg'}
        alt={product.title?.substring(0, 20) || 'Product image'}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title || 'Unnamed Product'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${Number(product.price)?.toFixed(2) || '0.00'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(product)}>
          Добавить в корзину
        </Button>
      </CardActions>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;