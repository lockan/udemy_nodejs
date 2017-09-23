function doWork() {
	throw new Error("UNABLE TO DO WORK");
}


try { 
	doWork();
}
catch (err) {
	console.log("CATCH!");
	console.log(err.message);
}
finally {
	console.log("Finally");
}