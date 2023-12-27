function getDataType(target) {
  let type = typeof target
  if (type === 'object') {
    return Object.prototype.toString.call(target).replace(/^[object (\S+)]$/, '$1').toLowerCase();
  } else {
    return type
  }
}

export default getDataType
