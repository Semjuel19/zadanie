import { FC, useState } from "react";
import {
  StyledGridContainer,
  StyledGridItem,
} from "./components/common-styled";
import { withRecords } from "./components/hoc/with-records";
import RecordForm from "./components/record-form";
import RecordList from "./components/record-list";
import { LibraryContext } from "./library-context";

const commonGridProps = { xs: 12, sm: 12, md: 6, item: true };
const RecordListWithData = withRecords(RecordList);

const App: FC = () => {
  const [refetch, triggerRefetch] = useState(0);

  return (
    <LibraryContext.Provider
      value={{
        refetch,
        triggerRefetch: () => triggerRefetch((prevVal) => prevVal + 1),
      }}
    >
      <StyledGridContainer container spacing={2}>
        <StyledGridItem
          {...commonGridProps}
          sx={{ justifyContent: "end", height: "350px" }}
        >
          <RecordForm />
        </StyledGridItem>
        <StyledGridItem {...commonGridProps} sx={{ justifyContent: "start" }}>
          <RecordListWithData />
        </StyledGridItem>
      </StyledGridContainer>
    </LibraryContext.Provider>
  );
};

export default App;
