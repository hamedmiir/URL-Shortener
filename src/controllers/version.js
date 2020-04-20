import npmPackage from '../../package.json';

const getVersion = (req, res) => {
	res.status(200).json({
		version: npmPackage.version
	});
};

export default getVersion;