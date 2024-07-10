"use client";
import React, { ChangeEvent, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "@/plugins/api/axios";
import DOMPurify from "dompurify";
import OrganizerLayout from "@/components/layout/OrganizerLayout/OrganizerLayout";
import { NUMBER_ONLY_REGEX, URL_REGEX } from "@/utils/regexHandler";
import * as dayjs from "dayjs";
import {
  decodeContent,
  escapeContent,
  getFirebaseFileName,
} from "@/utils/common";
import CircularLoading from "@/components/ui/loading/CircularLoading";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Autocomplete,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Alert,
  AlertTitle,
  Tabs,
  Tab,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { ICreateActivity, RootState } from "@/types";
import { OgAuthState } from "@/types/AuthType";
import { ActivityTag, City } from "@/types/enum/activity";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//  Editor 使用 dynamic import
const Editor = dynamic(
  () => {
    return import("@/components/layout/editor/Editor");
  },
  { ssr: false },
);

// Initial activity data
const activityInitData: ICreateActivity = {
  title: "",
  subtitle: "",
  price: 0,
  totalCapacity: 0,
  city: City.Taipei,
  address: "",
  location: "",
  activityDetail: "",
  activityNotice: "",
  activityTags: [],
  activityLinks: [
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
  ],
  activityImageUrls: [],
  isPublish: false,
  activitySignupStartTime: null,
  activitySignupEndTime: null,
  activityStartTime: null,
  activityEndTime: null,
};
// City Select options
const citySelect = Object.keys(City).map((key) => ({
  value: key,
  label: City[key as keyof typeof City],
}));
// 活動 Tag options
const activitySelectTags = Object.keys(ActivityTag).map((key) => ({
  title: ActivityTag[key as keyof typeof ActivityTag],
  value: key,
}));

function ActivityCreate({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { organizer } = axios;

  const quillRef = useRef<any>(null);

  const [initLoading, setInitLoading] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [checkCanEdit, setCheckCanEdit] = React.useState<boolean>(false);

  const [ogInfo, setOgInfo] = React.useState<OgAuthState>({
    profile: null,
    token: null,
    error: null,
  });

  const [activityId, setActivityId] = React.useState<string>("");
  const [activityData, setActivityData] =
    React.useState<ICreateActivity>(activityInitData);
  const [tags, setTags] = React.useState<any[]>([]);
  const [tempLinks, setTempLinks] = React.useState<any[]>(
    activityData.activityLinks,
  );
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [formValid, setFormValid] = React.useState<Record<any, string>>({});
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [submitResult, setSubmitResult] = React.useState<any>({
    isSuccess: false,
    message: "",
  });

  // Get ogAuth from redux
  const ogAuth = useSelector((state: RootState) => state.ogAuth);

  useEffect(() => {
    if (ogAuth?.profile && ogAuth?.profile.name) {
      setOgInfo({
        profile: ogAuth.profile,
        token: null,
        error: null,
      });
    }
  }, [ogAuth]);

  useEffect(() => {
    if (params.id) {
      // 取得活動資料，並初始化
      organizer
        .getActivityById(params.id)
        .then((res: any) => {
          if (res.data._id) {
            const getData = {
              title: res.data.title,
              subtitle: res.data.subtitle,
              price: res.data.price,
              totalCapacity: res.data.totalCapacity,
              city: res.data.city,
              address: res.data.address,
              location: res.data.location,
              activityDetail: decodeContent(res.data.activityDetail),
              activityNotice: res.data.activityNotice,
              activityTags: res.data.activityTags,
              activityLinks: res.data.activityLinks,
              activityImageUrls: res.data.activityImageUrls,
              isPublish: res.data.isPublish,
              activitySignupStartTime: dayjs.default(
                res.data.activitySignupStartTime,
              ),
              activitySignupEndTime: dayjs.default(
                res.data.activitySignupEndTime,
              ),
              activityStartTime: dayjs.default(res.data.activityStartTime),
              activityEndTime: dayjs.default(res.data.activityEndTime),
            };

            // 取得活動標籤
            const getTags = getData.activityTags.map((tag: string) => {
              const findTag = activitySelectTags.find(
                (data) => data.value === tag,
              );
              return findTag;
            });

            // 取得活動連結，並補足至 3 個
            const linkArray = [
              ...getData.activityLinks,
              ...Array.from({
                length: Math.max(0, 3 - getData.activityLinks.length),
              }).map(() => ({ name: "", url: "" })),
            ];

            // 活動開始時間與現在時間相差 2 天以上，或是活動未發佈，則可以編輯
            // const activityStartTime = dayjs.default(getData.activityStartTime);
            // const now = dayjs.default();
            // const diffInDays = activityStartTime.diff(now, "day");

            if (!getData.isPublish) {
              setActivityId(res.data._id);
              setTags(getTags);
              setTempLinks(linkArray);
              setImageUrls(getData.activityImageUrls);
              setActivityData(getData);
              setCheckCanEdit(true);
            }
          }
        })
        .finally(() => {
          setInitLoading(false);
        });
    }
  }, [organizer, params.id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // 活動費用只能輸入數字
    if (name === "price" && !NUMBER_ONLY_REGEX.test(value)) {
      return;
    }

    // 活動人數只能輸入數字
    if (name === "totalCapacity" && !NUMBER_ONLY_REGEX.test(value)) {
      return;
    }

    setActivityData((preData) => ({
      ...preData,
      [e.target.name]: value,
    }));
  };

  const handleLinkInputChange = (idx: number, targetName: "name" | "url") => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setTempLinks((preData) => {
        preData[idx][targetName] = event.target.value;
        return [...preData];
      });
    };
  };

  const handleLinkInputClean = (idx: number) => () => {
    tempLinks[idx].name = "";
    tempLinks[idx].url = "";
    setActivityData((preData) => ({
      ...preData,
      ...tempLinks,
    }));
  };

  const handleSelectTagChange = (e: React.SyntheticEvent, newValue: any[]) => {
    setTags(newValue);
  };

  const handleSelectCityChange = (event: SelectChangeEvent) => {
    if (event.target.name === "citySelect") {
      setActivityData((preData) => ({
        ...preData,
        city: event.target.value as City,
      }));
    }
  };

  const handleDateTimeChange = (name: string) => (newValue: any) => {
    setActivityData((preData) => ({
      ...preData,
      [name]: newValue,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files || imageUrls.length >= 5) {
      return;
    }

    if (event.target.files[0]) {
      const getFile = event.target.files[0];
      const maxSize = 1024 * 1024 * 2; // 2 MB

      if (getFile.size > maxSize) {
        console.error("Image size cannot exceed 2 MB");
        setSubmitResult({
          isSuccess: false,
          message: "上傳圖片大小不可超過 2 MB",
        });
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(getFile.type)) {
        console.error("只允許 JPG, PNG, and GIF images are allowed");
        setSubmitResult({
          isSuccess: false,
          message: "圖片格式只允許 JPG, PNG, GIF",
        });
        return;
      }

      const formData = new FormData();
      formData.append("image", event.target.files[0]);

      organizer
        .imageUpload(formData)
        .then((res: any) => {
          if (res.data?.url) {
            setImageUrls((preImageUrls) => [...preImageUrls, res.data.url]);
          }
        })
        .catch((err: any) => {
          console.error("imageUpload", err);
        });
    } else {
      console.error("No file selected");
    }
  };

  const handleTempImageDelete = (index: number) => () => {
    // Delete image from firebase
    const fileNam = getFirebaseFileName(imageUrls[index]);
    organizer
      .imageDelete(fileNam)
      .then((res: any) => {
        console.log("imageDelete", res);
      })
      .catch((err: any) => {
        console.error("imageDelete", err);
      });

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const handleSubmit = (isPublish: boolean) => (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    setFormValid({});
    activityData.activityTags = tags.map((tag) => tag.value);
    activityData.price = Number(activityData.price);
    activityData.totalCapacity = Number(activityData.totalCapacity);
    activityData.activityLinks = tempLinks.filter(
      (link) => link.name && URL_REGEX.test(link.url),
    );
    activityData.activityImageUrls = imageUrls.filter((url) =>
      URL_REGEX.test(url),
    );

    activityData.isPublish = isPublish;

    let isValid = false;

    for (const key in activityData) {
      if (key === "activityImageUrls" || key === "activityDetail") {
        continue;
      }

      if (key === "activityTags" && activityData.activityTags.length === 0) {
        isValid = true;
        setFormValid((prev) => ({
          ...prev,
          activityTags: "請選擇活動標籤",
        }));
        continue;
      }

      if (
        activityData[key as keyof ICreateActivity] === "" ||
        activityData[key as keyof ICreateActivity] === 0
      ) {
        isValid = true;
        setFormValid((prev) => ({
          ...prev,
          [key]: "請確認此欄位內容",
        }));
      }
    }

    if (
      quillRef.current?.getEditor().getLength() < 5 ||
      quillRef.current?.getEditor().getLength() > 1500
    ) {
      isValid = true;
      setFormValid((prev) => ({
        ...prev,
        activityDetail: "請填寫完整活動內容，最多 1500 字",
      }));
    }

    // 處理活動內容 XSS
    const getCleanContent = DOMPurify.sanitize(
      quillRef.current?.getEditor().root.innerHTML,
    );
    activityData.activityDetail = escapeContent(getCleanContent);

    let errorMessages = "未正確填寫內容，請確認以上欄位內容";
    if (isValid) {
      setSubmitResult({
        isSuccess: false,
        message: errorMessages,
      });
      setIsLoading(false);
      return;
    }

    errorMessages = "儲存失敗，請再確認以上欄位後再次嚐試";
    organizer
      .updateActivity(activityData, activityId)
      .then((res: any) => {
        if (res.data?._id) {
          setSubmitResult({
            isSuccess: true,
            message: "更新成功",
          });

          setTimeout(() => {
            router.push("/organizer/activity");
          }, 300);
        } else {
          if (res.error) {
            try {
              const error = JSON.parse(res.error);
              if (Array.isArray(error)) {
                errorMessages = error
                  .map((data: any) => Object.values(data)[0])
                  .join("\n");
              }
            } catch (error) {
              if (typeof res.error === "string") {
                errorMessages = res.error;
              }
            }
          }

          setSubmitResult({
            isSuccess: false,
            message: errorMessages,
          });
          setIsLoading(false);
        }
      })
      .catch((err: any) => {
        console.error("createActivity", err);
        setSubmitResult({
          isSuccess: false,
          message: errorMessages,
        });
        setIsLoading(false);
      });
  };

  const renderSelectOption = (props: any, option: any, { selected }: any) => {
    const { key, ...rest } = props;
    console.info("key", key);
    return (
      <li key={option.value} {...rest}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.title}
      </li>
    );
  };

  if (initLoading) {
    return (
      <OrganizerLayout>
        <CircularLoading />
      </OrganizerLayout>
    );
  }

  if (!checkCanEdit) {
    return (
      <OrganizerLayout>
        <Alert severity="error">
          <AlertTitle>該活動無法進行編輯。</AlertTitle>
          有任何問題請聯繫管理人員。
        </Alert>
      </OrganizerLayout>
    );
  }

  return (
    <OrganizerLayout>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "36px" }}
      >
        <Tabs value={0}>
          <Tab label="活動編輯" value={0} />
        </Tabs>
      </Box>

      <FormControl>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              disabled
              label="活動舉辦方名稱"
              variant="outlined"
              margin="normal"
              fullWidth
              value={ogInfo?.profile?.name || ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              name="title"
              label="活動主標題"
              variant="outlined"
              margin="normal"
              fullWidth
              error={formValid.title ? true : false}
              helperText={formValid.title}
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 100 }}
              onChange={handleInputChange}
              value={activityData.title}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              name="subtitle"
              label="活動副標題"
              variant="outlined"
              margin="normal"
              fullWidth
              error={formValid.subtitle ? true : false}
              helperText={formValid.subtitle}
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 100 }}
              onChange={handleInputChange}
              value={activityData.subtitle}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              name="price"
              label="活動費用"
              variant="outlined"
              margin="normal"
              fullWidth
              error={formValid.price ? true : false}
              helperText={formValid.price}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              value={activityData.price}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="tags-standard"
              fullWidth
              options={activitySelectTags}
              getOptionLabel={(option) => option.title}
              value={tags}
              onChange={handleSelectTagChange}
              renderOption={renderSelectOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="活動標籤"
                  InputLabelProps={{ shrink: true }}
                  error={formValid.activityTags ? true : false}
                  helperText={formValid.activityTags}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              name="totalCapacity"
              label="活動人數"
              variant="outlined"
              margin="normal"
              fullWidth
              error={formValid.totalCapacity ? true : false}
              helperText={formValid.totalCapacity}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              value={activityData.totalCapacity}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={1} mb={1}>
              活動地點
            </Typography>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                name="citySelect"
                value={activityData.city}
                label="City"
                onChange={handleSelectCityChange}
              >
                {citySelect.map((city) => (
                  <MenuItem key={city.value} value={city.label}>
                    {city.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              name="address"
              label="活動詳細地址"
              variant="outlined"
              margin="normal"
              fullWidth
              error={formValid.address ? true : false}
              helperText={formValid.address}
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 100 }}
              onChange={handleInputChange}
              value={activityData.address}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              name="location"
              label="集合地點"
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              fullWidth
              error={formValid.location ? true : false}
              helperText={formValid.location}
              InputLabelProps={{ shrink: true }}
              inputProps={{ maxLength: 100 }}
              onChange={handleInputChange}
              value={activityData.location}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={1} mb={1}>
              活動時間
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="活動開始時間"
                  ampm={false}
                  value={activityData.activityStartTime}
                  name="activityStartTime"
                  onChange={handleDateTimeChange("activityStartTime")}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DateTimePicker"]}
                sx={{ marginTop: "6px" }}
              >
                <DateTimePicker
                  label="活動結束時間"
                  ampm={false}
                  value={activityData.activityEndTime}
                  onChange={handleDateTimeChange("activityEndTime")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={0}>
              活動報名時間
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="活動報名起始日"
                  ampm={false}
                  value={activityData.activitySignupStartTime}
                  onChange={handleDateTimeChange("activitySignupStartTime")}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DateTimePicker"]}
                sx={{ marginTop: "6px" }}
              >
                <DateTimePicker
                  label="活動報名截止日"
                  ampm={false}
                  value={activityData.activitySignupEndTime}
                  onChange={handleDateTimeChange("activitySignupEndTime")}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={0}>
              相關連結
            </Typography>
            <List>
              {tempLinks.map((link, index) => (
                <ListItem
                  key={`activityLink-${index}`}
                  sx={{ padding: 0 }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleLinkInputClean(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <TextField
                    required
                    name={`activityLinkName-${index}`}
                    label="名稱"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "35%", marginRight: "10px" }}
                    onChange={handleLinkInputChange(index, "name")}
                    value={link.name}
                  />
                  <TextField
                    required
                    name={`activityLinkUrl-${index}`}
                    label="Url"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleLinkInputChange(index, "url")}
                    value={link.url}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Editor
              content={activityData.activityDetail}
              refs={quillRef}
              error={formValid.activityDetail ? true : false}
              helperText={formValid.activityDetail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="activityNotice"
              label="活動注意事項"
              variant="outlined"
              margin="normal"
              multiline
              rows={5}
              fullWidth
              error={formValid.activityNotice ? true : false}
              helperText={formValid.activityNotice}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              value={activityData.activityNotice}
            />
          </Grid>

          <Grid item xs={12} mt={3} mb={3}>
            <Grid container spacing={3} alignItems="center">
              <Grid xs={2} sx={{ marginBottom: "16px" }}>
                <Typography mt={0}>上傳圖片 {imageUrls.length} / 5</Typography>
              </Grid>
              <Grid xs={1} sx={{ marginBottom: "16px" }}>
                <IconButton
                  color="success"
                  aria-label="add image"
                  size="large"
                  onClick={() => hiddenFileInput.current!.click()}
                  disabled={imageUrls.length >= 5 || isLoading}
                >
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {imageUrls.map((url, index) => (
                <Grid key={url} xs={4} sx={{ marginBottom: "16px" }}>
                  <Box sx={{ position: "relative" }}>
                    <IconButton
                      color="warning"
                      aria-label="add image"
                      size="large"
                      onClick={handleTempImageDelete(index)}
                      sx={{
                        position: "absolute",
                        top: "0",
                        right: "12px",
                      }}
                    >
                      <DeleteForeverIcon fontSize="large" />
                    </IconButton>
                    <Box
                      component="img"
                      src={url}
                      alt="activity image"
                      loading="lazy"
                      sx={{ width: "95%" }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <input
              type="file"
              hidden
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </Grid>
        </Grid>
      </FormControl>

      {submitResult.isSuccess && submitResult.message && (
        <Alert severity="success">{submitResult.message}</Alert>
      )}

      {!submitResult.isSuccess && submitResult.message && (
        <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>
          {submitResult.message}
        </Alert>
      )}

      <Grid container spacing={5} justifyContent="flex-end" mt={5} mb={5}>
        <Grid xs={3}>
          <Button
            type="submit"
            sx={{ width: "96%", mr: 2 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit(false)}
            disabled={isLoading}
          >
            更新儲存為草稿
          </Button>
        </Grid>
        <Grid xs={3}>
          <Button
            type="submit"
            sx={{ width: "96%", mr: 2 }}
            variant="contained"
            color="success"
            size="large"
            onClick={handleSubmit(true)}
            disabled={isLoading}
          >
            更新並發佈活動
          </Button>
        </Grid>
      </Grid>
    </OrganizerLayout>
  );
}

export default ActivityCreate;
