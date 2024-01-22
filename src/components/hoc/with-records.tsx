import { FC, useEffect, useState } from "react";
import { useLibraryContext } from "../../library-context";
import { BookRecord, RecordListProps } from "../types";

export const withRecords = (Component: FC<RecordListProps>) => {
  return () => {
    const [data, setData] = useState<Pick<BookRecord, "id" | "name">[]>([]);
    const [loading, setLoading] = useState(false);

    const { refetch } = useLibraryContext();

    useEffect(() => {
      // simulating some kind of async beahviour
      setLoading(true);
      const timeoutId = setTimeout(() => {
        const storedData = localStorage.getItem("library");
        if (storedData) {
          setData(
            Object.values(
              JSON.parse(storedData) as Record<string, BookRecord>
            ).sort((a, b) => a.name.localeCompare(b.name))
          );
        }
        setLoading(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch]);

    return <Component list={data} isLoading={loading} />;
  };
};
