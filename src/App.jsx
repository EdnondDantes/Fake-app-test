import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CircularProgress } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';

const Catalog = lazy(() => import('./pages/Catalog'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Каталог товаров
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Каталог
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Корзина
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Suspense fallback={<CircularProgress />}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Container>
    </>
  );
}

export default App;