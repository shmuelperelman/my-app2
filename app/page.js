"use client"

import './Home.css';
// import Post1 from './utils/components/1/1';
// import AddProductForm from './utils/components/addProductForm/addProductForm';
import ProductsPage from './utils/components/mark/mark';
import Post from './utils/components/post/post';
// import RegistrationModal from './utils/components/registrationModal/registrationModal';
import FriendsSidebar from './utils/components/sidebar/FriendsSidebar';
import DarkMode from '@/app/utils/components/modeDark/modeDark';

export default function Home() {
  return (
    <>
      <Post />
      <FriendsSidebar />
      <ProductsPage/>
      <DarkMode/>
    
      {/* <RegistrationModal/> */}
      {/* <AddProductForm/> */}
      {/* <ChatBox/> */}
      
    </>
  );
}
