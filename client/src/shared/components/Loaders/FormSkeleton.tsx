import { Box, Grid, Skeleton, Stack } from "@mui/material";

const FormSkeleton = ({ numOfInputs = 6 }: { numOfInputs?: number }) => {
  const generateGridItems = (): JSX.Element[] => {
    const items: JSX.Element[] = [];
    for (let i = 0; i < numOfInputs; i++) {
      items.push(
        <Grid item key={i} xs={12} md={6} lg={4}>
          <Skeleton height={70} animation="wave" />
        </Grid>,
      );
    }
    return items;
  };

  return (
    <Box p={3}>
      <Grid container columnSpacing={3} rowSpacing={2}>
        {generateGridItems()}
      </Grid>
      <Stack direction="row" justifyContent={"end"} gap={1}>
        <Skeleton variant="text" animation="wave" width={120} height={70} />
      </Stack>
    </Box>
  );
};

export default FormSkeleton;
