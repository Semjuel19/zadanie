import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import {
  StyledLoadingWrapper,
  StyledPaper,
  StyledRecordItem,
  StyledRecordItemsWrapper,
  StyledRecordListWrapper,
} from "./common-styled";
import RecordDetailDialog from "./record-detail";
import { RecordListProps } from "./types";

const RecordList: FC<RecordListProps> = ({ list, isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const closeDetailModal = () => {
    setSelectedRecordId(null);
  };

  return (
    <>
      <StyledPaper>
        {isLoading ? (
          <StyledLoadingWrapper>
            <CircularProgress />
          </StyledLoadingWrapper>
        ) : (
          <StyledRecordListWrapper>
            <TextField
              label="Search by name"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <StyledRecordItemsWrapper>
              {list
                .filter((item) =>
                  item.name.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((item) => (
                  <StyledRecordItem
                    onClick={() => setSelectedRecordId(item.id)}
                    key={item.id}
                  >
                    {item.name}
                  </StyledRecordItem>
                ))}
            </StyledRecordItemsWrapper>
          </StyledRecordListWrapper>
        )}
      </StyledPaper>
      <RecordDetailDialog
        handleClose={closeDetailModal}
        recordId={selectedRecordId}
      />
    </>
  );
};

export default RecordList;
