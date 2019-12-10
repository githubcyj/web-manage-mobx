/**
 * 异步组织架构树深层操作
 * @param tree
 * @param id
 * @param newChild
 */
const mapTree = (tree,id,newChild) => {
  tree.forEach(item => {
    if (item.id == id) {
      item.children = newChild;
    } else if (item.children) {
      mapTree(item.children,id,newChild);
    }
  })
};
/**
 * 异步组织架构树查找父节点
 */
const findParentid = (tree,id) => {
  if (id === 1) {
    return 0
  }
  for(let item of tree) {
    if (item.id == id) {
      return item.parentid;
    }

    if(item.children) {
      return findParentid(item.children,id)
    }
  }
};

/**
 * 修改store数据（三层）
 */
const setData = function (key,val) {
  switch (key.length) {
    case 1:
      this[key[0]] = val;
      break;
    case 2:
      this[key[0]][key[1]] = val;
      break;
    case 3:
      this[key[0]][key[1]][key[2]] = val;
      break;
  }
};

const trim = (value) => {
  if (value){
    return value.replace(/(^\s*)|(\s*$)/g, "")
  } else {
    return value
  }
};

export {
  mapTree,
  findParentid,
  setData,
  trim
};