// 新增GitHub API调用模块
/**
 * @file GitHub API调用模块
 * @author caodw
 * @createDate 2024-05-20
 * @lastModifiedDate 2024-05-21
 * 
 * 该模块提供GitHub仓库相关API的封装
 * 包含仓库列表获取、仓库内容查看等功能
 */

module.exports.fetchRepos = async () => {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN未配置');

    const response = await fetch('https://api.github.com/user/repos', {
      headers: { Authorization: `token ${token}` }
    });

    console.log(`API响应状态: ${response.status}`);
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API请求失败: ${response.status} - ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('仓库获取失败:', error.message);
    throw error;
  }
};

/**
 * 获取指定仓库的内容列表
 * @param {string} owner 仓库所有者
 * @param {string} repo 仓库名称
 * @param {string} [path=''] 查看路径（默认为仓库根目录）
 * @returns {Promise<Array>} 包含文件元数据的数组
 * @throws {Error} 当GITHUB_TOKEN未配置或API请求失败时抛出异常
 */
module.exports.fetchRepoContents = async (owner, repo, path = '') => {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN未配置');

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
    const response = await fetch(apiUrl, {
      headers: { Authorization: `token ${token}` }
    });

    console.log(`内容请求状态: ${response.status}`);
    if (response.status === 404) {
      throw new Error('仓库不存在或无权访问');
    }
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`内容请求失败: ${response.status} - ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('内容获取失败:', error.message);
    throw error;
  }
};