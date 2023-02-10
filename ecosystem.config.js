module.exports = {
  apps : [{
    name   : "appdala.com",
    script : "./bin/www",
	  watch: false,
	  ignore_watch: ["node_modules"],
    log_date_format: "YY-MM-DD HH:mm"
  }]
}
