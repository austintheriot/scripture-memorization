import { AxiosResponse } from 'axios';
import { Genesis3 } from 'app/testChapters';

const axiosReponse: AxiosResponse = {
	data: {
		passages: [Genesis3],
	},
	status: 200,
	statusText: 'OK',
	config: {},
	headers: {},
};

export default {
	default: {
		get: jest
			.fn(() => Promise.resolve(axiosReponse))
			.mockName('Successful ESV API call'),
	},
	get: jest
		.fn(() => Promise.resolve(axiosReponse))
		.mockName('Successful ESV API call'),
};
