import {Avatar} from 'antd';
import React from 'react';

const NODE_ENV = process.env.NODE_ENV;
/**
 * Media工具类
 *
 * @author chenlongtao
 */
class MediaUtil {
  /**
   * 获取素材url
   * @param mediaId 素材id
   * @returns {string}
   */
  getMediaUrl = (mediaId) => {
    const url = window.contextPath + window.apiPrifix + '/api/media/get?media_id=' + mediaId + (NODE_ENV === 'development'?"&access_token=" + localStorage.getItem("access_token"):'');
    return url;
  }

  getLogoUrl = (mediaId, defaultLogo) => {
    let url = "";
    if (null != mediaId && "null" != mediaId && "" != mediaId) {
      url = window.contextPath + window.apiPrifix + '/api/media/get?media_id=' + mediaId + (NODE_ENV === 'development'?"&access_token=" + localStorage.getItem("access_token"):'');
    } else if (null != defaultLogo && "null" != defaultLogo && "" != defaultLogo) {//使用默认图标
      url = window.staticcdnurl + defaultLogo;
    }
    return url;
  }

  getAvatar = (avatar) => {
    try{
      avatar = JSON.parse(avatar);
      let avatarstr = "";
      let url = "";
      if (null != avatar.media_id && "null" != avatar.media_id && "" != avatar.media_id) {//使用设置的图标
        url = window.contextPath + window.apiPrifix + '/api/media/get?media_id=' + avatar.media_id + (NODE_ENV === 'development'?"&access_token=" + localStorage.getItem("access_token"):'');
        avatarstr = <Avatar className="main-header-right-account-avatar" src={url}/>;
      } else if (null != avatar.default && "null" != avatar.default && "" != avatar.default) {//使用默认的图标
        url = window.staticcdnurl + avatar.default;
        avatarstr = <Avatar className="main-header-right-account-avatar" src={url}/>;
      } else {
        avatarstr = <Avatar className="main-header-right-account-avatar"
                            style={{color: '#ffffff', backgroundColor: avatar.show_color}}>{avatar.show_name}</Avatar>;
      }
      return avatarstr;
    } catch(err){
      console.log(err);
    }
  }
}

export default new MediaUtil();