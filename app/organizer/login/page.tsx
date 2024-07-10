"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import BackBtn from "@/components/ui/shared/BackBtn";
import LogoHorizontal from "@/components/icon/LogoHorizontal";

import { loginOrganizer } from "@/features/organizer/ogAuthSlice";
import { EMAIL_REGEX, PWD_REGEX } from "@/utils/regexHandler";
import { LoginOrganizerForm } from "@/types";
import {
  OG_TOK0N_COOKIE,
  OG_ACCOUNT_COOKIE,
  removeCookie,
  getCookie,
  setCookie,
} from "@/utils/cookieHandler";

import {
  Grid,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
  Fade,
} from "@mui/material";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState<LoginOrganizerForm>({
    email: "",
    password: "",
    remember: true,
  });
  const [validAccount, setValidAccount] = useState("");
  const [validPwd, setValidPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleValidate = (name: string, value: string) => {
    if (name === "email") {
      if (value === "") {
        setValidAccount("請輸入帳號");
      } else if (!EMAIL_REGEX.test(value)) {
        setValidAccount("請輸入Email格式");
      } else {
        setValidAccount("");
        return true;
      }
    }

    if (name === "password") {
      if (value === "") {
        setValidPwd("請輸入密碼");
      } else if (!PWD_REGEX.test(value)) {
        setValidPwd("請確認密碼格式，規則為大小寫英數字混合，並且至少八碼");
      } else {
        setValidPwd("");
        return true;
      }
    }

    return false;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    handleValidate(name, value);

    setLoginForm((prevForm: any) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "remember") {
      setLoginForm((prevForm: any) => ({
        ...prevForm,
        remember: e.target.checked,
      }));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { email, password, remember } = loginForm as LoginOrganizerForm;

    const validAcc = handleValidate("email", email);
    const validPwd = handleValidate("password", password);

    if (!validPwd || !validAcc) return;
    setErrorMsg("");
    setSuccessMsg("");

    dispatch(loginOrganizer(loginForm) as any).then((res: any) => {
      if (res.payload?.data) {
        setSuccessMsg("登入成功，即將跳轉至\"活動管理\"頁面");

        if (remember) {
          setCookie(OG_ACCOUNT_COOKIE, email, 30);
        } else {
          removeCookie(OG_ACCOUNT_COOKIE);
        }

        setTimeout(() => {
          router.push("/organizer/activity");
        }, 300); // 後跳轉
      } else if (res.error.message) {
        setErrorMsg(res.error.message);
      }
    });
  };

  useEffect(() => {
    const getOgToken = getCookie(OG_TOK0N_COOKIE);
    const getAcc = getCookie(OG_ACCOUNT_COOKIE);

    if (getOgToken) {
      router.push("/organizer/activity");
    } else if (getAcc) {
      setLoginForm({
        email: getAcc,
        password: "",
        remember: true,
      });
    }
  }, [router]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          overflow: "hidden",
          height:{ xs: "auto", sm: "100%" },
        }}
      >
        <Box
          component="img"
          sx={{
            display:{ xs: "none", sm: "block" },
            objectFit: "cover",
            height: "100%",
          }}
          alt="cover"
          src="https://fastly.picsum.photos/id/572/1000/700.jpg?hmac=4wtTOriqhtIkQQpz6N9PLCmvzXwMvkGpSE235Mu_P9Q"
        />
      </Grid>

      <Grid 
        xs={12} 
        sm={6} 
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2
        }}
      >
        <Box>
          <BackBtn href="/" name="返回" />
        </Box>
        <Fade in={true}>
          <Box sx={{ width: "75%", maxWidth: 380, margin: "auto", textAlign: "center" }}>
            <Box>
              <Button component={NextLink} href="/" sx={{ height: 60, my: 5 }}>
                <LogoHorizontal color="#4A4642" />
              </Button>
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
              {successMsg && <Alert severity="success">{successMsg}</Alert>}
              <FormGroup>
                <TextField
                  required
                  name="email"
                  type="email"
                  autoComplete="nope"
                  value={loginForm.email}
                  label="帳號"
                  margin="normal"
                  error={validAccount !== ""}
                  helperText={validAccount}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={loginForm.password}
                  label="密碼"
                  margin="normal"
                  inputProps={{ maxLength: 20 }}
                  error={validPwd !== ""}
                  helperText={validPwd}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                  }}
                  onClick={handleSubmit}
                  disabled={validAccount !== "" || validPwd !== ""}
                >
                  主揪登入
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <FormControlLabel
                    label="記住我"
                    control={
                      <Checkbox
                        name="remember"
                        checked={loginForm.remember}
                        onChange={handleChecked}
                      />
                    }
                  />
                  <MuiLink
                    component={NextLink}
                    href="/organizer/forget"
                    underline="always"
                  >
                    忘記密碼?
                  </MuiLink>
                </Box>
              </FormGroup>
            </Box>

            <Typography variant="body1">
              尚未註冊帳號？
              <MuiLink
                component={NextLink}
                href="/organizer/register"
                underline="always"
              >
                立即註冊
              </MuiLink>
            </Typography>
          </Box>
        </Fade>
        <Box sx={{height: 40}}></Box>
      </Grid>
    </Grid>
  );
}
