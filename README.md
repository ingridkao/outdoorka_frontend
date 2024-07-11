![](https://img.shields.io/github/issues-pr/outdoorka/outdoorka_frontend.svg)｜![](https://img.shields.io/github/issues-pr-closed/outdoorka/outdoorka_frontend.svg)｜![](https://img.shields.io/github/issues/outdoorka/outdoorka_frontend.svg) | ![](https://img.shields.io/github/last-commit/outdoorka/outdoorka_frontend.svg)



# 揪好咖 outdoorka
![專案封面圖](https://i.imgur.com/AakkSHq.png)


## Overview
戶外活動揪團系統 
> 歡迎來到揪好咖 outdoorka！我們是專為喜愛戶外活動的人打造的最佳揪團平台。無論你是活動主揪還是參加者，我們都提供一站式解決方案，讓你輕鬆享受每一次活動體驗。
> 無論你是尋找冒險、探索新地點，還是與志同道合的人建立新的友誼，揪好咖 outdoorka將成為你的最佳戶外活動夥伴！


### Members
![Members](https://i.imgur.com/4NxOeOl.png)

### Sitemap
![Sitemap](https://i.imgur.com/ykmlxbJ.jpg)

### Role Swimlane Diagram
![Role Swimlane Diagram](https://i.imgur.com/CKWgV0f.jpg)

| Role | 帳號 | 密碼 |
| -------- | -------- | -------- |
| 跟團仔(參加用戶) | user@gmail.com     | userA123      |
| 主揪(活動主辦) | email2@gmail.com     | Passw0rd      |

> 跟團仔可以使用google帳號登入

## Features

- 跟團仔：
    1. 登入註冊：可使用Email或是Google登入
    2. 觀察清單：查看及加入移除活動
    3. 報名購票：活動報名及金流支付
        ![報名購票流程](https://i.imgur.com/8nQjH8F.jpeg)
    4. 票卷清單：分票、備註、出示QRcode、評價
        ![分票流程](https://i.imgur.com/00fc0fr.jpeg)

- 主揪：
    1. 登入註冊：可使用Email登入
    2. 活動清單：查看及新增修改活動，評價過去活動之參加者
    3. 活動編輯：可上傳活動照片以及使用編輯器編輯內容，並有草稿及發布機制
    5. 活動驗票：可透過掃描QRcode或是參加者列表進行驗票
        ![活動驗票流程](https://i.imgur.com/8ajxnLV.jpeg)



## Technologies Used
![Node.js](https://img.shields.io/badge/Node-v20.12.0-339933?logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-v12.3.4-000000?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-v18-61DAFB?logo=react&logoColor=white) ![Typescript](https://img.shields.io/badge/Typescript-v5.4.5-3178C6?logo=typescript&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-v8-4B32C3?logo=eslint&logoColor=white)

State Management
![React-redux](https://img.shields.io/badge/React--redux-v9.1.2-764ABC?logo=redux&logoColor=white) ![Redux-Thunk](https://img.shields.io/badge/Redux--Thunk-v3.1.0-764ABC?logo=redux&logoColor=white)

Library
![Axios](https://img.shields.io/badge/Axios-v1.6.8-61DAFB?logo=axios&logoColor=white) ![qrcode.react](https://img.shields.io/badge/qrcode.react-v3.1.0-61DAFB?logo=react&logoColor=white) ![html5-qrcode](https://img.shields.io/badge/html5--qrcode-v2.3.8-E34F26?logo=html5&logoColor=white) ![dayjs](https://img.shields.io/badge/dayjs-v1.11.11-007ACC?logoColor=white) ![slick-carousel](https://img.shields.io/badge/slick--carousel-v1.8.1-FF8300?logoColor=white)



## Installation

### Directory Structure

```
.
|- .husky ->  Git hooks確保每次提交前運行 pnpm run lint 和 pnpm run format 檢查代碼風格和格式。
|- app
   |- page.tsx → 首頁組件
|- pages → 目錄名稱決定路由名稱(裡面必須要有index.tsx)
   |- api → 建立API路由，處理client和server之間的資料交換 
|- features →  Redux Thunk 事件處理功能模組。
|- plugins → 外部函式庫
   |- api → 包含 Axios攔截器配置
|- hooks → React 元件狀態管理相關的自訂 Hooks function
|- public → 存放圖片等靜態資源的目錄。
|- utils → 共用的 JavaScript 工具
|- styles → css，頁面的style寫在行內`sx`(需要使用駝峰式寫法)
   |- global.css → 通用的全域 CSS 樣式。
   |- theme.tsx → MUI 主題設定
|- types → TypeScript 接口和類型定義文件。

```

### Project Startup

1. Clone the repository:

```bash
git clone https://github.com/outdoorka/outdoorka_frontend.git -b dev
```

2. Navigate to the project directory:

```bash
cd outdoorka_frontend
```

3. Install dependencies:

```bash
pnpm install
```

4. Set up environment variables:
Create a .env file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_BASE_URL_USER=
```

5. Start the development server:

```bash
pnpm dev
```

### Usage

Visit http://localhost:3000 in your browser to access the application.



## Contributing

<a href="https://github.com/outdoorka/outdoorka_frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=outdoorka/outdoorka_frontend" />
</a>

.

![LOGO](https://i.imgur.com/woq9oCr.png#pic_center =300x)
© 2023 outdoorka