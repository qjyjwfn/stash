const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });

const okxTrxUrl = "https://www.okx.com/api/v5/market/ticker?instId=TRX-USDT";
const okxUsdtUrl = `https://www.okx.com/v3/c2c/tradingOrders/books?t=${Date.now()}&quoteCurrency=cny&baseCurrency=usdt&side=sell&paymentMethod=all&userType=all&limit=1`;

$httpClient.get(okxTrxUrl, function(err1, resp1, data1) {
    if (err1) return showError("OKX TRX 网络错误");
    try {
        const trxUsdt = parseFloat(JSON.parse(data1).data[0].last);
        
        $httpClient.get(okxUsdtUrl, function(err2, resp2, data2) {
            if (err2) return showError("OKX USDT 网络错误");
            try {
                const usdtCny = parseFloat(JSON.parse(data2).data.sell[0].price);
                const trxCny = trxUsdt * usdtCny;
                showResult("欧易 OKX", usdtCny, trxCny, "#000000"); // 欧易黑色背景
            } catch (e) { return showError("OKX USDT 解析失败"); }
        });
    } catch (e) { return showError("OKX TRX 解析失败"); }
});

// 错误提示
function showError(msg) {
    $done({
        title: "获取失败",
        content: msg,
        icon: "exclamationmark.triangle.fill",
        "icon-color": "#FF3B30"
    });
}

// 渲染面板
function showResult(title, usdt, trx, color) {
    $done({
        title: `汇率 (${title})`,
        content: `USDT: ￥${usdt.toFixed(2)}\nTRX: ￥${trx.toFixed(4)}\n更新于: ${time}`,
        icon: "yensign.circle.fill",
        "icon-color": color
    });
}
