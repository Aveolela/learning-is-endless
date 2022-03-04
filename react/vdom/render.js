// 执行createElement后得到下面的vdom
// const App = {
//   "type": "div",
//   "props": {
//     "children": [
//       {
//         "type": "h1",
//         "props": {
//           "id": "title",
//           "children": [
//             "Title"
//           ]
//         }
//       },
//       {
//         "type": "a",
//         "props": {
//           "href": "xxx",
//           "children": [
//             "Jump"
//           ]
//         }
//       }
//     ]
//   }
// }
export function render(vdom, container) {
  let dom;
  if (typeof vdom !== 'object') {
    dom = document.createTextNode(vdom)
  } else {
    dom = document.createElement(vdom.type)
  }

  if (vdom.props) {
    Object.keys(vdom.props)
      .filter(key => key !== 'children')
      .forEach(key => dom[key] = vdom.props[key])
  }

  if (vdom.props?.children?.length) {
    vdom.props.children.forEach(child => render(child, dom))
  }

  container.appendChild(dom)
}