export interface BookRecord {
  id: string;
  name: string;
  author: string;
  description: string;
}

export interface RecordListProps {
  list: Pick<BookRecord, "id" | "name">[];
  isLoading: boolean;
}

export interface RecordDetailDialogProps {
  recordId: string | null;
  handleClose: () => void;
}
