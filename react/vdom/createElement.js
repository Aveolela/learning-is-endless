export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}
// 这段代码是Babel将JSX转化后的代码
// var App = React.createElement(
//   'div',
//   null,
//   React.createElement(
//     'h1',
//     {
//       id: 'title',
//     },
//     'Title'
//   ),
//   React.createElement(
//     'a',
//     {
//       href: 'xxx',
//     },
//     'Jump'
//   ),
//   React.createElement(
//     'section',
//     null,
//     React.createElement('p', null, 'Article1'),
//     React.createElement('p', null, 'Article2')
//   )
// );

