const packageJson = require('../../package.json');


let getVersion = (req, res) => {
    return res.json({'version': packageJson.version});
};


export {getVersion};