// ==UserScript==
// @name         YT MUSIC Import
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://music.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js
// ==/UserScript==

(function () {
    'use strict';

    // 使用方法:
    //  1.選擇來源JSON檔案
    //  2.等待JSON檔案讀取完，並且有綠勾後
    //  3.選擇要添加到的歌單名稱
    //  4.Start開始匯入
    //  5.提供暫停功能
    //  6.結束時可用errList查看，有哪些歌沒有添加到

    const uploadIcon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAuUAAALlAF37bb0AAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABbSURBVHjapJPLCQAgDEOzQAdw/0HjRT200m/hgQfzoBFBEhOi4aE1VIzCJQk9qnubcyhQ7b5Qunl1sS74rROFCEAaArn9eE/kCZgRLACrLQiKM4IuQ8H0O+8BANkx81mghpvHAAAAAElFTkSuQmCC`
    function createCustomDiv() {
        const customDivStyles = {
            toggleBtnCSS: `
            position: fixed;
            top: 28px;
            right: 315px;
            z-index: 999;
            width: 20px;
            height: 20px;
            padding:0;
            padding-bottom:2px;
            `,
            customDivCSS: `
height: 30px;
background: snow;
position: fixed;
top: 50px;
right: 50px;
z-index: 9999;
display:flex;
align-items: center;
`,
            customInputCSS: `
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0,0,0,0);
border: 0;
`,
            labelCSS: `
border: 1px solid #555;
border-radius:2px;
display: inline-block;
margin: 4px;
padding: 4px 6px;
height: 11px;
cursor: pointer;
background: snow;
`,
            uploadIconCSS: `
padding: 5px;
padding-top: 2px;
padding-left: 16px;
background-image: url('${uploadIcon}');
background-repeat: no-repeat;
        `,
            selectCSS: `
width:60px;
height: 22px;
margin-right: 4px;
`,
            // JSON上傳完成的綠勾
            checkmarkWrapCSS: `
position: relative;
width: 20px;
height: 20px;
border-radius: 50%;
border: 2px solid green;
display: none;
`,
            checkmarkCSS: `
position: absolute;
width: 4px;
height: 8px;
border: solid green;
border-width: 0 3px 3px 0;
top: 3px;
left: 7px;
transform: rotate(45deg);
`
        }

        // Toggle Div 相關
        const toggleBtn = document.createElement('button')
        toggleBtn.id = 'panel-toggle'
        toggleBtn.textContent = '→'
        // toggleBtn.textContent = '->'
        toggleBtn.setAttribute('style', customDivStyles.toggleBtnCSS)
        document.body.appendChild(toggleBtn)


        // Div 相關，外層
        const customDiv = document.createElement('div')
        customDiv.id = "custom-div"
        customDiv.setAttribute('style', customDivStyles.customDivCSS)

        // Label 相關
        const label = document.createElement('label');
        label.setAttribute('for', 'uploader');
        label.id = 'custom-upload-label';
        customDiv.appendChild(label);
        // Label裡的icon
        const span = document.createElement('span');
        span.id = 'upload-icon';
        label.appendChild(span);
        // Label裡的文字
        const labelTextNode = document.createTextNode('SCV')
        label.appendChild(labelTextNode)
        customDiv.querySelector("#custom-upload-label").setAttribute('style', customDivStyles.labelCSS);
        customDiv.querySelector("#upload-icon").setAttribute('style', customDivStyles.uploadIconCSS);

        // Input 相關，file上傳功能
        const input = document.createElement('input');
        input.id = 'uploader';
        input.type = 'file';
        input.accept = ".csv"
        customDiv.appendChild(input);
        customDiv.querySelector("#uploader").setAttribute('style', customDivStyles.customInputCSS);

        // 勾勾容器
        const checkmarkWrap = document.createElement('div')
        checkmarkWrap.id = 'checkmark-wrap'
        checkmarkWrap.setAttribute('style', customDivStyles.checkmarkWrapCSS)
        // 勾勾本體
        const checkmark = document.createElement('div')
        checkmark.id = 'checkmark'
        checkmark.setAttribute('style', customDivStyles.checkmarkCSS)
        checkmarkWrap.appendChild(checkmark)
        customDiv.appendChild(checkmarkWrap)


        // Select 相關
        const select = document.createElement('select')
        select.id = 'playlistSelector'
        // Select 的 option
        const optionDefault = document.createElement('option')
        optionDefault.value = ''
        optionDefault.innerText = 'Sel'
        optionDefault.setAttribute('disabled', '')
        optionDefault.setAttribute('selected', '')
        select.appendChild(optionDefault) // 添加 option 進 select
        customDiv.appendChild(select)
        customDiv.querySelector('#playlistSelector').setAttribute('style', customDivStyles.selectCSS);

        // Button 相關
        // 開始匯入歌單
        const startButton = document.createElement('button');
        startButton.id = 'start';
        startButton.textContent = 'Start';
        startButton.setAttribute('style', 'display:none;');
        customDiv.appendChild(startButton);
        // 阻止按鈕，尚未上傳JSON
        const yetButton = document.createElement('button')
        yetButton.id = 'yet'
        yetButton.textContent = 'Yet'
        customDiv.appendChild(yetButton);
        // 錯誤報告
        const errListButton = document.createElement('button');
        errListButton.id = 'err-list';
        errListButton.textContent = 'ErrList';
        customDiv.appendChild(errListButton);
        // 暫停
        const pasueButton = document.createElement('button');
        pasueButton.id = 'pause-process';
        pasueButton.textContent = 'Pause';
        customDiv.appendChild(pasueButton);
        // Button 同時 給CSS
        const mgrBtns = [startButton, yetButton, errListButton, pasueButton, checkmarkWrap]
        mgrBtns.forEach(btn => {
            btn.style.marginRight = '4px'
        })

        // 最終渲染外層div，且帶出以上構建完未渲染元素
        document.body.appendChild(customDiv);
        document.querySelector('#start').addEventListener('click', startProcessSongs)
        document.querySelector('#yet').addEventListener('click', yetHandler)
        document.querySelector('#err-list').addEventListener('click', errListViewerHandler)
        document.querySelector('#pause-process').addEventListener('click', pauseHandler)
        document.querySelector('#panel-toggle').addEventListener('click', panelToggleHandler)

        // 選擇歌單功能
        fillOptionInSelector()

        // 檔案選擇器功能(監聽)
        fileInputHandler()
    }
    createCustomDiv()

    // 檔案選擇器功能(監聽)
    function fileInputHandler() {
        const fileInput = document.getElementById('uploader')
        fileInput.addEventListener('change', function () {
            let file = fileInput.files[0];
            if (!file) return

            // 使用異步處理，避免凍結
            setTimeout(function () {
                let reader = new FileReader();

                reader.onload = function (event) {
                    // 讀取 csv 轉成 json
                    convertCsvToJson(event)
                    // 在這裡你可以使用jsonContent來進行後續操作

                    // 先控制兩個按鈕的顯示與否
                    document.querySelector('#yet').style.display = 'none'
                    document.querySelector('#start').style.display = 'inline-block'
                    // JSON上傳完綠勾
                    document.querySelector('#checkmark-wrap').style.display = 'inline-block'

                };
                reader.readAsText(file);
            }, 0)

        });
    }
    let jsonContent = null
    function convertCsvToJson(e) {
        const csv = e.target.result
        console.log('csv', csv)
        // 找出 track name, artist names, album name, album release date
        Papa.parse(csv, {
            header: true,
            beforeFirstChunk: function (chunk) {
                // 將 'Artist Name(s)' 替換為 'Artist Names'
                return chunk.replace('Artist Name(s)', 'Artist Names');
            },
            complete: (results) => {
                let csvData = results.data
                console.log('csvData', csvData)

                jsonContent = csvData.map(row => ({
                    'Track Name': row['Track Name'],
                    'Artist Names': row['Artist Names'],
                    'Album Name': row['Album Name'],
                    'Album Release': row['Album Release Date']
                }))
            }
        })
    }

    // 歌曲匯入失敗表
    let failedAddSongs = []
    function errListViewerHandler() {
        // 檢查提供的數據是否為空，如果為空則在控制台中輸出錯誤並返回
        if (failedAddSongs.length === 0) {
            alert('沒有數據提供下載');
            return;
        }

        console.log('failedAddSongs: ', failedAddSongs)
        // 排序 failedAddSongs，confirm 訊息用
        let failedAddSongsList = failedAddSongs.map((song, index) => {
            return ` ${index + 1}. ${song['Artist Names']} - ${song['Track Name']} `
        }).join('\n');

        let confirmMsg = `
以下是尚未添加的歌曲
${failedAddSongsList}
未添加的歌曲列表已準備就緒，是否下載
        `
        if (confirm(`${confirmMsg}`)) {
            failedAddSongsDownload()
        }
    }

    // 失敗表，下載功能
    function failedAddSongsDownload() {
        // 創建一個新的 Blob 物件，將數據轉換為 JSON 格式的字符串。
        // Blob 物件可以被認為是不可變的數據塊。
        // JSON.stringify 的第三個參數 2 表示在生成的 JSON 字符串中添加空格使其格式化，更易讀。
        const blob = new Blob([JSON.stringify(failedAddSongs, null, 2)], { type: 'application/json' });

        // URL.createObjectURL() 方法會創建一個代表 blob 的 URL，
        // 這個 URL 可以在瀏覽器中訪問，指向存儲在用戶本地的文件。
        const url = URL.createObjectURL(blob);

        // 創建一個新的臨時 HTML <a> 元素，用於啟動下載
        const a = document.createElement('a');

        // 設置 <a> 元素的 href 屬性為上面創建的 blob URL
        a.href = url;

        // 設置下載文件的名稱
        a.download = 'ErrList.json';

        // 將 <a> 元素設為不顯示
        a.style.display = 'none';

        // 將 <a> 元素添加到頁面中
        document.body.appendChild(a);

        // 觸發 <a> 元素的 click 事件，啟動下載
        a.click();

        // 從頁面中移除 <a> 元素
        document.body.removeChild(a);

        // 釋放通過 URL.createObjectURL() 創建的 URL，
        // 這一步非常重要，因為這些 URL 會佔用瀏覽器資源，
        // 如果不釋放，可能會導致記憶體洩漏
        URL.revokeObjectURL(url);
    }

    // 面板開關
    let panelStatus = true
    function panelToggleHandler() {
        const toggleBtn = document.querySelector('#panel-toggle')
        const customDiv = document.querySelector('#custom-div')
        panelStatus = !panelStatus
        if (panelStatus) {
            toggleBtn.textContent = '→'
            customDiv.style.display = 'block'
        } else {
            toggleBtn.textContent = '↓'
            customDiv.style.display = 'none'
        }
    }

    // 設置等待時間
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // 找到搜尋框並輸入歌名 (song包含歌曲等資訊)
    function setValueToSearchInput(song) {
        const searchInput = document.querySelector('.ytmusic-search-box input');
        const searchValue = `${song['Track Name']} ${song['Artist Names']} ${song['Album Name']} ${song['Album Release']}`
        searchInput.value = searchValue
        // console.log('搜尋框 Typed')
        return searchInput
    }
    // 送出搜尋，模擬Enter鍵
    function simulateEnterKey(searchInputResult) {
        searchInputResult.focus();
        const enterEvents = ['keyup', 'keypress', 'keydown'];
        const eventInitDict = {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
            shiftKey: false
        };
        enterEvents.forEach(event => {
            searchInputResult.dispatchEvent(new KeyboardEvent(event, eventInitDict));
        });
    }
    // 點擊歌曲篩選
    async function songTagClickHandler() {
        let searchResultFilterTag = document.querySelectorAll('yt-formatted-string.text.style-scope.ytmusic-chip-cloud-chip-renderer');
        let songTag = Array.from(searchResultFilterTag).find((el) => el.textContent === '歌曲');
        if (!songTag) {
            throw new Error("沒找到 歌曲Tag")
        }
        songTag.click()
        // console.log('歌曲Tag clicked')
    }

    // 檢查歌名 與 搜尋結果 是否一致
    async function trackNameCheck(song) {
        // 按下歌曲篩選按鈕，出來的結果(可能有很多)，找第一個
        let pageFirstResultBySongFilterBtn = document.querySelector('yt-formatted-string.title.style-scope.ytmusic-responsive-list-item-renderer.complex-string[respect-html-dir][ellipsis-truncate][ellipsis-truncate-styling]')
        let pageFirstTrackName = pageFirstResultBySongFilterBtn.children[0].textContent

        // 刪除 歌曲的其餘資訊 ( remix & feat ...其餘資訊 )
        function removeExtraInfo(inputTrackName) {
            function removeSectionByKeyword(keyword) {
                // 找關鍵字，且不區分大小寫
                let index = inputTrackName.toLowerCase().indexOf(keyword);

                if (index !== -1) {
                    // 找 "(" , "[" 的開頭位置
                    let start = Math.max(inputTrackName.lastIndexOf('(', index), inputTrackName.lastIndexOf('[', index));
                    // 找 "(" , "[" 的尾巴位置，根據start的結果來決定
                    let end = start !== -1 ? (inputTrackName.indexOf(')', start) !== -1 ? inputTrackName.indexOf(')', start) : inputTrackName.indexOf(']', start)) : -1;
                    // 如果都有找到 start & end
                    if (start !== -1 && end !== -1) {
                        // 從字符串中移除從 start 到 end 的部分，使用 substring 擷取&拼接
                        inputTrackName = inputTrackName.substring(0, start) + inputTrackName.substring(end + 1);
                    }
                }
            }
            removeSectionByKeyword('remix')
            removeSectionByKeyword('feat')
            removeSectionByKeyword('with')
            removeSectionByKeyword('合作演出')
            return inputTrackName.trim();
        }
        // 開始刪除其餘資訊
        let clearPageFirstTrackName = removeExtraInfo(pageFirstTrackName)
        let clearSongName = removeExtraInfo(song['Track Name'])

        if (clearPageFirstTrackName !== clearSongName) {
            throw new Error('歌曲名稱不相符')
        }
    }

    // 點擊"儲存至播放清單"按鈕
    async function saveBtnClickHandler() {
        // 搜尋結果篩選 tag，歌曲或影片，點擊歌曲
        // 點擊"..."按鈕，讓選單面板出現
        let firstResult = document.querySelector('ytmusic-responsive-list-item-renderer.style-scope.ytmusic-shelf-renderer')
        let theMoreOptionsButton = firstResult.querySelector('tp-yt-paper-icon-button#button[aria-label="其他動作"]')
        // let theMoreOptionsButton = document.querySelector('yt-button-shape#button-shape.style-scope.ytmusic-menu-renderer[aria-label="其他動作"]')
        theMoreOptionsButton.click()
        // console.log('...按鈕 clicked')
        await sleep(500)

        // 點擊 選單面板的 "儲存至播放清單"
        const optionsMenu = document.querySelectorAll('yt-formatted-string.text.style-scope.ytmusic-menu-navigation-item-renderer');
        // "..."裡面有很多el，只好用find來找結果
        const saveBtn = Array.from(optionsMenu).find(el => el.textContent.trim() === '儲存至播放清單')
        if (!saveBtn) {
            throw new Error("沒找到'儲存至播放清單'按鈕或元素");
        }
        saveBtn.click();
        // console.log('歌曲區 clicked')
    }

    // 流程統整
    async function addSongToPlaylist(song, playListName) {
        let searchInputResult = setValueToSearchInput(song) // 找到搜尋框並輸入歌名(找到並返回輸入框元素)
        await sleep(500) // 怕輸入太快就ENTER送出
        simulateEnterKey(searchInputResult) // 送出搜尋，模擬Enter鍵(輸入框元素foucus)
        await sleep(1500) // 等頁面加載
        await songTagClickHandler() // 按下結果篩選
        await sleep(1000)
        await trackNameCheck(song) // 檢查歌名是否一致
        await saveBtnClickHandler(song) // 儲存至播放清單 按鈕
        await sleep(1000)
        let playlistBtn = document.querySelector(`button[aria-label="${playListName} "]`);
        if (!playlistBtn) {
            throw new Error("未找到'儲存至播放清單'按鈕或元素");
        }
        playlistBtn.click();
        console.log(`%c歌曲新增成功`, "font-size:14px;color:green")
    }

    // 開始匯入:迭代所有的歌曲資料
    let songSchedule = 0
    async function startProcessSongs() {
        // 阻止 CSV沒有匯入
        if (jsonContent === null) { return alert('請先上傳CSV檔') }
        // 阻止 目標歌單沒有選擇
        if (selectedPlaylist === null || selectedPlaylist === '') { return alert('請先選擇目標歌單') }

        for (let i = songSchedule; i < jsonContent.length; i++) {
            let song = jsonContent[i]
            // 暫停狀態
            if (pasueStatus) {
                console.log('暫停中，下一首將新增:', song, 'i:', i)
                return songSchedule = i
            }
            try {
                console.log(`%c第${i + 1}首: ${song['Artist Names']} - ${song['Track Name']} `, 'color:green;font-size: 20px;')
                await addSongToPlaylist(song, selectedPlaylist);
            } catch (error) {
                // 將失敗的歌曲&原因 加入 失敗表
                song.errorMessage = error.message
                failedAddSongs.push(song)
                console.log(`%c錯誤報告: ${error.message}`, 'color:orange;font-size: 20px;')
            }

            // 更新 添加進度
            songSchedule = i
            await new Promise(r => setTimeout(r, 500)); // 等待x秒 before next song
            // 最後一首通知
            if (i === jsonContent.length - 1) {
                alert('所有歌曲都已匯入')
            }
        }
    }


    // 選擇歌單: 1.抓取左側現有歌單 當 目標
    let selectedPlaylist = ''
    function fetchPlaylistTitle() {
        let allPlaylist = document.querySelectorAll('ytmusic-guide-entry-renderer[play-button-state="default"]');
        let titles = [];
        allPlaylist.forEach(playlist => {
            let titleElement = playlist.querySelector('.title.style-scope.ytmusic-guide-entry-renderer');
            if (titleElement) {
                titles.push(titleElement.innerText);
            }
        });
        return titles;
    }
    // 選擇歌單: 2.現有歌單 生成到 select 裡
    function fillOptionInSelector() {
        const playlistSelector = document.querySelector('#playlistSelector')
        // 第一次新增option，(select裡面沒其他option)
        if (playlistSelector.length <= 1) {
            let titles = fetchPlaylistTitle()
            titles.forEach(title => {
                let option = document.createElement('option')
                option.innerText = title
                option.value = title
                playlistSelector.appendChild(option)
            })
        }
    }
    // 使用者選歌單
    document.querySelector('#playlistSelector').addEventListener('change', (e) => {
        selectedPlaylist = e.target.value
        console.log('selectedPlaylist', selectedPlaylist)
    })

    // 暫停功能
    let pasueStatus = false
    function pauseHandler() {
        let pasueBtn = document.querySelector('#pause-process')
        pasueStatus = !pasueStatus
        if (pasueStatus) {
            console.log("Paused.", pasueStatus);
            pasueBtn.innerText = `Resume`
        } else {
            console.log("Resumed.", pasueStatus);
            pasueBtn.innerText = `Pause`
            startProcessSongs()
        }
    }
    // 阻止開始按鈕，沒上傳JSON
    function yetHandler() {
        alert('Upload JSON First')
    }



})();