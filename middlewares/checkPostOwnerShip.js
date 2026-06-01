// TODO: Implement owner middleware
const checkPostOwnerShip = async (req, res, next) => {
	console.log('Implement post owner middleware');
	next();
};

export default checkPostOwnerShip;
