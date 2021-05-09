// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:3000/api/graphql`;
export const prodEndpoint = `https://api.storageback.space/api/graphql`;
export const perPage = 4;
export const prodEndpoint = `hmm`;
module.exports = {
	async headers() {
		return [
			{
				// matching all API routes
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		];
	},
};
