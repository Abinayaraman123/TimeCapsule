const form=document.getElementById("capsuleForm");
const container=document.getElementById("capsuleContainer");

form.addEventListener("submit",function(e){
e.preventDefault();

const title=document.getElementById("title").value;
const recipient=document.getElementById("recipient").value;
const message=document.getElementById("message").value;
const open_date=document.getElementById("open_date").value;

const data=new FormData();
data.append("title",title);
data.append("recipient",recipient);
data.append("message",message);
data.append("open_date",open_date);

fetch("save_capsule.php",{
method:"POST",
body:data
})
.then(response=>response.text())
.then(result=>{
alert(result);
form.reset();
loadCapsules();
document.getElementById("capsules").scrollIntoView({behavior:"smooth"});
})
.catch(error=>{
alert("Something went wrong!");
});
});

function loadCapsules(){
fetch("get_capsules.php")
.then(response=>response.json())
.then(data=>{
container.innerHTML="";

if(data.length===0){
container.innerHTML='<p class="loading">No time capsules created yet.</p>';
return;
}

data.forEach(capsule=>{
const card=document.createElement("div");
card.className="capsule";

const openTime=new Date(capsule.open_date).getTime();
const now=new Date().getTime();

let status="";
let content="";

if(openTime>now){
status='<span class="status locked-status">🔒 SEALED</span>';
content=`
<div class="countdown" id="timer-${capsule.id}">
Calculating...
</div>`;
}else{
status='<span class="status open-status">🔓 OPEN</span>';
content=`
<div class="message">
${escapeHTML(capsule.message)}
</div>`;
}

card.innerHTML=`
${status}
<h3>${escapeHTML(capsule.title)}</h3>
<div class="recipient">TO: ${escapeHTML(capsule.recipient)}</div>
<p>Opens: ${new Date(capsule.open_date).toLocaleString()}</p>
${content}
`;

container.appendChild(card);

if(openTime>now){
startCountdown(capsule.id,openTime);
}
});
});
}

function startCountdown(id,target){
const timer=setInterval(()=>{
const now=new Date().getTime();
const distance=target-now;
const element=document.getElementById("timer-"+id);

if(!element){
clearInterval(timer);
return;
}

if(distance<=0){
element.innerHTML="🔓 Your capsule is ready to open!";
clearInterval(timer);
setTimeout(loadCapsules,1000);
return;
}

const days=Math.floor(distance/(1000*60*60*24));
const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
const seconds=Math.floor((distance%(1000*60))/1000);

element.innerHTML=`⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
},1000);
}

function escapeHTML(text){
const div=document.createElement("div");
div.textContent=text;
return div.innerHTML;
}

loadCapsules();