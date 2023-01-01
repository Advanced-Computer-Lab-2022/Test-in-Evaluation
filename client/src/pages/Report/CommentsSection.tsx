import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Comment } from "./FollowUpModal";

type Props = {
    comments: Comment[];
    userId: string;
};
const CommentsSection = ({ comments, userId }: Props) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingInlineEnd: "0.5rem",
                overflow: "auto",
                maxHeight: "20rem",
            }}
        >
            {comments.map((comment) => {
                const isSender = comment.senderId === userId;
                return (
                    <Typography
                        key={comment._id}
                        sx={{
                            background: isSender
                                ? "linear-gradient(0deg, #006AFF 0%, #00B2FF 100%)"
                                : "lightgrey",
                            boxShadow: 1,
                            width: "max-content",
                            padding: "0.5rem",
                            borderRadius: isSender
                                ? "0.5rem 0.5rem 0 0.5rem"
                                : "0.5rem 0.5rem 0.5rem 0",
                            alignSelf: isSender ? "flex-end" : "flex-start",
                        }}
                    >
                        {comment.text}
                    </Typography>
                );
            })}
        </Box>
    );
};

export default CommentsSection;
