"use client";
import NextLink from "next/link";
import axios from "@/plugins/api/axios";
import { useState, SyntheticEvent, useEffect } from "react";
import { SimpleDialogProps } from "@/types";
import { OwnerState } from "@/types/TicketType";
import { parseStartTime } from "@/utils/dateHandler";
import {
  Box,
  Tab,
  Tabs,
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

export function ParticipantInfo(props: {
  ticketCreatedAt: string;
  owner: OwnerState;
}) {
  const { name, mobile } = props.owner;
  const RowStyle = {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    my: 1.5,
    alignItems: "flex-start",
  };
  return (
    <>
      <Box sx={RowStyle}>
        <span style={{ display: "inline-block", width: 80, textAlign: "left" }}>
          姓名：
        </span>
        <span className="singleline-ellipsis">{name || ""}</span>
      </Box>
      <Box sx={RowStyle}>
        <span style={{ display: "inline-block", width: 80, textAlign: "left" }}>
          電話：
        </span>
        <span className="singleline-ellipsis">{mobile || ""}</span>
      </Box>
      <Box sx={RowStyle}>
        <span style={{ display: "inline-block", width: 80, textAlign: "left" }}>
          報名日期：
        </span>
        <span className="singleline-ellipsis">
          {parseStartTime(props.ticketCreatedAt)}
        </span>
      </Box>
    </>
  );
}

function ParticipantDialog(props: SimpleDialogProps) {
  const { organizer } = axios;
  const { data, onClose, open } = props;
  const [tagValue, setTagValue] = useState(0);
  const [participantList, setParticipantList] = useState([]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTagValue(newValue);
  };

  useEffect(() => {
    if (data && data._id) {
      organizer.getActivityParticipant(data._id).then((res: any) => {
        if (res.data) {
          console.log("res.data", res.data);
          setParticipantList(res.data);
        }
      });
    }
  }, [data, organizer]);
  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth maxWidth="sm">
      <DialogTitle>報名會員</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">活動標題: {data?.title || ""}</Typography>
        <Typography variant="body1">
          時間: {parseStartTime(data?.activityStartTime || "")}
        </Typography>
        <Typography variant="body1">
          當前報名者人數： {participantList.length || 0}
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tagValue} onChange={handleChange} aria-label="報導狀況">
            <Tab label="未報到" value={0} />
            <Tab label="已報到" value={1} />
          </Tabs>
        </Box>
        <Box>
          <Grid container spacing={1.5}>
            {participantList
              .filter((item: any) => item.ticketStatus === tagValue)
              .map((item: any) => (
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
                        {tagValue == 0 &&
                          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <Button
                              component={NextLink}
                              variant="contained"
                              size="small"
                              sx={{ mt: 2, marginBottom: "-8px" }}
                              href={`/organizer/scan/?id=${item._id}`}
                              target="_blank"
                            >
                              查看/驗票
                            </Button>
                          </Box>
                        }
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ParticipantDialog;
