import { BiTachometer, BiPackage } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import {GiAcorn } from "react-icons/gi";


import loungewear from "/images/loungewear.jpg";

export const SidebarData = [
  {
    icon: BiTachometer,
    heading: "Dashboard",
    link: "/admin"
  },
  {
    icon: AiOutlineShopping,
    heading: "Orders",
    link: "/admin/orders"

  },
  {
    icon: FaUsers,
    heading: "Customers",
    link: "/admin/customers"

  },
  {
    icon: BiPackage,
    heading: "Products",
    link: "/admin/products"

  },
  {
    icon: MdAccountCircle,
    heading: "Account",
  },
];

export const tableData = [
  {
      id: 1143155,
      product: "Acer Nitro 5",
      img: loungewear,
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: loungewear,
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: loungewear,
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
 
];
export const ordersData = [
  {
      product:"Acer Nitro 5",
      price: 200,
      discountedPrice: 785,
      quantity: 4,
    },
    {
      product:"Acer Nitro 5",
      price: 200,
      discountedPrice: 785,
      quantity: 10,
    },
    {
      product:"Acer Nitro 5",
      price: 200,
      discountedPrice: 785,
      quantity: 20,
    },
   
 
];
export const customersData = [
  {
    img: loungewear,
    firstName: "John ",
    lastName: "Smith",
    email: "john@gmail.com",
    phone: "+1 352 456",
    address: "18 Densmore Drive, Essex",
  },
  {
    img: loungewear,
    firstName: "John ",
    lastName: "Smith",
    email: "john@gmail.com",
    phone: "+1 352 456",
    address: "18 Densmore Drive, Essex",
  },
  {
    img: loungewear,
    firstName: "John ",
    lastName: "Smith",
    email: "john@gmail.com",
    phone: "+1 352 456",
    address: "18 Densmore Drive, Essex",
  },
  ]
export const productsData = [
  {
    img: loungewear,
    title: "iPhone 9 ",
    price: "590",
    stock: 34,
    brand: "Apple",
    category: "Smart Phones",
  },
  {
    img: loungewear,
    title: "iPhone 9 ",
    price: "590",
    stock: 34,
    brand: "Apple",
    category: "Smart Phones",
  },
  {
    img: loungewear,
    title: "iPhone 9 ",
    price: "590",
    stock: 34,
    brand: "Apple",
    category: "Smart Phones",
  },
  ]

export const cardsData = [
  {
    title: "Customers",
    number: "8,267",
    icon: FaUsers,
  },
  {
    title: "Total Orders",
    number: "200,521",
    icon: AiOutlineShoppingCart,
  },
  {
    title: "Products sold",
    number: "28, 543",
    icon: GiAcorn,
  },
  {
    title: "This Month",
    number: "$826.77",
    icon: BiDollar,
  },
  
];
