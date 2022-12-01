var text, maxTime, pau, Res, newG, time=0,hs=0,timeVar,correctcpm=0,err=0,max=0,typedsent="",flag=0,x=0,quotedsent="",newsent="";

function Timeselected()
{
   var y=document.getElementById("time").value;
   if(y=='1')
   maxTime=60;
   if(y=='2')
   maxTime=120;
   if(y=='3')
   maxTime=180;
   if(y=='5')
   maxTime=300;
}
function Levelselected()
{
    
    var x=document.getElementById("level").value;
    if(x=='B')
    text=paraBeg;
    if(x=='M')
    text=paraMed;
    if(x=='E')
    text=paraEasy;
    if(x=='D')
    text=paraDiff;
}
function opengame()//handles the main game
{
    if(document.getElementById("level").value=='0' || document.getElementById("time").value=='0')
   { alert("PLEASE SELECT THE FIELDS");}
    else
    {
   document.getElementById('start').disabled=true;

   pau=document.createElement('button');
   pau.id='pause';
   pau.innerHTML="Pause";
   pau.disabled=true;
   document.getElementById('buttons').appendChild(pau);
   pau.setAttribute("onclick",'Pause()');

   Res=document.createElement('button');
   Res.id='restart';
   Res.innerHTML="Restart";
   document.getElementById('buttons').appendChild(Res);
   Res.setAttribute("onclick",'Restart()');
   
   newG=document.createElement('button');
   newG.id='newG';
   newG.innerHTML="Start New Game";
   document.getElementById('buttons').appendChild(newG);
   newG.setAttribute("onclick",'startnewGame()');

    quotedsent="";
    quotedsent=text[Math.floor(Math.random()*text.length)]+" ";
    document.getElementById("text").innerHTML=='';
    x=0;
    quotedsent.split('').forEach(chara =>{
        const charSpan=document.createElement('span');
        charSpan.id=`${x++}`;
        charSpan.innerHTML=chara;
        document.getElementById('text').appendChild(charSpan);
    });
    
    document.getElementById('typebox').disabled=false;
    document.getElementById(`${0}`).setAttribute('class',"current");
    document.getElementById("count").innerHTML=maxTime;
    
    
    max=0;
    document.getElementById('typebox').addEventListener('input',function()
{
    if(flag==0)
    {
        pau.disabled=false;
        flag=1;
        timefun();
    }
   typedsent=document.getElementById("typebox").value;
  if(typedsent!=""){
   
correctcpm=0;err=0;
document.getElementById(`${typedsent.length-1}`).removeAttribute('class');//to remove highlight from a character after it is being typed
 for(let i=0;i<typedsent.length;i++)
  {
if(typedsent.charAt(i)!=quotedsent.charAt(i))
{
    document.getElementById(`${i}`).style.color='red';
    document.getElementById(`${i}`).style.textDecoration="underline";
    err++;
}
else if(typedsent.charAt(i)==quotedsent.charAt(i))
{
    document.getElementById(`${i}`).style.color='blue';
    document.getElementById(`${i}`).style.textDecoration="none";
    correctcpm++;
}
}
}
  
if(typedsent.length==quotedsent.length-10)
{
    newsent=text[Math.floor(Math.random()*text.length)]+" ";
    quotedsent+=newsent;
    newsent.split('').forEach(chara =>{
        const charSpan=document.createElement('span');
        charSpan.id=`${x++}`;
        charSpan.innerHTML=chara;
        document.getElementById('text').appendChild(charSpan);
    });
}

if(typedsent.length>max)
max=typedsent.length;
else
{
    let j=0;
    if(typedsent!="")
    j=typedsent.length;
for(;j<=max;j++)
{
    document.getElementById(`${j}`).style.color='black';
    document.getElementById(`${j}`).style.textDecoration="none";
    document.getElementById(`${j}`).removeAttribute('class');
} 
}
document.getElementById(`${typedsent.length}`).setAttribute('class',"current");
});
}}

function timefun()
{
    timeVar=setInterval(timer,1000);
}
function timer()
{
    time=parseInt(document.getElementById("count").innerHTML);
    document.getElementById("count").innerHTML=time-1;
    if(time==1)
    TimeUP();
}
function TimeUP()
{
    clearInterval(timeVar);
    alert("Time Up! Check your results below!!");
    document.getElementById('cpm').innerHTML=(correctcpm*60/maxTime);
    document.getElementById('wpm').innerHTML=(correctcpm*12/maxTime);
    document.getElementById('errors').innerHTML=err;
    document.getElementById('accuracy').innerHTML=(correctcpm*100)/(correctcpm+err)+'%';
    if((correctcpm*12/maxTime)>hs){
        hs=correctcpm*12/maxTime;
    document.getElementById('highscore').innerHTML=hs;
    }
    document.getElementById('typebox').disabled=true;
    document.getElementById('pause').disabled=true;
    document.getElementById(`${typedsent.length}`).removeAttribute('class');
}
function Pause()//pauses timer
{
    if(time!=0){
    if(document.getElementById('pause').innerHTML=='Pause'){
    document.getElementById("pause").innerHTML='Play';
    clearInterval(timeVar);
    document.getElementById('typebox').disabled=true;
}
else
{
    document.getElementById("pause").innerHTML='Pause';
    document.getElementById('typebox').disabled=false;
    timefun();
}
}
}
function Restart()//restarts timer with same paragraph
{
    document.getElementById(`${typedsent.length}`).removeAttribute('class');
    document.getElementById(`${0}`).setAttribute('class',"current");
    clearInterval(timeVar);
    time=maxTime;
    document.getElementById("count").innerHTML=time;
    document.getElementById('typebox').value="";
    document.getElementById('pause').innerHTML='Pause';
    for(let j=0;j<max;j++)
{
    document.getElementById(`${j}`).style.color='black';
    document.getElementById(`${j}`).style.textDecoration="none";
}
max=0;
document.getElementById('pause').disabled=true;
document.getElementById('cpm').innerHTML="";
    document.getElementById('wpm').innerHTML='';
    document.getElementById('errors').innerHTML='';
    document.getElementById('accuracy').innerHTML='';
    document.getElementById('typebox').disabled=false;
    flag=0;
}
function startnewGame()//resets every parameter
{
    document.getElementById("time").value='0';
    document.getElementById("level").value='0';
    Restart();
    document.getElementById('typebox').disabled=true;
    document.getElementById('start').disabled=false;
    document.getElementById("count").innerHTML="";
    document.getElementById("text").innerHTML="";
    document.getElementById('buttons').removeChild(pau);
    document.getElementById('buttons').removeChild(Res);
    document.getElementById('buttons').removeChild(newG);
}