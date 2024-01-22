import { Button, Grid } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { FC, useEffect } from "react";
import * as yup from "yup";
import { useLibraryContext } from "../library-context";
import { generateRandomString } from "../utils";
import {
  StyledForm,
  StyledFormActionWrapper,
  StyledPaper,
  StyledTextField,
} from "./common-styled";
import { BookRecord } from "./types";

const initialValues: BookRecord = {
  id: "",
  name: "",
  author: "",
  description: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required."),
  description: yup.string().trim().max(300, "Max 300 chars allowed."),
});

const RecordForm: FC = () => {
  const { triggerRefetch } = useLibraryContext();

  const onSubmit = (
    values: BookRecord,
    formikHelpers: FormikHelpers<BookRecord>
  ) => {
    const loadedLibrary = localStorage.getItem("library");
    const id = generateRandomString(); // since we do not use db to generate this, this can serve as replacement

    if (loadedLibrary) {
      const loadedLibraryObject = JSON.parse(loadedLibrary);
      loadedLibraryObject[id] = { ...values, id };
      localStorage.setItem("library", JSON.stringify(loadedLibraryObject));
    } else {
      localStorage.setItem(
        "library",
        JSON.stringify({ [id]: { ...values, id } })
      );
    }
    localStorage.removeItem("form-values");
    formikHelpers.resetForm();
    triggerRefetch();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const storedFormValues = localStorage.getItem("form-values");
    if (storedFormValues) {
      formik.setValues(JSON.parse(storedFormValues), false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formik.dirty) {
      localStorage.setItem("form-values", JSON.stringify(formik.values));
    }
  }, [formik.dirty, formik.values]);

  return (
    <StyledPaper>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <StyledTextField
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={formik.errors.name}
              error={formik.touched.name && !!formik.errors.name}
              hasError={!!formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <StyledTextField
              id="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              helperText={formik.errors.author}
              error={formik.touched.author && !!formik.errors.author}
              hasError={!!formik.errors.author}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              id="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              helperText={formik.errors.description ?? "Max 300 chars."}
              error={formik.touched.description && !!formik.errors.description}
              hasError={!!formik.errors.description}
              multiline
              minRows={2}
              maxRows={6}
            />
          </Grid>
        </Grid>
        <StyledFormActionWrapper>
          <Button variant="outlined" type="submit">
            Add record
          </Button>
        </StyledFormActionWrapper>
      </StyledForm>
    </StyledPaper>
  );
};

export default RecordForm;
