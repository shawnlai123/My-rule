// 国内DNS服务器
const domesticNameservers = [
"https://dns.alidns.com/dns-query", // 阿里云公共DNS
"https://doh.pub/dns-query", // 腾讯DNSPod
"https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
"https://1.1.1.1/dns-query", // Cloudflare(主)
"https://1.0.0.1/dns-query", // Cloudflare(备)
"https://208.67.222.222/dns-query", // OpenDNS(主)
"https://208.67.220.220/dns-query", // OpenDNS(备)
"https://194.242.2.2/dns-query", // Mullvad(主)
"https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
"enable": true,
"listen": "0.0.0.0:1053",
"ipv6": true,
"use-system-hosts": false,
"cache-algorithm": "arc",
"enhanced-mode": "fake-ip",
"fake-ip-range": "198.18.0.1/16",
"fake-ip-filter": [
// 本地主机/设备
"+.lan",
"+.local",
// Windows网络出现小地球图标
"+.msftconnecttest.com",
"+.msftncsi.com",
// QQ快速登录检测失败
"localhost.ptlogin2.qq.com",
"localhost.sec.qq.com",
// 微信快速登录检测失败
"localhost.work.weixin.qq.com"
],
"default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
"nameserver": [...domesticNameservers, ...foreignNameservers],
"proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
"nameserver-policy": {
"geosite:private,cn,geolocation-cn": domesticNameservers,
"geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
}};
// 规则集通用配置
const ruleProviderCommon = {
"type": "http",
"format": "yaml",
"interval": 86400
};
// 规则集配置
const ruleProviders = {
"reject": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
"path": "./ruleset/loyalsoldier/reject.yaml"
},
"Direct": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Direct/Direct.yaml",
"path": "./ruleset/loyalsoldier/Direct.yaml"
},
"Instagram": {
...ruleProviderCommon,
"behavior": "classical",
"url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Instagram/Instagram.yaml",
"path": "./ruleset/loyalsoldier/Instagram.yaml"
},
"Amazon": {
...ruleProviderCommon,
"behavior": "classical",
"url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Amazon/Amazon.yaml",
"path": "./ruleset/loyalsoldier/Amazon.yaml"
},
"gemini": {
...ruleProviderCommon,
"behavior": "classical",
"url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Gemini/Gemini.yaml",
"path": "./ruleset/loyalsoldier/Gemini.yaml"
},
"icloud": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
"path": "./ruleset/loyalsoldier/icloud.yaml"
},
"apple": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
"path": "./ruleset/loyalsoldier/apple.yaml"
},
"Google": {
...ruleProviderCommon,
"behavior": "classical",
"url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Google/Google.yaml",
"path": "./ruleset/loyalsoldier/Google.yaml"
},
"proxy": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Proxy/Proxy.yaml",
"path": "./ruleset/loyalsoldier/proxy.yaml"
},
"private": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
"path": "./ruleset/loyalsoldier/private.yaml"
},
"gfw": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
"path": "./ruleset/loyalsoldier/gfw.yaml"
},
"tld-not-cn": {
...ruleProviderCommon,
"behavior": "domain",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
"path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
},
"telegramcidr": {
...ruleProviderCommon,
"behavior": "ipcidr",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
"path": "./ruleset/loyalsoldier/telegramcidr.yaml"
},
"cncidr": {
...ruleProviderCommon,
"behavior": "ipcidr",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
"path": "./ruleset/loyalsoldier/cncidr.yaml"
},
"lancidr": {
...ruleProviderCommon,
"behavior": "ipcidr",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
"path": "./ruleset/loyalsoldier/lancidr.yaml"
},
"applications": {
...ruleProviderCommon,
"behavior": "classical",
"url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
"path": "./ruleset/loyalsoldier/applications.yaml"
},
"OpenAI": {
...ruleProviderCommon,
"behavior": "classical",
"url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
"path": "./ruleset/blackmatrix7/openai.yaml"
}};
// 规则
const rules = [
// 自定义规则
"DOMAIN-SUFFIX,zillow.com,美国节点", // zillow
"DOMAIN-SUFFIX,playstation.com,香港节点", // playstation
"DOMAIN-SUFFIX,sony.com,香港节点", // sony
"DOMAIN-SUFFIX,pinterest.com,节点选择", // pinterest
"DOMAIN-SUFFIX,googleadservices.com,谷歌服务", // 域名查询
"DOMAIN-SUFFIX,sellersprite.com,全局直连", // adobe
"DOMAIN-SUFFIX,adobe.com,广告过滤", // adobe
"DOMAIN-SUFFIX,adobe.io,广告过滤", // adobe 
"DOMAIN-SUFFIX,nebula-media.org,节点选择", // 星云EMBY服务
"DOMAIN-SUFFIX,googleapis.cn,谷歌服务", // Google服务
"DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
"DOMAIN-SUFFIX,xn--ngstr-lra8j.com,谷歌服务", // Google Play下载服务
"DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
// 规则集，分流规则
"RULE-SET,Amazon,全局直连",
"RULE-SET,applications,全局直连",
"RULE-SET,private,全局直连",
"RULE-SET,gemini,谷歌服务",
"RULE-SET,reject,广告过滤",
"RULE-SET,icloud,微软服务",
"RULE-SET,apple,苹果服务",
"RULE-SET,Google,谷歌服务",
"RULE-SET,Instagram,国外媒体",
"RULE-SET,proxy,节点选择",
"RULE-SET,gfw,节点选择",
"RULE-SET,tld-not-cn,节点选择",
"RULE-SET,Direct,全局直连",
"RULE-SET,OpenAI,OpenAI",
"RULE-SET,lancidr,全局直连,no-resolve",
"RULE-SET,cncidr,全局直连,no-resolve",
"RULE-SET,telegramcidr,电报消息,no-resolve",
// 其他规则
"GEOIP,LAN,全局直连,no-resolve",
"GEOIP,CN,全局直连,no-resolve",
"MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
"interval": 300,
"timeout": 3000,
"url": "https://www.gstatic.com/generate_204",
"lazy": true,
"max-failed-times": 3,
"hidden": false
};

// 程序入口
function main(config) {
const proxyCount = config?.proxies?.length ?? 0;
const proxyProviderCount =
typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
if (proxyCount === 0 && proxyProviderCount === 0) {
throw new Error("配置文件中未找到任何代理");
}
// 覆盖原配置中DNS配置
config["dns"] = dnsConfig;

// 覆盖原配置中的代理组
config["proxy-groups"] = [
{...groupBaseOption,
"name": "节点选择",
"type": "select",
"proxies": ["香港节点", "美国节点", "日本节点","全局直连"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
},
{...groupBaseOption,
"name": "香港节点",
"type": "url-test",
"include-all": true,
"filter": "(?=.*(🇭🇰|港|HK|Hong kong|hongkong))^((?!(IEPL)).)*$",
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
},
{...groupBaseOption,
"name": "香港优点",
"type": "url-test",
"include-all": true,
"filter": "🇭🇰|港|HK|Hong kong|hongkong",
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg"
},
{...groupBaseOption,
"name": "美国节点",
"type": "url-test",
"include-all": true,
"filter": "🇺🇸|US|美|United States|UnitedStates",
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg"
}, 
{...groupBaseOption,
"name": "美国优点",
"type": "url-test",
"include-all": true,
"filter": "(?=.*(🇺🇸|美|US|United States|UnitedStates))^((?!(IEPL)).)*$",
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg"
}, 
{...groupBaseOption,
"name": "日本节点",
"type": "url-test",
"include-all": true,
"filter": "日本|川日|东京|大阪|泉日|埼玉|沪日|深日|(?<!尼|-)日|JP|Japan|🇯🇵",
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg"
}, 
{...groupBaseOption,
"name": "谷歌服务",
"type": "select",
"proxies": ["香港节点", "美国节点", "日本节点","全局直连"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
},
{...groupBaseOption,
"name": "国外媒体",
"type": "select",
"proxies": ["香港节点", "美国节点", "全局直连"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
},
{...groupBaseOption,
"name": "电报消息",
"type": "select",
"proxies":["香港优点", "美国优点"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
},
{...groupBaseOption,
"name": "OpenAI",
"type": "select",
"proxies": ["香港优点", "美国优点"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
},
{...groupBaseOption,
"name": "微软服务",
"type": "select",
"proxies": ["香港节点", "美国节点", "全局直连"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
},
{...groupBaseOption,
"name": "苹果服务",
"type": "select",
"proxies": ["香港节点", "美国节点", "全局直连"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
},
// 全局直连：测速显示绿色延迟
{
  "name": "全局直连",
  "type": "select",
  "proxies": ["DIRECT"],
  "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
},
// 广告过滤：固定为 REJECT，不测速
{
  "name": "广告过滤",
  "type": "select",
  "proxies": ["REJECT"],
  "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
},
// 全局拦截：固定为 REJECT，不测速
{
  "name": "全局拦截",
  "type": "select",
  "proxies": ["REJECT"],
  "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
},
{...groupBaseOption,
"name": "漏网之鱼",
"type": "select",
"proxies": ["香港节点", "美国节点", "全局直连"],
"icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
}];

// 覆盖原配置中的规则
config["rule-providers"] = ruleProviders;
config["rules"] = rules;

// 返回修改后的配置
return config;
}