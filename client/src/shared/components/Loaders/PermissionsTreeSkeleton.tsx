import { Skeleton, Box, Paper } from "@mui/material";
import i18next from "i18next";

const PermissionsTreeSkeleton = () => {
  const isArabic = i18next.language === "ar";

  return (
    <Box sx={{ width: "100%" }}>
      {[...Array(3)].map((_, moduleIndex) => (
        <Paper key={moduleIndex} sx={{ mb: 4, p: 2 }}>
          <Box display="flex" alignItems="center">
            <Skeleton
              variant="rectangular"
              width={24}
              height={24}
              sx={{ mr: isArabic ? 0 : 2, ml: isArabic ? 2 : 0 }}
            />
            <Skeleton variant="text" width={"100%"} height={30} />
          </Box>
          {[...Array(2)].map((_, entityIndex) => (
            <Box
              key={entityIndex}
              sx={{ ml: isArabic ? 0 : 2, mr: isArabic ? 2 : 0, mt: 2 }}
            >
              <Box display="flex" alignItems="center">
                <Skeleton
                  variant="rectangular"
                  width={24}
                  height={24}
                  sx={{ mr: isArabic ? 0 : 2, ml: isArabic ? 2 : 0 }}
                />
                <Skeleton variant="text" width={"95%"} height={25} />
              </Box>
              <Box sx={{ ml: isArabic ? 0 : 4, mr: isArabic ? 4 : 0, mt: 1 }}>
                {[...Array(3)].map((_, actionIndex) => (
                  <Box
                    key={actionIndex}
                    display="flex"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={24}
                      height={24}
                      sx={{ mr: isArabic ? 0 : 2, ml: isArabic ? 2 : 0 }}
                    />
                    <Skeleton variant="text" width={"90%"} height={20} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default PermissionsTreeSkeleton;
