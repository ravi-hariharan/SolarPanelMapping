// JavaScript Document
var globalpage;
var globallastid;

function savecomment()
{	
	text=document.formcomments.text.value;
	page=document.formcomments.page.value;
	name=document.formcomments.name.value;
	globalpage=page;
	
	//Create a boolean variable to check for a valid MS instance.
	var xmlhttp = false;
	
	//Check if we are using IE.
	try {
		//If the javascript version is greater than 5.
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		//If not, then use the older active x object.
		try {
			//If we are using IE.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			//Else we must be using a non-IE browser.
			xmlhttp = false;
		}
	}
	
	//If we are using a non-IE browser, create a javascript instance of the object.
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	
	
    xmlhttp.onreadystatechange=function()
	{
      	if(xmlhttp.readyState==4)
        {
			globallastid=xmlhttp.responseText;
	
			document.formcomments.text.value="";
			document.formcomments.name.value="";
			
			// Get date, month and year
			today=new Date();
			day=today.getDate().toString();
			jsmonth=today.getMonth();
			jsyear=today.getFullYear().toString();
			// Convert Month to 12 unit measure
			month=(jsmonth + 1).toString();
			// Output month in two digits
			if (month.length != 2) {
			month="0" + month  }
			// Output year in two digits
			year=jsyear;
			// Output day in two digits
			if (day.length != 2) {
			day="0" + day  }
			// Output date in DD/MM/YYYY format
			todayDate=(day +"/"+ month +"/"+ year);

			if (name!="")
			{
				datename="By "+name+" on "+todayDate;
			}
			else
			{
				datename="On "+todayDate;
			}
	
			livedel ="<a href='#allcomments' onclick='delcomment()'>Delete This Comment</a>";
			
			
					
			document.getElementById("livecomment").innerHTML="<a name='newcomment' id='newcomment'></a><blockquote>"+ text +"<br/> "+datename+"<br/>"+livedel+"</blockquote>";
				
				
			document.getElementById("addcommentform").innerHTML="<p><a href='#newcomment'>Thank you, your comment has been added above.</a></p>";
				
        	}
      	};
	  	xmlhttp.open("GET","../../includes/ajax/addnewcomment.php?text="+escape(text)+"&name="+name+"&page="+page,true);
	 	xmlhttp.send(null);	
}

function delcomment()
{	
	document.getElementById("livecomment").innerHTML="";
	document.getElementById("addcommentform").innerHTML="<div id='addcommentform'><p><strong>Add your own comment</strong> below and let others know what you think:</p><form name='formcomments' id='formcomments' method='Post' onSubmit='return false;'><div class='row uniform 50%'><div class='12u$'><textarea name='text' id='text' placeholder='Enter your message' rows='6'></textarea></div><div class='12u$'><input type='text' name='name' id='name' value='' placeholder='Your Name (optional)' /></div><div class='12u$'><input name='page' type='hidden' value=''.$pagetoinc.''/></div><div class='12u$'><ul class='actions'><li><input type='submit' value='Send Message' onclick='savecomment();'/></li></ul></div></div></form></div>";
			

	
	//Create a boolean variable to check for a valid MS instance.
	var xmlhttp = false;
	
	//Check if we are using IE.
	try {
		//If the javascript version is greater than 5.
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		//If not, then use the older active x object.
		try {
			//If we are using IE.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			//Else we must be using a non-IE browser.
			xmlhttp = false;
		}
	}
	
	//If we are using a non-IE browser, create a javascript instance of the object.
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	
	xmlhttp.onreadystatechange=function()
    {
      	if(xmlhttp.readyState==4)
        {
			document.formcomments.text.value="";
			document.formcomments.name.value="";	
        }
   	};
	xmlhttp.open("GET","../../includes/ajax/deletenewcomment.php?id="+globallastid,true);
	
	xmlhttp.send(null);	
}

function seeallcomments()
{
	document.getElementById("previouscomments").innerHTML="<img alt='Loading' src='images/loading.gif' />";
	page=document.formcomments.page.value;
	
	//Create a boolean variable to check for a valid MS instance.
	var xmlhttp = false;
	
	//Check if we are using IE.
	try {
		//If the javascript version is greater than 5.
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		//If not, then use the older active x object.
		try {
			//If we are using IE.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			//Else we must be using a non-IE browser.
			xmlhttp = false;
		}
	}
	
	//If we are using a non-IE browser, create a javascript instance of the object.
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	
	xmlhttp.onreadystatechange=function()
    {
      	if(xmlhttp.readyState==4)
        {
			document.getElementById("previouscomments").innerHTML=xmlhttp.responseText;;
        }
   	};
	xmlhttp.open("GET","../../includes/ajax/seeallcomments.php?pagetoinc="+page,true);
	xmlhttp.send(null);		
}