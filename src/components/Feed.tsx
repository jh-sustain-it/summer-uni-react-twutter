import { Typography } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { FC, useCallback } from "react";
import { usePaginationFragment } from "react-relay";
import { ExtractNodeFromConnection } from "../utility-types";
import FeedRow from "./FeedRow";
import { InfiniteList } from "./InfiniteList";
import {
  Feed_query$data,
  Feed_query$key,
} from "./__generated__/Feed_query.graphql";

type Item = ExtractNodeFromConnection<Feed_query$data["posts"]>;

const Feed: FC<{
  feed: Feed_query$key;
}> = (props) => {
  const { feed: listRef } = props;

  const { data, ...pagination } = usePaginationFragment(
    graphql`
      fragment Feed_query on Query
      @refetchable(queryName: "FeedRefetchQuery")
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
      ) {
        posts(first: $first, after: $after) @connection(key: "Feed_posts") {
          edges {
            node {
              id
              ...FeedRow_post
            }
          }
        }
      }
    `,
    listRef
  );

  const itemKeyExtractor = useCallback((item: Item) => item.id.toString(), []);
  const itemRender = useCallback((item: Item) => <FeedRow post={item} />, []);

  if (!data) {
    return <Typography>No data</Typography>;
  }

  return (
    <InfiniteList
      {...pagination}
      emptyLabel={"No feed items"}
      errorLabel={"Error fetching feed"}
      items={data?.posts?.edges.map(({ node }) => node) ?? []}
      itemKeyExtractor={itemKeyExtractor}
      itemRender={itemRender}
    />
  );
};

export default Feed;
