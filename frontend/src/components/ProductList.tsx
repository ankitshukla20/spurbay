import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Response {
  productsCount: number;
  products: Product[];
}

export default function ProductList() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get<Response>("/products", {
        params: { page: 1, size: 20 },
      });
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <>
      <div>Products</div>
      {data?.products.map((product) => (
        <Card key={product.id}>
          <CardActionArea>
            <CardMedia />
            <CardContent>
              <Typography> {product.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
}
