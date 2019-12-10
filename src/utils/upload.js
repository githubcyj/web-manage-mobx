import React from 'react';

/**
 * Upload工具类
 *
 * @author chenlongtao
 */
class UploadUtil {
  /**
   * 获取上传url
   * @returns {string}
   */
  getUploadUrl = () => {
    const url = window.contextPath + window.apiPrifix + "/api/media/upload?type=image";
    return url;
  };
  getUploadOpenUrl = () => {
    const url = window.contextPath + window.apiPrifix + "/api/media/upload?type=image&open=1";
    return url;
  };
  getUploadAction = type => {
    const url = window.contextPath + window.apiPrifix + "/api/media/upload?type="+ type;
    return url;
  };
  getUploadOpenAction = type => {
    const url = window.contextPath + window.apiPrifix + "/api/media/upload?type="+ type+"&open=1";
    return url;
  };
}

export default new UploadUtil();
