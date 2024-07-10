"use client";

import { Box, Typography, Grid, Paper, CardMedia, Chip } from "@mui/material";

import PeopleIcon from "@/components/icon/peopleIcon";
import TicketIcon from "@/components/icon/TicketIcon";
import { PaymentState } from "@/types/TicketType";
import CardBottomInfo from "@/components/ui/card/CardBottomInfo";
import useCardTheme from "@/components/ui/card/useCardTheme";

export const ticketStatuList = ["已報名", "活動進行中", "活動結束"];
/**
 * 票卷卡片
 * @param ticketItem 單一票卷資料
 */
function CardTicket({ ticketItem }: { ticketItem: PaymentState }) {
  const cardStyle = useCardTheme();
  return (
    <Paper sx={cardStyle.container}>
      {/* 上方 區塊 */}
      <Box sx={{ position: "relative" }}>
        <Box sx={cardStyle.topBg}>
          <CardMedia
            component="img"
            height="244"
            alt={ticketItem.title}
            image={ticketItem.activityImageUrl}
          />
        </Box>

        <Grid
          container
          sx={{
            ...cardStyle.topInfoTopRow,
            ...cardStyle.topInfoTopMainRow,
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            {/* 狀態 */}
            <Chip
              sx={{
                ...cardStyle.chip,
                mr: 2,
              }}
              label={ticketStatuList[ticketItem.ticketStatu || 0]}
            />
            {/* 票卷數量 */}
            <Chip
              sx={cardStyle.chip}
              label={
                <Box display="inline-flex" alignItems="center">
                  <TicketIcon sx={cardStyle.chipIcon} />
                  <Typography sx={cardStyle.chipText}>
                    {ticketItem.ticketTotal || 0}
                  </Typography>
                </Box>
              }
            />
          </Grid>

          {/* 參加人數 */}
          <Grid item>
            <Chip
              sx={cardStyle.chip}
              label={
                <Box display="inline-flex" alignItems="center">
                  <PeopleIcon sx={cardStyle.chipIcon} />
                  <Typography sx={cardStyle.chipText}>
                    {ticketItem.bookedCapacity || 0} /{" "}
                    {ticketItem.totalCapacity || 0}
                  </Typography>
                </Box>
              }
            />
          </Grid>
        </Grid>
      </Box>
      <CardBottomInfo row={2} info={ticketItem} />
    </Paper>
  );
}

export default CardTicket;
