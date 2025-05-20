/**
 * @file  GitHub仓库信息测试脚本
 * @author caodw
 * @createDate 2024-05-20
 * 
 * 该脚本用于测试GitHub API调用模块的功能完整性
 * 包含详细的错误处理和调试日志输出功能
 */
 
const { fetchRepos, fetchRepoContents } = require('./github-api.js');
 
(async () => {
  try {
    console.log('开始获取仓库信息...');
    const repos = await fetchRepos();
    console.log(`成功获取到${repos.length}个仓库`);
    console.log('仓库列表：', repos.map(r => r.full_name));
  } catch (error) {
    console.error('测试失败：', error.message);
    process.exit(1);
  }
})();
 
// 新增仓库内容测试
(async () => {
  try {
    console.log('\n开始获取仓库内容...');
    const contents = await fetchRepoContents('caodw', 'githubtest');
    console.log(`仓库包含 ${contents.length} 个条目`);
    console.log('文件列表：', contents.map(c => c.path));
  } catch (error) {
    console.error('内容测试失败：', error.message);
    process.exit(1);
  }
})();