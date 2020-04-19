
const path = require('path');


const toKebabCase = function (text) {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
};


const getMarkdownFileName = function(story) {
    return path.join(__dirname, '../../docs', `${toKebabCase(story.title)}.md`);
};


export {getMarkdownFileName};

