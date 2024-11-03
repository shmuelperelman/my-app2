import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptop, 
  faMobileAlt, 
  faHeadphones, 
  faTshirt, 
  faBook, 
  faUtensils,
  faSearch 
} from '@fortawesome/free-solid-svg-icons';
import { TextField, InputAdornment } from '@mui/material';

const categories = [
  { name: 'אלקטרוניקה', icon: faLaptop },
  { name: 'סמארטפונים', icon: faMobileAlt },
  { name: 'אודיו', icon: faHeadphones },
  { name: 'אופנה', icon: faTshirt },
  { name: 'ספרים', icon: faBook },
  { name: 'מטבח', icon: faUtensils },
];

const SidebarCategories = ({ selectedCategory, onSelectCategory, search, setSearch }) => {
  return (
    <div className="sidebar">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="חיפוש..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FontAwesomeIcon icon={faSearch} fixedWidth />
            </InputAdornment>
          ),
        }}
        className="search-input"
      />
      <h3>קטגוריות</h3>
      <ul>
        {categories.map((category) => (
          <li 
            key={category.name}
            className={selectedCategory === category.name ? 'active' : ''}
            onClick={() => onSelectCategory(category.name)}
          >
            <FontAwesomeIcon icon={category.icon} fixedWidth />
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCategories;