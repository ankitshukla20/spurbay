import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AddProductForm } from "../../schemas/productSchema";

export default function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductForm>();

  const submitHandler = (data: AddProductForm) => {
    const sizesArray = data.sizes.split("\n");
    console.log({ ...data, sizes: sizesArray });
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
        Add New Product
      </Typography>
      <Paper
        variant="outlined"
        sx={{ my: 2, p: 3, borderRadius: 2 }}
        component="form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name")}
              fullWidth
              required
              label="Name"
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            />
            {errors.name && (
              <Typography variant="caption" color="error">
                {errors.name.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                {...register("category")}
                fullWidth
                labelId="category"
                label="Category"
                defaultValue=""
                sx={{ borderRadius: 3 }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item xs={12}>
            <Button sx={{ textTransform: "none" }} component="label">
              Select Images
              <input type="file" hidden />
            </Button>
          </Grid> */}

          <Grid item xs={12}>
            <TextField
              {...register("description")}
              fullWidth
              required
              label="Description"
              placeholder="Description"
              multiline
              minRows={5}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            />
            {errors.description && (
              <Typography variant="caption" color="error">
                {errors.description.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              {...register("sizes")}
              fullWidth
              label="Sizes (Optional)"
              placeholder="Enter sizes (one per line)"
              multiline
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            />
            {errors.sizes && (
              <Typography variant="caption" color="error">
                {errors.sizes.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              {...register("stock")}
              fullWidth
              label="Stock"
              defaultValue={0}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
              type="number"
            />
            {errors.stock && (
              <Typography variant="caption" color="error">
                {errors.stock.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              {...register("price")}
              fullWidth
              required
              label="Price"
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
              type="number"
            />
            {errors.price && (
              <Typography variant="caption" color="error">
                {errors.price.message}
              </Typography>
            )}
          </Grid>

          <Button
            disableElevation
            variant="contained"
            type="submit"
            sx={{ mx: 3, mt: 3, textTransform: "none", borderRadius: 3 }}
          >
            Save Product
          </Button>
        </Grid>
      </Paper>
    </>
  );
}
