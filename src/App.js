import React, { useState } from "react";
import "./App.css";
import products from "../common/dummy";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useStore } from "shell/store";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "200px",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)",
  },
};

const listStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)", // 4 sütunlu grid
  gap: "48px", // Elemanlar arası boşluk
  padding: "24px",
  justifyContent: "center",
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "repeat(3, 1fr)", // Küçük ekranlarda 2 sütun
  },
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, 1fr)", // Küçük ekranlarda 2 sütun
  },
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(1, 1fr)", // Mobilde 1 sütun
  },
};

const ProductCard = (product) => {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleClick = (item, quantity) => {
    console.log("item", { ...item, quantity: quantity });
    addToCart({ ...item, quantity: quantity });
  };

  return (
    <Box sx={cardStyle}>
      <Typography variant="body1" fontWeight="bold">
        {product.product.name}
      </Typography>
      <Typography variant="body1" color="secondary">
        {product.product.price}
      </Typography>
      <TextField
        type="number"
        size="small"
        onChange={(e) => setQuantity(e.target.value)}
        defaultValue={1}
        sx={{ width: "80px", margin: "8px 0" }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleClick(product.product, quantity)}
      >
        Sepete Ekle
      </Button>
    </Box>
  );
};

const App = () => {
  return (
    <div>
      <Typography mb={4} variant="h6">
        This is your products micro.
      </Typography>
      <Box className="list" sx={listStyle}>
        {products.map((item) => {
          return <ProductCard product={item} />;
        })}
      </Box>
    </div>
  );
};

export default App;
