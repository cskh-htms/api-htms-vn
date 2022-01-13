

const shares_all_api = {
	rename_key : (object, key, new_key) => {
		  const cloned_obj = shares_all_api.clone(object);
		  const target_key = cloned_obj[key];
		  delete cloned_obj[key];
		  //@
		  cloned_obj[new_key] = target_key;
		  //@
		  //@
		  return cloned_obj;
	},
	clone : (obj) => Object.assign({}, obj)	
}//end of oj_loader


module.exports = shares_all_api;




