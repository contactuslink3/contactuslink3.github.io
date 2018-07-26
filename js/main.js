
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-mYRTguaSxN4cZdosR6h7JWKhqkY85Ak",
    authDomain: "link3-contact-form.firebaseapp.com",
    databaseURL: "https://link3-contact-form.firebaseio.com",
    projectId: "link3-contact-form",
    storageBucket: "link3-contact-form.appspot.com",
    messagingSenderId: "205017504615"
  };
  firebase.initializeApp(config);
  
  var dataRef = firebase.database().ref('Customer');
  
// Listen for form submit
	document.getElementById('contact-form').addEventListener('submit', submitForm);

  
  var uploader_photo =document.getElementById('uploader-photo');
  var photo = document.getElementById('photo');
  var uploader_nid =document.getElementById('uploader-nid'); 
  var nid = document.getElementById('nid');
	var file_photo ;
  var file_nid ;
  var Photolink ,NIDlink;

  
  photo.addEventListener('change',  (e)=>{ 
   file_photo = e.target.files[0];
   var task_photo = firebase.storage().ref('photo/'+ file_photo.name).put(file_photo);
   task_photo.on('state_changed',(snapshot)=>{
   var par = snapshot.bytesTransferred / snapshot.totalBytes * 100;
   uploader_photo.value = par;
 },(err2)=>{console.log(err2);},
 ()=>{
   task_photo.snapshot.ref.getDownloadURL().then(downloadURL=> {
     console.log('File available at 2', downloadURL);
	 alert('Photo Uploaded Successfully.');
     Photolink = downloadURL;
    
   })
 })
  
 });

  nid.addEventListener('change', (e)=>{
      file_nid = e.target.files[0]; 
      var task_nid = firebase.storage().ref('nid/'+ file_nid.name).put(file_nid);
      task_nid.on('state_changed',(snapshot)=>{
        var par = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        uploader_nid.value = par;
      },(err)=>{console.log(err);},
      ()=>{
        task_nid.snapshot.ref.getDownloadURL().then(dlURL=> {
          console.log('File available at 1', dlURL);
		  alert('NID Uploaded Successfully.');
          NIDlink = dlURL;
        })
      })
   });


function submitForm(e){
   e.preventDefault();
  //console.log('submitted');
	var name = getInputVal('name');
	var email = getInputVal('email');
	var phone = getInputVal('phone');
	var address = getInputVal('address');
	var applied_package =  getInputVal('applied_package');
 
  saveData(name, phone, email, address, NIDlink ,Photolink, applied_package);
  document.getElementById('thankyou').style.display = 'block';
  document.getElementById('contact-form').reset();
  document.getElementById('uploader-photo').value = '0';
  document.getElementById('uploader-nid').value = '0';
  setTimeout(function(){
    document.getElementById('thankyou').style.display = 'none';
	}, 4000);
  
}
  
function getInputVal(id){
  return document.getElementById(id).value;
}
function saveData(name, phone, email, address,NIDlink ,Photolink, applied_package){
  var newDataRef = dataRef.push();
  console.log('Called 3',NIDlink,Photolink);
    newDataRef.set({
      name: name,
      phone:phone,
      email:email,
      address:address,
      NIDlink,
      Photolink,
	applied_package: applied_package
    });
}




