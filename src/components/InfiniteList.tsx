import { Alert, CircularProgress, Grid, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { usePaginationFragment } from "react-relay";
import { Waypoint } from "react-waypoint";

const EmptyView: FC<{
  label: string;
}> = ({ label }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
    </Grid>
  );
};

const ErrorView: FC<{
  label: string;
}> = ({ label }) => {
  return <Alert severity="error">{label}</Alert>;
};

type RelayPaginationProps = Pick<
  ReturnType<typeof usePaginationFragment>,
  "hasNext" | "isLoadingNext" | "loadNext"
>;

export type InfiniteListProps<T> = {
  items?: ReadonlyArray<T> | null;
  itemRender: (item: T) => JSX.Element;
  itemKeyExtractor(item: T): string;
  errorLabel: string;
  emptyLabel: string;
} & RelayPaginationProps;

/**
 *
 * @returns A list wrapper that shows empty/error views for a list, as well as handle infinite scroll loading
 */
export const InfiniteList = <T,>(props: InfiniteListProps<T>): JSX.Element => {
  const {
    hasNext,
    isLoadingNext,
    loadNext,
    items,
    emptyLabel,
    errorLabel,
    itemKeyExtractor,
    itemRender,
  } = props;

  const loadNextPage = useCallback(() => {
    loadNext(10);
  }, [loadNext]);

  if (!items) {
    return <ErrorView label={errorLabel} />;
  }

  if (items.length === 0) {
    return <EmptyView label={emptyLabel} />;
  }

  return (
    <Grid container direction="column">
      {items.map((item) => (
        <Grid item key={itemKeyExtractor(item)}>
          {itemRender(item)}
        </Grid>
      ))}
      {hasNext && !isLoadingNext && <Waypoint onEnter={loadNextPage} />}
      {isLoadingNext && (
        <Grid item xs alignSelf="center">
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};
