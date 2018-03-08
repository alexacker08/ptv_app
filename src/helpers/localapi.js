
function createLocal(){
	if(!window.localStorage.ptv){
		window.localStorage.ptv = {};
		return false;	
	}
	console.log('Local created. Nothing else to see here....')	
}


function addFavorite(){


}

function deleteFavorite(){


}

module.exports = {
	createLocal,
	addFavorite,
	deleteFavorite
}