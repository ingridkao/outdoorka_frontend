"use client";

import { useState, useEffect, SyntheticEvent } from "react";
import NextLink from "next/link";
import { PaymentState } from "@/types/TicketType";
import axios from "@/plugins/api/axios";
import { parstTicketStatus, sortTimeData } from "@/utils/dateHandler";

import {
  Box,
  Paper,
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PageLayout from "@/components/layout/MainLayout/PageLayout";
import CardTicket, { ticketStatuList } from "@/components/ui/card/CardTicket";
import CircularLoading from "@/components/ui/loading/CircularLoading";
import NoData from "@/components/ui/shared/NoData";
import SortIcon from "@/components/icon/SortIcon";
import ListSearchHeader from "@/components/ui/shared/ListSearchHeader";

function Tickets() {
  const theme = useTheme();
  const { ticket } = axios;
  const [load, setLoad] = useState(true);
  const [source, setSource] = useState<PaymentState[]>([]);
  const [displayList, setDisplayList] = useState<PaymentState[]>([]);
  const [sortValue, setSortValue] = useState("");
  const [ascValue, setAscValue] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState<number | null>(null);

  const updateDisplayStatus = (type: number | null = null) => {
    setFilterStatus(type);
    if (type === null) {
      setDisplayList(source);
    } else {
      const filterList = source.filter(
        (ticketItem: PaymentState) => ticketItem.ticketStatu === type,
      );
      setDisplayList(filterList);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  const handleSort = (event: SyntheticEvent) => {
    event.preventDefault();
    setAscValue(!ascValue);
    let filterList = [];
    if (sortValue === "activityStartTime" || sortValue === "activityEndTime") {
      filterList = sortTimeData(source, sortValue, ascValue);
    } else {
      filterList = source.sort((a: any, b: any) => {
        return ascValue
          ? a[sortValue] - b[sortValue]
          : b[sortValue] - a[sortValue];
      });
    }
    setDisplayList(filterList);
  };

  const handleSearchChange = (searchInput: string) => {
    setSearchValue(searchInput);
    if (searchInput === "") {
      setDisplayList(source);
    } else {
      const filterList = source.filter((ticketItem: PaymentState) => {
        return ticketItem.title.includes(searchInput);
      });
      setDisplayList(filterList);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const responseBody = await ticket.getPaymentList();
        setLoad(true);
        if (responseBody && responseBody.data) {
          const parseData = responseBody.data.map(
            (ticketItem: PaymentState) => {
              return {
                ...ticketItem,
                ticketStatu: parstTicketStatus(
                  ticketItem.activityStartTime,
                  ticketItem.activityEndTime,
                ),
              };
            },
          );
          setSource(parseData);
          setDisplayList(parseData);
        }
        setLoad(false);
      } catch (error: any) {
        if (error?.status == 404) {
          setSource([]);
        } else {
          console.error(String(error?.message));
        }
      }
    }
    loadData();
  }, []);

  if (load) return <CircularLoading />;

  return (
    <PageLayout>
      <Grid container sx={{ width: "100%", m: "auto", gap: 5 }}>
        <Grid
          sx={{
            display: { xs: "none", lg: "block" },
            minWidth: "320px",
          }}
        >
          <Box
            width="100%"
            display="inline-flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              篩選條件
            </Typography>
            {filterStatus !== null && (
              <Button
                variant="contained"
                color="tertiary"
                size="small"
                sx={{ borderRadius: 4 }}
                onClick={() => updateDisplayStatus(null)}
              >
                <DeleteOutlineIcon />
                <span>清除篩選</span>
              </Button>
            )}
          </Box>
          <Paper
            variant="elevation"
            square={false}
            sx={{
              minWidth: 15,
              mt: 3,
              p: 3,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
              }}
            >
              票卷類型
            </Typography>

            {ticketStatuList.map((statuItem, statuIndex) => (
              <Button
                key={statuIndex}
                variant="outlined"
                size="small"
                color={filterStatus === 0 ? "secondary" : "primary"}
                sx={{ mr: 1, borderRadius: 6 }}
                onClick={() => updateDisplayStatus(statuIndex)}
              >
                {statuItem}
              </Button>
            ))}
          </Paper>
        </Grid>

        <Grid xs sx={{ maxWidth: "1440px" }}>
          <ListSearchHeader
            title={"票卷列表"}
            subTitle={"你的票卷清單已準備好囉！"}
            search={searchValue}
            onSearch={handleSearchChange}
          />

          <Box
            width="100%"
            display="inline-flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box>
              排序方法：
              <Select
                defaultValue={"activityStartTime"}
                onChange={handleSelectChange}
                sx={{ borderRadius: 8 }}
              >
                <MenuItem value={"activityStartTime"}>活動開始日期</MenuItem>
                <MenuItem value={"activityEndTime"}>活動結束日期</MenuItem>
                <MenuItem value={"bookedCapacity"}>參與人數</MenuItem>
              </Select>
            </Box>
            <IconButton aria-label="排序" onClick={handleSort}>
              <SortIcon />
            </IconButton>
          </Box>

          <Box sx={{ mt: 2 }}>
            {displayList.length === 0 && <NoData target="票卷" sub={true} />}

            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 0, sm: 1, md: 5 }}
              justifyContent="flex-start"
            >
              {displayList?.map((value: PaymentState) => (
                <Grid key={value.paymentId} xs={12} sm={6} md={4}>
                  <Box component={NextLink} href={`/ticket/${value.paymentId}`}>
                    <CardTicket ticketItem={value} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Tickets;
