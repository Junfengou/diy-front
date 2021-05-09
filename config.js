// This is client side config only - don't put anything in here that shouldn't be public!
export const endpoint = `http://localhost:3000/api/graphql`;
export const prodEndpoint = `https://api.storageback.space/api/graphql`;
export const perPage = 4;

// module.exports = {
// 	async headers() {
// 		return [
// 			{
// 				// matching all API routes
// 				source: "https://api.storageback.space/api/graphql",
// 				headers: [
// 					{ key: "Access-Control-Allow-Credentials", value: "true" },
// 					{
// 						key: "Access-Control-Allow-Origin",
// 						value: "https://api.storageback.space/api/graphql",
// 					},
// 					{
// 						key: "Access-Control-Allow-Methods",
// 						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
// 					},
// 					{
// 						key: "Access-Control-Allow-Headers",
// 						value:
// 							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
// 					},
// 				],
// 			},
// 		];
// 	},
// };
