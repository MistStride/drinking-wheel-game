// 把题库内联进 app.src.html，生成真正单文件 app.html
// 用法: node build.js
'use strict';
const fs = require('fs');
const path = __dirname;

const src = fs.readFileSync(path + '/app.src.html', 'utf8');
const QB = require('./question-bank.json');

// 占位符必须存在
if (!src.includes('/*__QUESTION_BANK__*/')) {
  console.error('未找到占位符 /*__QUESTION_BANK__*/');
  process.exit(1);
}
// 防止 JSON 中出现 </script> 截断（理论上纯 JSON 不会，这里做兜底）
const bankJson = JSON.stringify(QB);
if (bankJson.includes('</script')) {
  console.error('题库 JSON 中含 </script，存在注入风险，已中止');
  process.exit(1);
}
const bank = 'window.QUESTION_BANK = ' + bankJson + ';\n';

// 自定义题库指南：把 md 内联为 window.GUIDE_MD，供「下载题库指南」按钮直接导出
if (!src.includes('/*__GUIDE_MD__*/')) {
  console.error('未找到占位符 /*__GUIDE_MD__*/');
  process.exit(1);
}
let guideJson = JSON.stringify(fs.readFileSync(path + '/自定义题库指南.md', 'utf8'));
// 防止 md 内出现 </script> 截断脚本块
if (guideJson.includes('</script')) {
  console.error('指南 md 中含 </script，存在注入风险，已中止');
  process.exit(1);
}
const guide = 'window.GUIDE_MD = ' + guideJson + ';\n';

const out = src.replace('/*__QUESTION_BANK__*/', bank).replace('/*__GUIDE_MD__*/', guide);
fs.writeFileSync(path + '/app.html', out);
// GitHub Pages 访问根网址时默认打开 index.html，故同步写一份，保证线上 = 最新 app
fs.writeFileSync(path + '/index.html', out);
console.log('已生成 app.html / index.html（自包含单文件），大小 =', (out.length / 1024).toFixed(1), 'KB');
console.log('题库内联题数 =', QB.questions.length, '；仍依赖外部 CDN: lucky-canvas');
