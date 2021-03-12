const Clarifai =require('clarifai');
const app = new Clarifai.App({
	apiKey: 'c171d5809b68402a8202d7d5cab7c678'
})

const handleApiCall=(req,res)=>
{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	}).catch(err=>res.status(400).json('unable to connect API'))
}

const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users').Where('id','=','id').
	increment('entries',1).
	returning('entries').then(entries=>{
		res.json(entries[0]);
	}).catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
	handleImage: handleImage,
	handleApiCall: handleApiCall
}