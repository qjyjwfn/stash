// crypto_rmb.js
const url = "https://api.coingecko.com/api/v3/simple/price?ids=tether,tron&vs_currencies=cny";

$httpClient.get(url, function(error, response, data) {
  if (error) {
    $done({
      title: "汇率获取失败",
      content: "网络请求错误，请检查节点状态",
      icon: "exclamationmark.triangle.fill",
      "icon-color": "#FF3B30"
    });
    return;
  }

  try {
    const json = JSON.parse(data);
    // 提取 USDT 和 TRX 对应的人民币价格并保留小数
    const usdtCny = json.tether.cny.toFixed(2);
    const trxCny = json.tron.cny.toFixed(4);
    
    // 获取当前更新时间
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });

    $done({
      title: "实时汇率 (RMB)",
      content: `USDT: ￥${usdtCny}\nTRX: ￥${trxCny}\n更新于: ${time}`,
      icon: "yensign.circle.fill",
      "icon-color": "#10B981"
    });
  } catch (e) {
    $done({
      title: "汇率获取失败",
      content: "解析 API 数据出错",
      icon: "exclamationmark.triangle.fill",
      "icon-color": "#FF3B30"
    });
  }
});
