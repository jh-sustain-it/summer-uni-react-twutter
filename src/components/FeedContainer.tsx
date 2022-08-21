import { CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import { graphql } from "babel-plugin-relay/macro";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import Feed from "./Feed";
import { FeedContainerQuery } from "./__generated__/FeedContainerQuery.graphql";

const Loading = () => {
  return (
    <Grid
      container
      flexDirection="column"
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography>Loading...</Typography>
      </Grid>
      <Grid>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

const FeedContainer = () => {
  const data = useLazyLoadQuery<FeedContainerQuery>(
    graphql`
      query FeedContainerQuery {
        ...Feed_query
      }
    `,
    {}
  );

  const {
    palette: { divider },
  } = useTheme();

  return (
    <Container
      maxWidth="xl"
      sx={{
        borderLeft: 1,
        borderRight: 1,
        borderColor: divider,
        pt: 2,
      }}
    >
      <Suspense fallback={<Loading />}>
        <Feed feed={data} />
      </Suspense>
    </Container>
  );
};

export default FeedContainer;
