import {type GatsbyFunctionRequest, type GatsbyFunctionResponse} from 'gatsby';

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
	const fileId = req.params.id;
	const pdf = 'http://localhost:8888/api/cs/v1/channel-comparision/' + fileId;

	res.redirect(pdf);
};

export default handler;
