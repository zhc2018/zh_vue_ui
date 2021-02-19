
export function isVNode (node) {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}