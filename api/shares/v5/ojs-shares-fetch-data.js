
/*
* mục đích : các hàm fetch data


*/


const fetch = require('node-fetch');


const ojs_shares_fetch_data = {

	//
	//gọi api kèm token (phương thức get)
	get_data_send_token_get : async function (url, token) {
		const response = await fetch(url, {
			method: 'GET', 
			headers: {
			  'token' : token
			}
		});
		return response.json();
	},	
	
	//
	//gọi api kèm token (phương thức get dùng cho ghtk)
	get_data_send_token_get_ghtk : async function (url, token) {
		//return [url,token];
		const response = await fetch(encodeURI(url), {
			method: 'GET', 			
			headers: {
			  'Token' : token,
			  'Content-Type' : 'aplication/json',
			  'Accept': 'application/json, text/plain'
			}
		});;

		return response.json();		
		
		
	},

	//
	//
	//
	//	
	//@@@@@@@@@@@@@@@@		
	//gọi api kèm token (phương thức post)
	get_data_send_token_post_ghtk : async function (url, data, token) {
		const response = await fetch(url, {
			method: 'POST', 
			headers: {
			  'Content-Type': 'application/json',
			  'Token' : token,
			  'Accept': 'application/json, text/plain' 
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},	
	
	//
	//
	//
	//	
	//@@@@@@@@@@@@@@@@		
	//gọi api kèm token (phương thức post)
	get_data_send_token_post : async function (url, data, token) {
		const response = await fetch(url, {
			method: 'POST', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json',
			  'token' : token
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},		
	//
	//lấy api không cần gữi token trên header
	//phương thức post
	//@@@@@@@@@@@@@@@@
	
	get_data_no_token_post : async function (url, data) {
		const response = await fetch(url, {
			method: 'POST', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json'
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},		
	//
	//lấy api không cần gữi token trên header
	//phương thức post
	//@@@@@@@@@@@@@@@@
	get_data_no_token_get : async function (url) {
		const response = await fetch(url, {
			method: 'GET'
		});
		return response.json();
	},//end of function

	//@@
	//@@
	//gọi api kèm token (phương thức put)
	get_data_send_token_put : async function (url, data, token) {
		const response = await fetch(url, {
			method: 'PUT', 
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json',
			  'token' : token
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data) 
		});
		return response.json();
	},	
	//
	//@@
	//@@
	//@@
	//@@	
	//gọi api kèm token (phương thức delete)
	get_data_send_token_delete : async function (url, token) {
		const response = await fetch(url, {
			method: 'DELETE', 
			headers: {
			  'token' : token
			}
		});
		return response.json();
	}

	
}//end of oj_loader


module.exports = ojs_shares_fetch_data;




