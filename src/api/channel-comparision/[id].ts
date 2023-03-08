import {CHANNEL_COMPARISION_API} from '../../constants/api';
import {type GatsbyFunctionRequest, type GatsbyFunctionResponse} from 'gatsby';

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
	const fileId = req.params.id;
	const pdf = CHANNEL_COMPARISION_API + fileId;

	res.redirect(pdf);
};

export default handler;
