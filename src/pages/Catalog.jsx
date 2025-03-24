import React, { useState, useMemo, useEffect } from 'react';
import { Grid, TextField, MenuItem, CircularProgress, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

const Catalog = () => {
  const { products, categories, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const displayProducts = useMemo(() => {
    try {
      let filtered = products;
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      if (debouncedQuery) {
        filtered = filtered.filter(product =>
          product.title?.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
      }
      return filtered;
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  }, [products, debouncedQuery, selectedCategory]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Ошибка загрузки товаров</Typography>;

  return (
    <div>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Поиск товаров"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            error={!!error}
            helperText={error ? 'Ошибка фильтрации' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Фильтр по категории"
            variant="outlined"
            fullWidth
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">Все категории</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category || 'Unknown Category'}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {displayProducts.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              Товары не найдены
            </Typography>
          </Grid>
        ) : (
          displayProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Catalog;