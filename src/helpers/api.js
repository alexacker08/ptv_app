import CryptoJS from 'crypto-js';

const userId = 3000491
const key = 'fc0ff90c-692f-485f-a69c-8b83e61c5f5c';
const baseUrl = 'http://timetableapi.ptv.vic.gov.au';

function fetchInformation(baseSearch){
	const signature = buildSignature(baseSearch,key,userId);
    return fetch(`${baseUrl}${baseSearch}?devid=${userId}&signature=${signature}`,{
      method:'GET',
    }).then(data => data.json())
}

function buildSignature(baseSearch,key,userId){
    const req = `${baseSearch}?devid=${userId}`;
    const encrypt = CryptoJS.HmacSHA1(req,key);
    return encrypt.toString().toUpperCase();
}

export default fetchInformation