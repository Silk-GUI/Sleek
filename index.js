Silk.methods.add({
	'sleek/apps': function (data, call_obj, send) {
		return Silk.api.listen('apps/list', {}, function (err, data) {
			send(null, data);
		});
	}
});