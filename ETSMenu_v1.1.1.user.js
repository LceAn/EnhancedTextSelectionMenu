// ==UserScript==
// @name         选中文本
// @author       aeae------LceAn（www.lcean.com)
// @version      1.1.1
// @namespace    https://greasyfork.org/zh-CN/users/858044

// @description  选中的文本后在浏览器左上角弹出菜单(位置固定），可以进行搜索，复制，识别其中的网站。

// @match        http://*/*
// @include         http://*
// @include         https://*
// @encoding         utf-8

// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @license          GPL-3.0 License
// ==/UserScript==

(function() {
    'use strict';

    //-------------------------------参数部分--------------------------------------
    //默认值
    const SearchAddress = 'https://www.baidu.com/s?wd=';

    //-------------------------------菜单部分--------------------------------------

    // 创建一个名为“menu”的div元素
    const menu = document.createElement('div');
    // 设置div元素的ID为"text-selection-menu"
    menu.id = 'text-selection-menu';
    // 设置div元素的样式为固定定位
    menu.style.position = 'fixed';
    // 设置div元素距离顶部的位置为55像素
    menu.style.top = '55px';


    //// 设置div元素距离右侧的位置为20像素
    //menu.style.right = '20px';
    //设置div元素距离左侧的位置为20像素
    menu.style.left = '20px';


    // 设置div元素的边框样式为1像素的实线边框，颜色为#ccc
    menu.style.border = '1px solid #ccc';
    // 设置div元素的背景颜色为白色
    menu.style.background = '#fff';
    // 设置div元素的内边距为10像素
    menu.style.padding = '10px';
    // 设置div元素的圆角半径为5像素
    menu.style.borderRadius = '5px';
    // 设置透明
    menu.style.opacity = "0.6";
    // 设置元素处于最上层,不会被其他覆盖
    menu.style.zIndex = '99999';
    // 设置div元素的阴影效果
    menu.style.boxShadow = '2px 2px 5px #ccc';
    // 设置div元素的显示状态为不显示
    menu.style.display = 'none';
    // 将div元素添加到文档的body元素中
    document.body.appendChild(menu);

    //-------------------------------按钮部分--------------------------------------
    // Create the search option
    const searchOption = document.createElement('a');
    searchOption.href = '#';
    searchOption.textContent = '搜索';
    searchOption.style.display = 'block';
    searchOption.style.marginBottom = '5px';
    searchOption.style.opacity = "0.5";
    searchOption.addEventListener('mouseover', function() {
        searchOption.style.opacity = '1';
    });
    searchOption.addEventListener('mouseout', function() {
        searchOption.style.opacity = '0.5';
    });
    menu.appendChild(searchOption);

    // Create the copy option
    const copyOption = document.createElement('a');
    copyOption.href = '#';
    copyOption.textContent = '复制';
    copyOption.style.display = 'block';
    copyOption.style.marginBottom = '5px';
    copyOption.style.opacity = "0.5";
    copyOption.addEventListener('mouseover', function() {
        copyOption.style.opacity = '1';
    });
    copyOption.addEventListener('mouseout', function() {
        copyOption.style.opacity = '0.5';
    });
    menu.appendChild(copyOption);


    // Create the link option
    const linkOption = document.createElement('a');
    linkOption.href = '#';
    linkOption.textContent = '链接';
    linkOption.style.display = 'block';
    linkOption.style.marginBottom = '5px';
    linkOption.style.opacity = "0.5";
    linkOption.addEventListener('mouseover', function() {
        linkOption.style.opacity = '1';
    });
    linkOption.addEventListener('mouseout', function() {
        linkOption.style.opacity = '0.5';
    });
    menu.appendChild(linkOption);


    const imageOption = document.createElement('a');
    imageOption.href = '#';
    imageOption.textContent = '搜图';
    imageOption.style.display = 'block';
    imageOption.style.marginBottom = '5px';
    imageOption.style.opacity = "0.5";
    imageOption.addEventListener('mouseover', function() {
        imageOption.style.opacity = '1';
    });
    imageOption.addEventListener('mouseout', function() {
        imageOption.style.opacity = '0.5';
    });
    menu.appendChild(imageOption);


    const translateOption = document.createElement('a');
    translateOption.href = '#';
    translateOption.textContent = '翻译';
    translateOption.style.display = 'block';
    translateOption.style.opacity = "0.5";
    translateOption.addEventListener('mouseover', function() {
        translateOption.style.opacity = '1';
    });
    translateOption.addEventListener('mouseout', function() {
        translateOption.style.opacity = '0.5';
    });
    menu.appendChild(translateOption);


    //-------------------------------拓展部分--------------------------------------
    // 消息对话框函数
    function showMessage(message, timeout) {
        const messageBox = document.createElement('div');
        messageBox.textContent = message;
        messageBox.style.position = 'fixed';
        // messageBox.style.top = '0';
        messageBox.style.bottom = '0';
        messageBox.style.left = '0';
        messageBox.style.right = '0';
        messageBox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        messageBox.style.color = 'black';
        messageBox.style.padding = '10px';
        messageBox.style.fontSize = '18px';
        messageBox.style.fontWeight = 'bold';
        messageBox.style.textAlign = 'center';
        messageBox.style.zIndex = '99999';
        document.body.appendChild(messageBox);
        setTimeout(function() {
            messageBox.style.display = 'none';
        }, timeout);
    }

    //设置引用函数
    GM_registerMenuCommand('参数设置', () => { DateSettings(); });
    GM_registerMenuCommand('作者博客', () => { AuthorBlog(); });

    //-------------------------------设置部分--------------------------------------
    function AuthorBlog() {
        window.location.href = 'https://www.lcean.com';
    }

    function DateSettings() {
        // 创建弹出窗口的HTML
        const popupHtml = `
        <style>
        #popupDiv {
            position: fixed;
            top: 50px;
            right: 50px;
            width: 200px;
            height: 300px;
            background-color: white;
            border: 1px solid black;
            padding: 10px;
            zIndex :'99999';
          }

          #popupDiv h2 {
            font-size: 18px;
            margin: 10px 0;
          }

          #SearchAddress {
            margin-top: 10px;
            padding: 5px;
            font-size: 14px;
          }

          button {
            margin-top: 10px;
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
          }

          #saveButton {
            background-color: green;
            color: white;
          }

          #resetButton {
            background-color: blue;
            color: white;
          }

          #closeButton {
            background-color: red;
            color: white;
          }

        </style>
        <div id="popupDiv">
        <h2>选择文本参数设置</h2>

        <h2>菜单窗口设置</h2>
        <label for="SearchAddress">选择引擎：</label>
        <select id="SearchAddress">
          <option value="https://www.baidu.com/s?wd=">百度</option>
          <option value="https://www.bing.com/search?q=">必应</option>
          <option value="https://www.google.com/search?q=">谷歌</option>
        </select>
        <br>
        <button id="saveButton">Save</button>
        <button id="resetButton">Reset</button>
        <button id="closeButton">Close</button>
      </div>
            `;

        // 将HTML插入到页面中
        document.body.insertAdjacentHTML('beforeend', popupHtml);

        // 获取弹出窗口元素和输入框元素
        const popupDiv = document.getElementById('popupDiv');
        const saveButton = document.getElementById('saveButton');
        const resetButton = document.getElementById('resetButton');
        const closeButton = document.getElementById('closeButton');


        const SearchAddress = document.getElementById('SearchAddress');
        console.log(SearchAddress);



        // 设置弹出窗口的位置
        // popupDiv.style.top = topInput.value + 'px';
        // popupDiv.style.right = rightInput.value + 'px';
        popupDiv.style.top = '50px';
        popupDiv.style.right = '50px';

        // 保存按钮的点击事件
        saveButton.addEventListener('click', () => {

            GM_setValue('SearchAddress', SearchAddress.value);
            showMessage('Saved!', 2000);
            popupDiv.remove();

        });

        // 重置按钮的点击事件
        resetButton.addEventListener('click', () => {
            GM_deleteValue('SearchAddress');
            SearchAddress = 'https://www.baidu.com/s?wd=';
            showMessage('重置成功！', 2000);
            popupDiv.remove();
        });

        // 关闭按钮的点击事件
        closeButton.addEventListener('click', () => {
            // 移除弹出窗口元素
            popupDiv.remove();
        });
    }




    //-------------------------------功能部分--------------------------------------

    // 搜索函数---------------------
    searchOption.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            const SearchAddressID = GM_getValue('SearchAddress', SearchAddress.value);
            window.open(SearchAddressID + selectedText, '_blank');
        }
        menu.style.display = 'none';
    });


    // 复制函数---------------------
    copyOption.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            GM_setClipboard(selectedText);
        }
        showMessage('Copied The Text: ' + selectedText, 1000);
        menu.style.display = 'none';
    });

    // 链接函数---------------------
    linkOption.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedText = window.getSelection().toString();
        const urlRegex = /((https?:\/\/|www\.)[\x21-\x7e]+[\w\/=]|\w([\w._-])+@\w[\w\._-]+\.(com|cn|org|net|info|tv|cc|gov|edu)|(\w[\w._-]+\.(com|cn|org|net|info|tv|cc|gov|edu))(\/[\x21-\x7e]*[\w\/])?|ed2k:\/\/[\x21-\x7e]+\|\/|thunder:\/\/[\x21-\x7e]+=)/gi;
        const selectedUrl = selectedText.match(urlRegex);
        if (selectedUrl) {
            const url = selectedUrl[0];
            if (!/^https?:\/\//i.test(url)) {
                window.open(`http://${url}`, '_blank');
            } else {
                window.open(url, '_blank');
            }
        } else {
            showMessage('未匹配到链接！', 1000);
        }
        menu.style.display = 'none';
    });

    // 图片函数---------------------
    imageOption.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(selectedText)}`;
            window.open(searchUrl, '_blank');
        } else {
            window.open('https://www.google.com/imghp', '_blank');
        }
    });

    // 翻译函数---------------------
    translateOption.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            const translateUrl = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(selectedText)}&op=translate`;
            window.open(translateUrl, '_blank');
        } else {
            window.open('https://translate.google.com/', '_blank');
        }
    });





    //-------------------------------事件部分--------------------------------------
    // 监听鼠标事件，关闭菜单
    document.addEventListener('mouseup', function(event) {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });
})();
