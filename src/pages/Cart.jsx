import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCost, clearCart } = useContext(CartContext);

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Корзина</Typography>
      {cartItems.length === 0 ? (
        <Typography>Ваша корзина пуста</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map(item => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 151, objectFit: 'contain', padding: 1 }}
                    image={item.image}
                    alt={item.title}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography component="div" variant="h6">
                        {item.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Цена: ${item.price} x {item.quantity}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Сумма: ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
                      <Button variant="contained" color="error" onClick={() => removeFromCart(item.id)}>
                        Удалить
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 4, textAlign: 'right' }}>
            <Typography variant="h5">Общая сумма: ${getTotalCost().toFixed(2)}</Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={clearCart}>
              Очистить корзину
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default Cart;
