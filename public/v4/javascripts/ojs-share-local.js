


/*

[tinh_thanh_datas]
[get_tinh_thanh]
[get_quan_huyen]
[get_phuong_xa]
[set_value_local]



*/






$(document).ready(function($){

ojs_share_local = {
	
	
	
	//@
	//@
	//@	[tinh_thanh_datas]
	tinh_thanh_datas:[],
	//@
	//@
	//@
	//@ [get_tinh_thanh]
	get_tinh_thanh:function(datas){
		let data_return = "";
		let i;
		let txt_for = '<option value=""></option>';
		for(i = 0; i < datas.length ; i ++ ){
			txt_for = txt_for + '<option value="' +  datas[i].Name + '">' + datas[i].Name + '</option>';
		}
		data_return = data_return + txt_for;
		return data_return;
	},	
	
	
	
	
	
	
	//@
	//@
	//@
	//@ [get_quan_huyen]
	get_quan_huyen:function(datas,taget){
		let data_return = "";
		
		let i;
		let txt_for = '<option value=""></option>';
		
		//@
		//@
		for(i = 0; i < datas.length ; i ++ ){
			
			if(datas[i].Name == taget){
				for(let t = 0; t < datas[i].Districts.length ; t ++ ){
					txt_for = txt_for + '<option value="' +  datas[i].Districts[t].Name + '">' + datas[i].Districts[t].Name + '</option>';
				}
			}
			
		}
		
		//@
		//@
		data_return = data_return + txt_for;
		return data_return;
	},	






	//@
	//@
	//@
	//@ [get_phuong_xa]
	get_phuong_xa:function(datas,taget){
		let data_return = "";
		
		//return data_return;
		
		
		let i;
		let txt_for = '<option value=""></option>';
		
		//@
		//@
		for(i = 0; i < datas.length ; i ++ ){
			for(let ii = 0; ii < datas[i].Districts.length ; ii ++ ){
				if(datas[i].Districts[ii].Name == taget){
					for(let t = 0; t < datas[i].Districts[ii].Wards.length ; t ++ ){
						txt_for = txt_for + '<option value="' +  datas[i].Districts[ii].Wards[t].Name + '">' + datas[i].Districts[ii].Wards[t].Name + '</option>';
					}
				}
			}
		}
		
		//@
		//@
		data_return = data_return + txt_for;
		return data_return;
	},	



	
	//@
	//@
	//@
	//@ [set_value_local]
	set_value_local:function(){
		let province  = $('#select_stores_province   option:selected').val();
		let districts = $('#select_stores_district  option:selected').val();
		let wards = $('#select_stores_wards  option:selected').val();
		
		
		$('#stores_province').attr("data_value",province);
		$('#stores_district').attr("data_value",districts);
		$('#stores_wards').attr("data_value",wards);		
	},	



	

//@
//@
//@ end of ojs_stores
}
	
});//end of document jquery











