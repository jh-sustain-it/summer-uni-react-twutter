import AddReactionIcon from "@mui/icons-material/AddReaction";
import { Divider, Grid, IconButton, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { graphql } from "babel-plugin-relay/macro";
import { DateTime } from "luxon";
import { FC } from "react";
import { useFragment } from "react-relay";
import { FeedRow_post$key } from "./__generated__/FeedRow_post.graphql";

const FeedRow: FC<{
  post: FeedRow_post$key | null;
}> = (props) => {
  const { post: postRef } = props;
  const {
    palette: {
      text: { disabled: twutterHandleTextColor },
    },
    typography: { fontWeightBold },
  } = useTheme();

  const data = useFragment(
    graphql`
      fragment FeedRow_post on Post {
        text
        timestamp
        author {
          username
        }
      }
    `,
    postRef
  );
  if (!data) {
    return null;
  }

  const timestamp = DateTime.fromMillis(data.timestamp).toRelative();

  return (
    <Grid container sx={{ height: 200 }} flexDirection="column" spacing={2}>
      <Divider sx={{ ml: -1, mr: -3 }} />
      <Grid item container spacing={1}>
        <Grid item>
          <Typography sx={{ fontWeight: fontWeightBold }}>
            {data.author.username}
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ color: twutterHandleTextColor }}>
            @{data.author.username} -
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ color: twutterHandleTextColor }}>
            {timestamp}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>{data.text}</Typography>
      </Grid>
      <Grid item container>
        <Grid item sx={{ ml: -1 }}>
          <IconButton
            onClick={() => {
              console.log("TODO: Send reaction mutation to this awesome post");
            }}
          >
            <AddReactionIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FeedRow;
