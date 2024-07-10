"use client";
import axios from "@/plugins/api/axios";
import { useState, useEffect } from "react";
import { SimpleDialogProps } from "@/types";
import { parseStartTime } from "@/utils/dateHandler";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { ParticipantInfo } from "./ParticipantDialog";
import NoData from "@/components/ui/shared/NoData";
import ReviewUserDialog from "@/components/ui/dialog/ReviewUserDialog";

function ParticipantReviewDialog(props: SimpleDialogProps) {
  const { organizer } = axios;
  const { data, onClose, open } = props;
  const [participantTotal, setParticipantTotal] = useState(0);
  const [participantList, setParticipantList] = useState([]);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const fetchData = () => {
    if (data?._id) {
      organizer.getActivityParticipant(data._id).then((res: any) => {
        if (res.data) {
          setParticipantTotal(res.data.length);
          const newParticipantList = res.data.filter(
            (item: any) => item.ticketStatus === 1,
          );
          setParticipantList(newParticipantList);
        }
      });
    }
  };
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDialog = (reload: boolean) => {
    setReviewDialogOpen(false);
    if (reload) fetchData();
  };

  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth maxWidth="sm">
      <DialogTitle>會員評價</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">活動標題: {data?.title || ""}</Typography>
        <Typography variant="body1">
          時間: {parseStartTime(data?.activityStartTime || "")}
        </Typography>
        <Typography variant="body1">
          已使用：{participantList.length || 0}人 | 報名者：
          {participantTotal || 0}人
        </Typography>
        <Box>
          <Grid
            container
            spacing={1.5}
            justifyContent={
              participantList.length === 0 ? "center" : "flex-start"
            }
          >
            {participantList.length === 0 ? (
              <NoData target="已使用票卷會員" sub={false} />
            ) : (
              <>
                {participantList.map((item: any) => (
                  <Grid key={item._id} item xs={12} sm={6}>
                    <Card sx={{ display: "flex" }}>
                      <Box display="flex">
                        <CardMedia
                          component="img"
                          sx={{
                            width: 110,
                            objectFit: item.owner.photo ? "cover" : "contain",
                          }}
                          image={
                            item.owner.photo
                              ? item.owner.photo
                              : "https://i.imgur.com/qokckjQ.png"
                          }
                          alt={item.owner.name}
                        />
                        <CardContent sx={{ flex: "1 0 auto", pb: 1 }}>
                          <ParticipantInfo
                            owner={item.owner}
                            ticketCreatedAt={item.ticketCreatedAt}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => setReviewDialogOpen(true)}
                            sx={{ mt: 2, float: "right", marginBottom: "-8px" }}
                          >
                            會員評論
                          </Button>
                        </CardContent>
                        <ReviewUserDialog
                          owner={item.owner}
                          ticketId={item._id}
                          ticketCreatedAt={item.ticketCreatedAt}
                          open={reviewDialogOpen}
                          onClose={closeDialog}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantReviewDialog;
