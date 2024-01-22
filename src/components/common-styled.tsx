import { Box, Grid, Paper, TextField, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: `calc(100vh - ${theme.spacing(8)})`,
  minWidth: "250px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "75%",
  },
}));

export const StyledForm = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
}));

export const StyledGridItem = styled(Grid)(() => ({
  display: "flex",
}));

export const StyledGridContainer = styled(StyledGridItem)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const StyledFormActionWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row-reverse",
}));

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  width: "100%",
  "& .MuiFormHelperText-root": {
    ...(hasError ? { color: theme.palette.error.main } : {}),
  },
  "& .MuiFormLabel-root": {
    ...(hasError ? { color: theme.palette.error.main } : {}),
  },
  "& .MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      ...(hasError ? { borderColor: theme.palette.error.main } : {}),
    },
  },
}));

export const StyledLoadingWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledRecordListWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledDialogHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const StyledRecordItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "2px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  ":hover": {
    borderColor: theme.palette.secondary.main,
  },
}));

export const StyledRecordItemsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "scroll",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));
