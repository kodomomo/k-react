const tagRegex = /<[a-z]{1,}.*?>.*<\/[a-z]{1,}.*?>/;
const tagRegexWithNL = /\n?.+<[a-z]{1,}.*?>.*<\/[a-z]{1,}.*?>\n/g;

const React = (() => {
  const stringToHTMLElement = (parent, string) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = string;
    parent.innerHTML = wrapper.querySelector("*").innerHTML;
    return parent;
  };
  const render = (Component, Child, params) => {
    let { jsx, component, method } = Component({
      child: Child ? Child : "",
      ...params,
    });
    let dom = new DOMParser().parseFromString(jsx, "text/xml").getRootNode();
    let parent = document.createElement(
      dom.getRootNode().firstElementChild.tagName
    );
    const attributes = getAttribute(jsx);
    for (let attribute in attributes) {
      const attributeValue = attributes[attribute];
      if (method[attributeValue]) {
        dom.addEventListener(attributeValue, method[attributeValue]);
        dom[attribute] = method[attributeValue];
        parent.addEventListener(attributeValue, method[attributeValue]);
        parent[attribute] = method[attributeValue];
      }
    }
    if (!component) {
      return stringToHTMLElement(parent, jsx);
    }

    for (let child of jsx.matchAll(/<(\S*?)[^>]*>.*?<\/\1>|<.*?\/>/g)) {
      let data = getAttribute(child[0]);
      parent.appendChild(
        render(component[child[0].match(/([a-zA-Z])+/)[0]], data.child, data)
      );
    }
    // const childs = jsx.replaceAll(
    //   /<(\S*?)[^>]*>.*?(<\/\1>|<.*?\/>)/g,
    //   (child) => {
    //     let data = getAttribute(child);
    //     return render(
    //       component[child.match(/([a-zA-Z])+/)[0]],
    //       data.child,
    //       data
    //     );
    //   }
    // );
    return parent;
  };
  return {
    render,
  };
})();

const getAttribute = (component) => {
  const params = component.matchAll(/\w*?=\".*?\"/g);
  let data = {};
  for (let param of params) {
    const attributeName = param[0].substring(0, param[0].indexOf("="));
    const attributeValue = param[0].substring(
      param[0].indexOf('"') + 1,
      param[0].length - 1
    );
    data[attributeName] = attributeValue;
  }

  return data;
};

export default React;
