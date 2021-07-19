import React from './';

const initApp = (rootId, component) => {
    document.getElementById(rootId).append(React.render(component));
}

export default initApp;