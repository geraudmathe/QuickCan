function QuickCan(){
	
	/*######################################################
	  ####################---PROPERTIES---##################
		######################################################*/

	//general canvas properties 
	this.CanvasId = null;
	this.CanvasDomElement;
	this.c = null;
	this.CanvasWidth = this.CanvasHeight = 0;
	
	//properties relative to font and text
	this.fontfamily = "Arial";
	this.fontcolor = "black";
	this.fontsize = "20px";
	this.textstrokecolor = "black";
	this.textstrokewidth = 2;
	this.textbaseline = "middle";
	this.textalign = "center";
	this.letterHeight = 20;
	this.textRotation = 10;
	this.customFonts = []
	this.linesDrawing = []
	this.isAnimEnded = false
	//properties relative to shapes
	this.strokeColor = "black";
	this.strokeWidth = 2;
	this.defaultlineCap = "butt";
	
	//properties relative to animation
	this.Animateinterval = null;
	this.defaultInterval = 10;
	this.drawCurposX = this.drawCurposY = 0;
	
	
	/*######################################################
	####################---METHODS---#####################
	######################################################*/
	
	this.CanvasInit = function(CanvasId){
		this.CanvasId = CanvasId;
		console.log(document.getElementById(CanvasId))
		if(document.getElementById(CanvasId)!=null){
			this.CanvasDomElement = document.getElementById("canvasi");
			console.log(this)
			this.CanvasWidth = this.CanvasDomElement.width;
			console.log(this.CanvasDomElement)
			this.CanvasHeight = this.CanvasDomElement.height;
			this.c = this.CanvasDomElement.getContext('2d');
		}
		else{
			throw "'Sorry, but the canvas element with an ID = '"+this.CanvasId+"' hasn't been found. Shoot again please'";
		}
		this.CanvasDomElement = null
	};
	
	this.fontDownloaded = function(name) {
    name = name.replace(/['"<>]/g,'');
    report = document.getElementById('installed'),
		body  = document.body,
        test  = document.createElement('div'),
        installed = false,
        ab = null,
        template =
            '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ii</b>'+
            '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ii</b>';
        test.innerHTML = template.replace(/X/g, name);
				test.style.cssText = 'position: absolute; visibility: hidden; display: block !important';
				body.insertBefore(test, body.firstChild);
				ab = test.getElementsByTagName('b');
				installed = ab[0].offsetWidth === ab[1].offsetWidth;
				body.removeChild(test);
				
				return installed;
	}
	
	this.getCursorPosition = function(e) {
		this.CanvasDomElement = document.getElementById("canvasi");
		    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	      x = e.pageX;
	      y = e.pageY;
    }
    else {
	      x = e.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
	      y = e.clientY + document.body.scrollTop +document.documentElement.scrollTop;
    }
    //console.log(this.CanvasDomElement.offsetLeft)
    x -= this.CanvasDomElement.offsetLeft;
    y -= this.CanvasDomElement.offsetTop;
    console.log("clicked(x="+x+", y="+y+") ")
  }
	
	this.enableMouseClickDebug = function(){
			this.CanvasDomElement = document.getElementById("canvasi");
			this.CanvasDomElement.addEventListener("mouseover",this.getCursorPosition,false)
	}
	
	this.setBorder = function(border){
		if(border!=null){
			if(typeof border=="string"){
				this.c.lineWidth = 2;
    		this.c.strokeStyle = border;
			}
			else if(typeof border=="object"){
				if(border.width!=undefined && border.color!=undefined){
					this.c.lineWidth = border.width;
    			this.c.strokeStyle = border.color;
				}
				else{
					throw "the object you've passed for border isnt valid. please Give = {witdth:integer,color:string}";
					return false;
				}
			}
		}
		else{
			this.c.lineWidth = 1;
			this.c.strokeStyle = "rgba(0,0,0,0)";	
		}
	}
	
	this.DrawCircle =  function(centerX,centerY,radius,fillColor,border){
    this.c.beginPath();
    this.c.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		this.setBorder(border)
		if(fillColor!=null){
			this.c.fillStyle = fillColor;
    	this.c.fill();
		}
    this.c.stroke();
		return {shape:"circle",x:centerX,y:centerY,r:radius};
	};
	
	this.DrawRect =  function(Beginx,Beginy,width,height,fillColor,border){
		if(typeof Beginx!="number" || typeof Beginy!="number" || typeof width!="number" || typeof height!="number")
			throw new Error("'Wrong arguments for DrawRect.Please read the docs'");
			
		
		this.c.beginPath();
		this.c.fillStyle = fillColor;		
    this.c.rect(Beginx, Beginy, width, height);
		this.c.fill();
		if(typeof border=="object"){
			this.c.lineWidth = border.width;
			this.c.strokeStyle = border.color;
			this.c.stroke();
		}
    this.setBorder(border)

	};
	
	this.DrawRoundedRect = 	function (x, y, w, h, r,fillColor,border){
    this.c.fillStyle = fillColor;
		this.c.beginPath();
		if(typeof border=="object"){
			this.c.lineWidth = border.width;
			this.c.strokeStyle = border.color;
		} 
    this.c.moveTo(x+r, y);
    this.c.lineTo(x+w-r, y);
    this.c.quadraticCurveTo(x+w, y, x+w, y+r);
    this.c.lineTo(x+w, y+h-r);
    this.c.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    this.c.lineTo(x+r, y+h);
    this.c.quadraticCurveTo(x, y+h, x, y+h-r);
    this.c.lineTo(x, y+r);
    this.c.quadraticCurveTo(x, y, x+r, y);
		this.c.stroke()
    this.c.fill();        
	}
	
	this.DrawLine = 	function (beginX, beginY, endX, endY, width,color){
		if(typeof width=="number")
			this.c.lineWidth = width;
		if(typeof color=="string")
			this.c.strokeStyle = color;
    this.c.beginPath();
		this.c.moveTo(beginX, beginY);
    this.c.lineTo(endX, endY);
		this.c.stroke()
       
	}
	
	this.DrawQuadraticCurve = function(values){
		defaultValues = {
			x1:0, y1:0,x2:0, y2:0,px:0, py:0,
			strokeStyle: this.strokeStyle,
			strokeWidth: this.strokeWidth
		}
		for (attr in values) {defaultValues[attr] = values[attr]}
		
		this.c.lineWidth = defaultValues.strokeWidth;
		this.c.strokeStyle = defaultValues.strokeStyle;
		this.c.beginPath();
		this.c.moveTo(defaultValues.x1, defaultValues.y1);
		this.c.quadraticCurveTo(defaultValues.p1,defaultValues.p2, defaultValues.x2,defaultValues.y2);
		this.c.stroke();
	}
	
	this.DrawGrid = function(height,width,weight,color,container){
		if(container=="full" || container==null){
			beginX = beginY = 0;
			endX = this.CanvasHeight;
			endY = this.CanvasWidth;
			vertLinesNumber = Math.ceil(this.CanvasWidth/(width));
			horiLinesNumber = Math.ceil(this.CanvasHeight/(height));
		}
		else if(typeof container=="object"){
			beginX = container.top;
			beginY = container.left;
			endX = container.top+container.height;
			endY = container.left+container.width;
			vertLinesNumber = Math.ceil(container.width/width);
			horiLinesNumber = Math.ceil(container.height/(height));
		}
		
		this.c.lineWidth = weight;
		this.c.strokeStyle = color;
		this.c.lineJoin = "miter"
		for(var i=0;i<=vertLinesNumber;i++){
       //Lignes Hori
       this.c.beginPath();
       this.c.moveTo(beginX,(i*width)+beginX );
       this.c.lineTo(endX,(i*width)+beginX);
			 this.c.stroke();
       
		}
		for(var i=0;i<=horiLinesNumber;i++){
			//lignes verticales
			 this.c.beginPath();
       this.c.moveTo((i*height)+beginY,beginY);
       this.c.lineTo((i*height)+beginY,endY);
       this.c.stroke();
		}
	}
	
	this.DrawText = function(valuess){
		defaultValues = {
											content:"",
										 	color:this.fontcolor,
											x:(this.CanvasHeight/2),
											y:(this.CanvasWidth/2),
											fontsize:this.fontsize,
											fontfamily:this.fontfamily,
											baseline:this.textbaseline,
											textalign:this.textalign
										}
		for (attr in valuess) {defaultValues[attr] = valuess[attr]}
		this.c.font = defaultValues.fontsize+" "+defaultValues.fontfamily;
    this.c.textAlign = defaultValues.textalign;
    this.c.textBaseline = defaultValues.baseline;
    this.c.fillStyle = defaultValues.color;
		this.c.fillText(defaultValues.content,defaultValues.x,defaultValues.y);
	}
	
	this.DrawVerticalText = function(values){
		defaultValues = {
											content:"",
										 	color:this.fontcolor,
											x:(this.CanvasHeight/2),
											y:(this.CanvasWidth/2),
											fontsize:this.fontsize,
											fontfamily:this.fontfamily,
											baseline:this.textbaseline,
											textalign:this.textalign,
											letterHeight:this.letterHeight
										}
		for (attr in values) {defaultValues[attr] = values[attr]}
		for(l=0;l<=defaultValues.content.length-1;l++){
			this.c.font = defaultValues.fontsize+" "+defaultValues.fontfamily;
    	this.c.textAlign = defaultValues.textalign;
    	this.c.textBaseline = defaultValues.baseline;
    	this.c.fillStyle = defaultValues.color;
			this.c.fillText(defaultValues.content[l],defaultValues.x,defaultValues.y+defaultValues.letterHeight*l)
		}

	}
	
	this.DrawRotatedText = function(values){
		defaultValues = {
											content:"",
										 	color:this.fontcolor,
											x:(this.CanvasHeight/2),
											y:(this.CanvasWidth/2),
											fontsize:this.fontsize,
											fontfamily:this.fontfamily,
											baseline:this.textbaseline,
											textalign:this.textalign,
											rotation:this.textRotation
										};
		for (attr in values) {defaultValues[attr] = values[attr]}
		this.c.save();
		this.c.translate(defaultValues.x,defaultValues.y);
		this.c.font = defaultValues.fontsize+" "+defaultValues.fontfamily;
		this.c.rotate((defaultValues.rotation/180)*Math.PI);
		this.c.fillText(defaultValues.content,0,0)
		this.c.restore();

	}
	
	this.setCustomFont = function(url,name,complete){
		that = this;
		var headID = document.getElementsByTagName("head")[0];         
		var cssNode = document.createElement('style');
		cssNode.type = 'text/css';
		cssNode.innerHTML = "@font-face {font-family: '"+name+"';src: url('"+url+"');}"
		headID.appendChild(cssNode);
		i = 0
		Waitingready = setInterval(function(){
			if(that.fontDownloaded(name)){
			  that.fontfamily = name
				clearInterval(Waitingready)
				complete()
			}
			
		},100)
		
	}
	
	this.animateLine = function(startpointx,startpointy,endpointx, endpointy,values,ref,complete) {
        if(this.linesDrawing[ref]==undefined){
          this.linesDrawing[ref] = {curposx:startpointx,curposy:startpointy}
        }
          if(startpointx <= endpointx){
            if(startpointy <= endpointy){
              orientation = "DR"
              if (this.linesDrawing[ref].curposx >= endpointx && this.linesDrawing[ref].curposy >= endpointy)
                this.isAnimEnded = true;
            }else{
              orientation = "UR";
              if (this.linesDrawing[ref].curposx >= endpointx && this.linesDrawing[ref].curposy <= endpointy)
                this.isAnimEnded = true;
            }
          }
          else{
            if(startpointy <= endpointy){
              orientation = "DL"
              if (this.linesDrawing[ref].curposx <= endpointx && this.linesDrawing[ref].curposy >= endpointy)
                this.isAnimEnded = true;
            }
            else{
              orientation = "UL";
              if (this.linesDrawing[ref].curposx < endpointx && this.linesDrawing[ref].curposy < endpointy)
                this.isAnimEnded = true;
            }
          }
          if(this.isAnimEnded){
                this.isAnimEnded = false;
                clearInterval(this.Animateinterval);
                console.log("End"+orientation);
								if(complete!=null)
                	complete();
                return false;
          }
          
           this.linesDrawing[ref].orientation = orientation;
           var deltaX = Math.abs( endpointx - startpointx );
           var deltaY = Math.abs( endpointy - startpointy );
           var diffX = 1, diffY = 1;
           if(orientation=="DL" ||orientation=="DR"){
             if( deltaX > deltaY )
                diffY = deltaY / deltaX;
             else if( deltaX < deltaY )
                diffX = deltaX / deltaY;
           }
           else if(orientation=="UR"){
             if( deltaX > deltaY )
                diffY =  deltaY/deltaX ;
             else if( deltaX < deltaY )
                diffX = deltaY / deltaX;
           }
           else if(orientation=="UL"){
             if( deltaX > deltaY )
              diffY = deltaX / deltaY;
             else if( deltaX < deltaY )
              diffX =  deltaX /deltaY ;
           }
           if(orientation=="DL"){
                 if(this.linesDrawing[ref].curposx != endpointx){
                   if(endpointx > this.linesDrawing[ref].curposx) 
                     this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx + diffX;
                   else
                     this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx - diffX;
                 }
                 if(this.linesDrawing[ref].curposy <= endpointy)
                   this.linesDrawing[ref].curposy = this.linesDrawing[ref].curposy + diffY;
           }
        else if(orientation=="DR"){
                 if(this.linesDrawing[ref].curposx != endpointx){
                   if(endpointx > this.linesDrawing[ref].curposx)
                     this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx + diffX;
                   else
                     this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx - diffX;
                 }
                 if(this.linesDrawing[ref].curposy <= endpointy)
                   this.linesDrawing[ref].curposy = this.linesDrawing[ref].curposy + diffY;
        }
        else if(orientation=="UR"){
                 if(this.linesDrawing[ref].curposx != endpointx){
                   if(endpointx > this.linesDrawing[ref].curposx)
                     this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx + diffX;
                   else
                     this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx - diffX;
                 }
                 if(this.linesDrawing[ref].curposy >= endpointy)
                   this.linesDrawing[ref].curposy = this.linesDrawing[ref].curposy - diffY;
        }
        else if(orientation=="UL"){
         if(this.linesDrawing[ref].curposx != endpointx){
           if(endpointx > this.linesDrawing[ref].curposx)
             this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx + diffX;
           else
             this.linesDrawing[ref].curposx = this.linesDrawing[ref].curposx - diffX;
         }
         if(this.linesDrawing[ref].curposy >= endpointy)
           this.linesDrawing[ref].curposy = this.linesDrawing[ref].curposy - diffY;
        }
        this.c.strokeStyle = values.color;
        this.c.lineWidth = values.width;
				this.c.beginPath();
        this.c.moveTo(startpointx ,startpointy );
        this.c.lineTo(this.linesDrawing[ref].curposx,this.linesDrawing[ref].curposy);
        this.c.stroke();
       // drawShape(startpointx,startpointy,this.linesDrawing[ref].curposx, this.linesDrawing[ref].curposy, "blue");
	}

	this.DrawAnimatedLine = function(startPointX,startPointY,endPointX,endPointY,values,complete){
		//this.linesDrawing.push({bx:startPointX,by:startPointY,ex:endPointX, ey:endPointY,ref:"0"})
		this.drawCurposX =  this.drawCurposY = startPointX;
		AnimationDefaultValues = {color: this.strokeColor,
										 width:this.strokeWidth,
									   lineCap:this.defaultlineCap,
										 interval:this.defaultInterval}
		for (attr in values) {AnimationDefaultValues[attr] = values[attr]}
		that = this;
		ref = that.linesDrawing.length
		this.Animateinterval = setInterval( 
				function(){
					that.animateLine(startPointX,startPointY,endPointX,endPointY,AnimationDefaultValues,ref,complete)
				}, AnimationDefaultValues.interval);
	}
	
	this.DrawComplexPath = function(path,values){
		
	}
	
	this.SimplemoveShape = function(shape,path,values){
		console.log(shape)
		this.c.clearRect((shape.x-shape.r),(shape.y-shape.r),shape.r*2,shape.r*2);
		this.DrawCircle(shape.x)
	}
}
/*

	Collide: function(rects, x, y) {
    var isCollision = false;
    for (var i = 0, len = rects.length; i < len; i++) {
				if(rects[i].shape=="circle"){
					var left = rects[i].x-rects[i].r, right = rects[i].x+rects[i].r, top = rects[i].y-rects[i].r, bottom = rects[i].y+rects[i].r;
				}
				else{
					var left = rects[i].x, right = rects[i].x+rects[i].w, top = rects[i].y, bottom = rects[i].y+rects[i].h;
				}
					if (right >= x
	            && left <= x
	            && bottom >= y
	            && top <= y) {
	            isCollision = rects[i];
	        }
    	}
    	return isCollision;
		}
}
*/