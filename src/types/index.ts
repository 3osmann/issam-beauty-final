export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  price: number;
  comparePrice: number | null;
  sku: string;
  quantity: number;
  isActive: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  brand: string | null;
  gender: string;
  tags: string[];
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: {
    id: string;
    url: string;
    alt: string | null;
    isPrimary: boolean;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string | null;
    user: {
      name: string | null;
      image: string | null;
    };
    createdAt: string;
  }[];
  createdAt: string;
}

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  children: CategoryType[];
  productCount?: number;
}

export interface OrderType {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    price: number;
    total: number;
    product: {
      name: string;
      slug: string;
      images: { url: string; isPrimary: boolean }[];
    };
  }[];
}

export interface UserType {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  phone: string | null;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
  productsChange: number;
  customersChange: number;
  recentOrders: OrderType[];
  revenueByMonth: { month: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
  topProducts: { name: string; revenue: number; quantity: number }[];
}
