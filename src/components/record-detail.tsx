import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { StyledDialogHeader, StyledLoadingWrapper } from "./common-styled";
import { BookRecord, RecordDetailDialogProps } from "./types";

const RecordDetailDialog: FC<RecordDetailDialogProps> = ({
  recordId,
  handleClose,
}) => {
  const [record, setRecord] = useState<BookRecord | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /* 
      this is ofc. uneffiecient , its only here to mimic real world scenarios 
      where record alone can have big load of data so we should fetch it alone
      */
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const storedData = localStorage.getItem("library");
      if (storedData && recordId) {
        setRecord(
          (JSON.parse(storedData) as Record<string, BookRecord>)?.[recordId]
        );
      }
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [recordId]);

  const handleCloseDialog = () => {
    handleClose();
    setLoading(false);
    setRecord(null);
  };

  return (
    <Dialog
      open={!!recordId}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      {loading ? (
        <StyledLoadingWrapper sx={{ height: "20vh" }}>
          <CircularProgress />
        </StyledLoadingWrapper>
      ) : (
        <>
          {record ? (
            <>
              <StyledDialogHeader>
                <Typography variant="subtitle1" fontWeight={"bold"}>
                  {record.name}
                </Typography>
                <Typography variant="subtitle2">{`by ${
                  record.author || "unknown author"
                }`}</Typography>
              </StyledDialogHeader>
              <DialogContent dividers>
                <DialogContentText>
                  {record.description || "No description provided."}
                </DialogContentText>
              </DialogContent>
            </>
          ) : (
            "Unexpected error, not handled ..."
          )}
        </>
      )}
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close detail</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordDetailDialog;
