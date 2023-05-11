

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
	clone : (obj) => Object.assign({}, obj),
	//function show money 
	//su dung: gia_shipping =  show_price_format(gia_shipping_check,0,",",".","đ")
	// [show_price_format]
	show_price_format:function(ojs,c, d, t,dv){
		var n = ojs, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   var kq =  s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	   return kq + dv;
	},		
}//end of oj_loader


module.exports = shares_all_api;




