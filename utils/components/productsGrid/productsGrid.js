 "use client"
import { useState } from "react";
import "./productsGrid.css";
import Link from "next/link";
import { RemoveCircle } from "@mui/icons-material";
import Image from "next/image";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { deleteProduct } from "@/utils/functions/apiCalls";
import ToolsBar from "../toolsBar/toolsBar";
import { getCookie } from "cookies-next";
import SidebarCategories from "../SidebarCategories/SidebarCategories";

export default function ProductsGrid({ products }) {
  const [productsToDisplay, setProductsToDisplay] = useState(products);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = productsToDisplay
    .filter((p) => {
      const title = p?.title?.toLowerCase() || '';
      const searchTerm = search.toLowerCase();
      return title.includes(searchTerm);
    })
    .filter((p) => !selectedCategory || p?.category === selectedCategory)
    .sort((a, b) => sortProducts(a, b, sortBy));

  const productsToShow = filteredProducts.map((product) => (
    <GridItem
      key={product._id}
      item={product}
      setSelectedProduct={setSelectedProduct}
    />
  ));

  return (
    <div className="page-container">
      <SidebarCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
      />
      <div className="main-content">
        <ToolsBar sortBy={sortBy} setSortBy={setSortBy} />
        <div className="grid">
          {productsToShow.length > 0 ? productsToShow : <p>לא נמצאו מוצרים</p>}
        </div>
      </div>
      {selectedProduct && (
        <Dialog open={selectedProduct} onClose={() => setSelectedProduct(null)}>
          <DialogTitle>
            {`האם אתה בטוח שברצונך למחוק את ${selectedProduct.title}?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setSelectedProduct(null)}>לא</Button>
            <Button
              onClick={async () => {
                const token = getCookie('token');
                await deleteProduct(selectedProduct._id, token);
                setProductsToDisplay((prev) =>
                  prev.filter((p) => p._id !== selectedProduct._id)
                );
                setSelectedProduct(null);
              }}
            >
              כן
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
function GridItem({ item, setSelectedProduct }) {
  return (
    <Link href={`/market/${item._id}`} className="grid-item">
      <Image
        src={item.imageUrl || '/placeholder-image.jpg'} 
        alt={item.name || 'Product Image'}
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
        loading="lazy"
      />
      <div>
        <h2>{item.name || 'Unnamed Product'}</h2> 
        <p>{item.price || 'Price not available'}</p>
        <p>{item.description || 'No description available'}</p>
      </div>
      <Button
        className="remove"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelectedProduct(item);
        }}
      >
        <RemoveCircle />
      </Button>
    </Link>
  );
}

// Make sure this function is defined
function sortProducts(a, b, sortBy) {
  // Implement your sorting logic here
  // For example:
  if (sortBy === 1) {
    return (a.price || 0) - (b.price || 0);
  } else if (sortBy === 2) {
    return (b.price || 0) - (a.price || 0);
  }
  return 0;
}