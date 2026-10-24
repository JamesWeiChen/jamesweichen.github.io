# Acadenda 會議網頁維護流程

這個網站只讀取 JSON，沒有編輯或上傳權限。任何訪客都不能透過此頁修改正式議程。
介面支援繁體中文與英文；議程標題、講者與地圖名稱依 JSON 原文呈現，不會自動翻譯。
頁首提供跟隨系統、淺色、深色選單，沿用主站的偏好儲存；URL 的 ?lang=en 或 ?lang=zh 優先於儲存偏好。
主站、教學頁與會議頁共用根目錄 site-preferences.js，語言與外觀都預設跟隨系統。
瀏覽器主要語言為 zh-TW、zh-HK、zh-MO 或 zh-Hant 時顯示繁體中文，其餘（包含簡體中文和未指定地區的 zh）顯示英文。
訪客可手動選擇繁體中文／English，以及淺色／深色，偏好會在各頁沿用。?lang=system 可明確選擇跟隨系統。

## 一、現有示範
網頁：https://jamesweichen.github.io/acadenda/conferences/official-demo/
JSON：https://jamesweichen.github.io/acadenda/program/Official_Conference_Demo.json
這是虛構會議。新增頁面沒有改動既有 JSON、ID、地圖或 QR 匯入網址。
以上新網頁要在 GitHub Pages 部署後才會對外可用。

## 二、新增一屆會議（第一次才做）
1. 用 Acadenda 專案的 Mac 轉換器將主辦方填好的 Excel 轉成 JSON。
2. 將 JSON 放入本網站 acadenda/program/，檔名只用英文字母、數字、連字號或底線。
   每屆會議用不同檔名，例如 research-forum-2027.json，發布後不改名。
3. 在本網站資料夾執行：

```sh
../Acadenda/ConferencePublishing/.venv/bin/python scripts/create-acadenda-conference.py --slug research-forum-2027 --json acadenda/program/research-forum-2027.json
```

程式會先使用 Mac 轉換器相同的規則驗證 JSON，再產生專屬頁面、設定及 QR Code。
若檔案或頁面已存在，不會覆寫。程式不會上傳網站，也不會複製另一份議程。
預設轉換工具位於隔壁 Acadenda/ConferencePublishing；可用 --toolkit 指定其他位置。
新電腦請先執行轉換工具的 build_mac.command 安裝依賴，建立可用的 Python 環境。
未來每場會議共用 assets 裡的顯示程式，不必各自維護一份 JavaScript。

## 三、後續更新
1. 打開該會議網頁，展開「營運工具 · 複製 AI 更新指令」。
2. 填入主辦方要求的修改，按「複製更新指令＋目前 JSON」。
3. 把整段貼給外部 AI。按下按鈕時網頁會重新抓 JSON，不會沿用開頁當時的舊版本。
   網路失敗時不會複製；剪貼簿權限不足會提供文字框供手動複製。
4. 將回覆存成暫存 JSON（不要直接蓋掉已發布版本），先執行驗證與差異檢查：

```sh
../Acadenda/ConferencePublishing/.venv/bin/python ../Acadenda/ConferencePublishing/publishing.py validate /完整路徑/新版.json --previous acadenda/program/research-forum-2027.json
```

5. 確認變動符合主辦方要求，尤其是刪除、新增及 ID 變更，再替換同名 JSON。
6. 本機預覽確認後提交並推送網站。一般只需更新 JSON，不需重建頁面或 QR Code。
   已開著的網頁請按「重新載入」；GitHub Pages 部署完成前可能仍是舊版。
若等待 AI 回覆期間又發布了其他變更，請重新複製最新 JSON 再產生回覆。
AI 指令是輔助，發布前仍需要差異檢查與人工確認。

## 四、本機預覽
在網站根目錄執行 python3 -m http.server 8000
瀏覽 http://localhost:8000/acadenda/conferences/official-demo/
不要直接雙擊 HTML：瀏覽器通常不允許 file:// 讀取 JSON。
本機頁面讀本機 JSON；複製的連結與 QR Code 固定指向正式網站。
此網頁沒有 App 自動開啟的 deep link；請用 Acadenda 的連結或 QR 掃描匯入功能。

## 五、檔案說明
assets/app.js、style.css：所有會議共用的介面。
assets/page-template.html：新增會議頁的 HTML 範本；修改後不會自動改舊頁面。
assets/update_prompt.txt：網站按鈕使用的固定 AI 更新規則。
此檔來自 Acadenda/ConferencePublishing/update_prompt.txt；修改來源規則時需一併同步網站副本。
每場會議的 publication.json：連到既有 JSON 的相對路徑與正式 HTTPS 網址。
每場會議的 qrcode.svg：只包含固定 JSON 網址，不包含議程內容或私人資訊。
本工具目前固定服務 jamesweichen.github.io 的 acadenda/program/ 目錄。

## 六、開發驗證（選用，不影響網站使用）
使用已安裝 playwright 與 Chromium 的 Python 執行 scripts/check-acadenda-conferences.py。
測試只修改暫存副本，檢查議程、地圖、手機寬度、更新時重新讀取、文字安全、
網路錯誤、剪貼簿替代、無效 JSON 恢復及淺深色；不會修改或發布正式資料。

正式接案前請依照 [發布檢查表](Release_Checklist.md) 走過一次流程。
