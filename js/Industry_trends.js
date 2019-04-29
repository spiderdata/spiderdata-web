$(function () {
	updateTop();
});

function parseAvgSalary(data){
	let jobs = data['body']['jobs'];
	let pythonInfo = jobs['python'];
	let javaInfo = jobs['java'];

	let pythonMin = [
		pythonInfo['1年以下']['min_avg'],
		pythonInfo['1-3年']['min_avg'],
		pythonInfo['3-5年']['min_avg'],
		pythonInfo['5-10年']['min_avg'],
		pythonInfo['10年以上']['min_avg']
	];
	let pythonMax = [
		pythonInfo['1年以下']['max_avg'],
		pythonInfo['1-3年']['max_avg'],
		pythonInfo['3-5年']['max_avg'],
		pythonInfo['5-10年']['max_avg'],
		pythonInfo['10年以上']['max_avg']
	];

	let javaMin = [
		javaInfo['1年以下']['min_avg'],
		javaInfo['1-3年']['min_avg'],
		javaInfo['3-5年']['min_avg'],
		javaInfo['5-10年']['min_avg'],
		javaInfo['10年以上']['min_avg']
	];
	let javaMax = [
		javaInfo['1年以下']['max_avg'],
		javaInfo['1-3年']['max_avg'],
		javaInfo['3-5年']['max_avg'],
		javaInfo['5-10年']['max_avg'],
		javaInfo['10年以上']['max_avg']
	];

	let avgSalary = {
		'pythonMin': pythonMin,
		'pythonMax': pythonMax,
		'javaMin': javaMin,
		'javaMax': javaMax,
	};

	return avgSalary
}
