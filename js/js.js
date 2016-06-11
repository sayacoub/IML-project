
var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var Canvas = (function () {
    function Canvas(canvasHolder, width, height) {
        var canvasId = 'aoc-graph';

        this._canvasSize = {
            'width':width,
            'height': height,
        };

        $(canvasHolder).css('maxWidth', this._canvasSize.width);
        $(canvasHolder).append('<canvas id="' + canvasId + '" width="' + this._canvasSize.width + '" height="' + this._canvasSize.height + '" style="width:100%;"></canvas>');

        this._canvasEle = $('#' + canvasId)[0];
        this._canvas = this._canvasEle.getContext('2d');
        this._canvasPos = this._canvasEle.getBoundingClientRect();
        this._mousePos = {
            'x': 0,
            'y': 0,
        };

        $(this._canvasEle).click(this._click.bind(this));
        $(this._canvasEle).mousemove(this._move.bind(this));
        
        this._clickHook = null;
        this._mouseMoveHook = null;
        this._city_number=1;
		this._posx;
		this._posy;
    }
	
		//self begin
	   Canvas.prototype.setPosX = function(posx) {
        this._posx = posx;
    };
	
		   Canvas.prototype.setPosY = function(posy) {
        this._posy = posy;
    };
	
		   Canvas.prototype.getPosX = function() {
        return this._posx;
    };
	
		   Canvas.prototype.getPosY = function() {
        return this._posy;
    };
	//self end
    
    Canvas.prototype.getMouseX = function() { return this._mousePos.x };
    Canvas.prototype.getMouseY = function() { return this._mousePos.y };
    Canvas.prototype.getWidth = function() { return this._canvasSize.width };
    Canvas.prototype.getHeight = function() { return this._canvasSize.height };
    Canvas.prototype.getContext = function() { return this._canvas; };

    Canvas.prototype._click = function(mouseEvt) {
        this._updateMouseXY(mouseEvt);

        if (typeof(this._clickHook) === 'function') {
            this._clickHook();
        }
    };

    Canvas.prototype._move = function(mouseEvt) {
        this._updateMouseXY(mouseEvt);

        if (typeof(this._mouseMoveHook) === 'function') {
            this._mouseMoveHook();
        }
    };
    
    Canvas.prototype.click = function(clickHook) {
        this._clickHook = clickHook;
    };

    Canvas.prototype.mousemove = function(mouseMoveHook) {
        this._mouseMoveHook = mouseMoveHook;
    };

    Canvas.prototype.clear = function() {
        this._canvas.clearRect(0, 0, this._canvasSize.width, this._canvasSize.height);
        this._city_number=1;
    };
    
    Canvas.prototype.drawLine = function(fromX, fromY, toX, toY, params) {
        var color = '#000'; 
        var alpha = 1;
        var lineWidth = 1;
        
        if (params != undefined) {
            if (params.color != undefined) {
                color = params.color;
            }
            if (params.alpha != undefined) {
                alpha = params.alpha;
            }
            if (params.width != undefined) {
                lineWidth = params.width;
            }   
        }   
        
        this._canvas.shadowBlur = 0;
        this._canvas.globalAlpha = alpha;
        this._canvas.strokeStyle = color;
        this._canvas.lineWidth = lineWidth;
        this._canvas.beginPath();
        this._canvas.moveTo(fromX, fromY);
        this._canvas.lineTo(toX, toY);
        this._canvas.stroke();
    };
	
	
	
	


 

    


    Canvas.prototype.drawCircle = function(x, y, params) {
        var size = 6;
        var color = '#000';
        var alpha = 1;

        if (params != undefined) {
            if (params.size != undefined) {
                size = params.size;
            }
            if (params.color != undefined) {
                color = params.color;
            }
            if (params.alpha != undefined) {
                alpha = params.alpha;
            }
        }
        
        this._canvas.shadowColor = '#666';
        this._canvas.shadowBlur = 15;
        this._canvas.shadowOffsetX = 0;
        this._canvas.shadowOffsetY = 0;

        this._canvas.globalAlpha = alpha;
        this._canvas.fillStyle = color;
        this._canvas.beginPath();
        this._canvas.arc(x, y, size, 0, 2 * Math.PI);
        this._canvas.fill();
        this._canvas.font = "15px Arial";
        //var str=x.toFixed(2).toString()+"-"+y.toFixed(2).toString();
        //this._canvas.fillText(str,x+10,y+10);
        this._canvas.fillText(this._city_number,x+10,y+10);
        this._city_number++;
    };
    
    Canvas.prototype.drawRectangle = function(pointA, pointB, pointC, pointD, params) {
        var best_distance = '#000';
        var alpha = 1;
        
        if (params != undefined) {
            if (params.best_distance != undefined) {
                best_distance = params.best_distance;
            }
            if (params.alpha != undefined) {
                alpha = params.alpha;
            }
        }
        
        this._canvas.shadowBlur = 0;

        this._canvas.globalAlpha = alpha;
        this._canvas.fillStyle = best_distance;
        this._canvas.fillRect(pointA, pointB, pointC, pointD);
    }

	
    Canvas.prototype._updateMouseXY = function(mouseEvt) {
        this._canvasPos = this._canvasEle.getBoundingClientRect();
        var mouseX = mouseEvt.clientX - this._canvasPos.left;
        var mouseY = mouseEvt.clientY - this._canvasPos.top;
        var widthScaled = $(this._canvasEle).width() / this._canvasSize.width;
        var heightScaled = $(this._canvasEle).height() / this._canvasSize.height;
        var x = Math.floor(mouseX / widthScaled);
        var y = Math.floor(mouseY / heightScaled);

        this._mousePos.x = x;
        this._mousePos.y = y;
    };
	 // self begin
	    Canvas.prototype.pixelOnMouseOver = function (){
        var canvas = document.getElementById("aco_canvas");
		var pointer = this;
        function draw(e) {
            var pos = getMousePos(canvas, e);
		    pointer.setPosX(pos.x);
			pointer.setPosY(pos.y);
            $('#position').html('0/' + "x:"+pos.x+", y:"+pos.y);
        }
        canvas.addEventListener('mousemove', draw, false);

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    };
	//self end

    return Canvas;
})();

var ACArtist = (function() {
    function ACArtist(ac, canvas) {
        this._ac = ac;
        this._canvas = canvas;

        this._canvas.click(this._click.bind(this));
        
        this._draw();
        
        this._animationIterator = null;
        this._animationSteps = 10;
		//self
		this._posx= 0;
		this._posy=0;
		//end self
        
        this._iterationHook = null;
        
        // Keep scope
        for (var i in this) {
            if (typeof this[i] === 'function') {
              this[i] = this[i].bind(this);   
            }
        }
    }


	

    ACArtist.prototype._click = function() {
	   // if add, no add of points after first iteration possilble(without this click event on edge not possible)
	   if (this._ac.currentIteration() == 0) {
        var cities = this._ac.getGraph().getCities();
        for (var cityIndex in cities) {
            var difference = 0;
            difference += Math.abs(cities[cityIndex].getX() - this._canvas.getMouseX());
            difference += Math.abs(cities[cityIndex].getY() - this._canvas.getMouseY());

            if (difference < 30) {
                return;
            }
        }
    
        this._ac.getGraph().addCity(this._canvas.getMouseX(), this._canvas.getMouseY());
        this._ac.getGraph().createEdges();
        clearInterval(this._animationIterator);
        this._ac.reset();

        this._draw();
		}
		//self begin
	    else
		{
		
		    var canvas = document.getElementById("aco_canvas");
			var edges = this._ac.getGraph().getEdges();
			//this._canvas.pixelOnMouseOver();
            var pointer = this;
/*		    canvas.addEventListener('click', function(event) {
					
						var pos = getMousePos(canvas, event);
						posx = pos.x;
						posy = pos.y;
						pointer.setPosX(pos.x);
						pointer.setPosY(pos.y);
						$('#position').html('0/' + "x:"+pos.x+", y:"+pos.y);


				}, false);*/
				
						//alert(pos.x);
						var posx = this._canvas.getPosX();
						var posy = this._canvas.getPosY();
						//alert(posy);
						for (var edgeIndex in edges) {
						
						//alert(count);
						//count++
						//var cityA = edges[edgeIndex].getCityA();
						//var cityB = edges[edgeIndex].getCityB();
						
						
						
						//alert(point_x);
						//alert(edges[edgeIndex].pointB().x);
						/*if(point_x != edges[edgeIndex].pointB().x)
						{
						  alert("drin");
						}*/
						
						//alert(point_y);
						
						var point_y = edges[edgeIndex].pointA().y;
						var point_x = edges[edgeIndex].pointA().x;
						var distx = edges[edgeIndex].pointA().x - edges[edgeIndex].pointB().x; 
						var disty = edges[edgeIndex].pointA().y - edges[edgeIndex].pointB().y;
						//alert(distx);
						//alert(disty);
						if(distx != 0 && disty != 0)
						 {
						//pos.x = point_x + sigma_x*dist_x
							var sigma_x = (posx - point_x)/distx;
							var sigma_y = (posy - point_y)/disty;
							alert(sigma_x);
							alert(sigma_y);
						
							if(Math.abs(sigma_x, sigma_y) <= 0.2)
							{
							  alert('clicked edge');
							  edges[edgeIndex].setPheromone(0);
							}
						
						  }
						
					
						
						
						}
				
				 /*function getMousePos(canvas, evt) {
				var rect = canvas.getBoundingClientRect();
				return {
					x: evt.clientX - rect.left,
					y: evt.clientY - rect.top
				};
			}*/
		
		
		// ende self
		}
    };
	
	


    ACArtist.prototype._add_data = function(data) { 
        
		for (var i = 0; i < data.length; i++) {
            window.var_tmp=i+1;
            this._ac.getGraph().addCity(data[i][0], data[i][1]);
            this._ac.getGraph().createEdges();
            clearInterval(this._animationIterator);
            this._ac.reset();
            this._draw();
        }   
      	
    };
    
    ACArtist.prototype._draw = function() {
        this._canvas.clear();
        this._drawBg();
        this._drawEdges();
        this._drawNodes();
        this._drawCurrentBest();
    };
    
    ACArtist.prototype._drawCurrentBest = function() {
        var ant = this._ac.getGlobalBest();
        if (ant == null || ant.getTour() == null) {
            return;
        }

        var tour = ant.getTour();

        for (var tourIndex = 0; tourIndex < tour.size(); tourIndex++) {
            if (tourIndex < tour.size()-1) {
                this._canvas.drawLine(tour.get(tourIndex).getX(), tour.get(tourIndex).getY(), 
                    tour.get(tourIndex+1).getX(), tour.get(tourIndex+1).getY(),
                    { 'alpha': 0.9, 'color': '#0c6', 'width': 2 });
            } else {
                this._canvas.drawLine(tour.get(tourIndex).getX(), tour.get(tourIndex).getY(), 
                    tour.get(0).getX(), tour.get(0).getY(),
                    { 'alpha': 0.9, 'color': '#0c6', 'width': 2 });
            }
        }
    };

    ACArtist.prototype._drawOptimalTour = function(tour) {
        /*this._canvas.clear();
        this._drawBg();
        this._drawEdges();
        this._drawNodes();*/
        if (tour == null) {
            return;
        }
        for (var tourIndex = 0; tourIndex < tour.size(); tourIndex++) {
            if (tourIndex < tour.size()-1) {
                this._canvas.drawLine(tour.get(tourIndex).getX(), tour.get(tourIndex).getY(), 
                    tour.get(tourIndex+1).getX(), tour.get(tourIndex+1).getY(),
                    { 'alpha': 0.9, 'color': '#f00', 'width': 1 });
            } else {
                this._canvas.drawLine(tour.get(tourIndex).getX(), tour.get(tourIndex).getY(), 
                    tour.get(0).getX(), tour.get(0).getY(),
                    { 'alpha': 0.9, 'color': '#f00', 'width': 1 });
            }
        }
    };

    ACArtist.prototype._drawNodes = function() {  
        var nodes = this._ac.getGraph().getCities();
        for (var nodeIndex in nodes) {
            this._canvas.drawCircle(nodes[nodeIndex].getX(), nodes[nodeIndex].getY(), { 'alpha': 0.8 });
        }
    };
    
    ACArtist.prototype._drawEdges = function() {
        var edges = this._ac.getGraph().getEdges();

        var totalPheromone = 0;
        for (var edgeIndex in edges) {
            totalPheromone += edges[edgeIndex].getPheromone();
        }
  
        for (var edgeIndex in edges) {
            var alpha = 0.2;
            if (this._ac.currentIteration() > 0) {
                var width = Math.ceil((edges[edgeIndex].getPheromone() / totalPheromone) * (this._ac.getGraph().size()) * 6);
                alpha = (edges[edgeIndex].getPheromone() / totalPheromone) * (this._ac.getGraph().size()) + 0.03;
                if (alpha > 1) {
                    alpha = 1;
                }
            }

            this._canvas.drawLine(edges[edgeIndex].pointA().x, edges[edgeIndex].pointA().y, 
                edges[edgeIndex].pointB().x, edges[edgeIndex].pointB().y,
                { 'alpha': alpha, 'color': '#06f', 'width': width });
        }
    };
    
    ACArtist.prototype._drawBg = function() {
        var grd = this._canvas.getContext().createLinearGradient(0, 0, 0, this._canvas.getHeight());
        grd.addColorStop(0, "#eee");
        grd.addColorStop(0.4, "#fcfcfc");
        grd.addColorStop(1, "#eee");
        
        this._canvas.drawRectangle(0, 0, this._canvas.getWidth(), this._canvas.getHeight(), { 'best_distance': grd });
    };
    
    ACArtist.prototype.stop = function() {
        clearInterval(this._animationIterator);
        this._ac.reset();
        this._draw();
    };

    ACArtist.prototype.clearGraph = function() {
        this.stop();
        this._ac.getGraph().clear();
        this._draw();
    };

    ACArtist.prototype.runAC = function(iterationHook) {
        if (!this._ac.ready()) {
            return;
        }
    
        if (typeof(iterationHook) == 'function') {
            this._iterationHook = iterationHook;
        }
    
        clearInterval(this._animationIterator);
        this._ac.reset();
        this._step();
    };
    
    ACArtist.prototype._step = function(iterationHook) {    
        if (this._ac.currentIteration() >= this._ac.maxIterations()) {
            this._draw();
            this._ac.resetAnts();
            return;
        }
        
        // Run a few steps at a time so it doesn't take too long
        for (var i=0; i<3; i++) {
            this._ac.step();
        }
        this._animateAnts();
        
        if (typeof(this._iterationHook) == 'function') {
            this._iterationHook();
        }
    };

    ACArtist.prototype._moveAnt = function(ant, tourIndex, animationStep) {
        // Get last move
        var tourSize = ant.getTour().size();
        var fromCity = ant.getTour().get(tourIndex-1);
        var toCity = ant.getTour().get(tourIndex);

        var xOffset = (toCity.getX() - fromCity.getX()) * ((1 / this._animationSteps) * animationStep);
        var yOffset = (toCity.getY() - fromCity.getY()) * ((1 / this._animationSteps) * animationStep);

        var antXPos = fromCity.getX() + xOffset;
        var antYPos = fromCity.getY() + yOffset;
        
        //this._drawAnt(antXPos, antYPos);
    };

    /*ACArtist.prototype._drawAnt = function(x, y) {
        this._canvas.drawRectangle(x-2, y-2, 4, 4, { 'alpha': 0.5 });
    };*/

    ACArtist.prototype._animateAnts = function() {   
        var animationIndex = 2;
        this._animationIterator = setInterval(function() {
            this._draw();
            var ants = this._ac.getAnts();
            for (var antIndex in ants) {
                this._moveAnt(ants[antIndex], 1, animationIndex);
            }
            animationIndex++;
            if (animationIndex >= this._animationSteps) {
                clearInterval(this._animationIterator);
                this._step();
            }
        }.bind(this), 20);
    };

    return ACArtist;
})();


















var DataManager = (function(){

    function DataManager(acArtist) {
        this.loadedDataset = {};
        this.loadedDataset.name="";
        this.loadedDataset.loaded_points=[];
        this.loadedDataset.optimal_tour=null;
        this.dataWasjustLoaded= false;
        this.currentPointsComeFromDataset=false;
        this.acArtist=acArtist;
        //this._importAvailableDatasetList();
        this._saveCustomPointsListener(acArtist);
        this._importSelectedDatasetListener();
        this._compareCurrentTourWithOptimalListener(acArtist);
    }

    DataManager.prototype._importAvailableDatasetList = function() {
        var choiceDataset = [];
        var client = new XMLHttpRequest();
        client.open('GET', '../dataset/used_algorithms.txt');
        client.onreadystatechange = function() {
            if(client.status != 200)
                document.getElementById("user_information_output").innerHTML = "An unexpected error happened during the loading of the dataset. Please try again, or contact the administrator";
            if (client.readyState == 4  && client.status == 200)
            {
                choiceDataset=client.responseText;
                var resultByLine= choiceDataset.split('\n');
                var datasetSelect = document.getElementById('dataset_selection');
                var opt = document.createElement('option');
                opt.value = "empty";
                opt.innerHTML = "--";
                datasetSelect.appendChild(opt);

                var temp;
                for (var i = 0; i<resultByLine.length; i++){
                    temp = resultByLine[i].split(",");
                    var opt = document.createElement('option');
                    opt.value = temp[0];
                    opt.innerHTML = temp[1] + " points - " + temp[2];
                    datasetSelect.appendChild(opt);
                }
            }
        }
        client.send();
    };

    DataManager.prototype._importSelectedDatasetListener = function() {
        var fileSelect = document.getElementById('dataset_selection');
        fileSelect.addEventListener('change', loadDataSet);

        var localDataOfThis = this;
        function loadDataSet(e) {
            if(fileSelect.value!=localDataOfThis.loadedDataset.name)
            {
                document.getElementById("user_information_output").innerHTML = "Loading...";
                console.log(fileSelect.value)
                localDataOfThis.loadedDataset.loaded_points= [];
                localDataOfThis.loadedDataset.name="";
                localDataOfThis.loadedDataset.optimal_tour=null;
                localDataOfThis.acArtist.clearGraph();
                var client = new XMLHttpRequest();
                var stringFile = '../dataset/' + fileSelect.value + '.tsp';
                client.open('GET', stringFile);
                client.onreadystatechange = function() {
                    if(client.status != 200)
                        document.getElementById("user_information_output").innerHTML = "An unexpected error happened during the loading of the dataset. Please try again, or contact the administrator";
                    if (client.readyState == 4  && client.status == 200)
                    {
                        var resultByLine= client.responseText.split('\n');
                        localDataOfThis.loadedDataset.name=fileSelect.value;
                        var temp;
                        var arrivedToData=false;
                        var canvasDim = Math.max(localDataOfThis.acArtist._canvas.getWidth(), localDataOfThis.acArtist._canvas.getHeight())
                        var widthCanvas = localDataOfThis.acArtist._canvas.getWidth();
                        var heightCanvas = localDataOfThis.acArtist._canvas.getHeight();
                        var maxValWidth= 0;
                        var minValWidth= 1000000;
                        var maxValHeight= 0;
                        var minValHeight= 1000000;
                        for (var i = 0; i < resultByLine.length; i++) {
                            if(resultByLine[i].localeCompare("EOF") == 0)
                                arrivedToData=false;
                            if(arrivedToData){
                                temp= resultByLine[i].replace(/^ +/gm, '').split(/\ +/);
                                if(temp[1] > maxValWidth) maxValWidth=parseFloat(temp[1]);
                                if(temp[1] < minValWidth) minValWidth=parseFloat(temp[1]);
                                if(temp[2] > maxValHeight) maxValHeight=parseFloat(temp[2]);
                                if(temp[2] < minValHeight) minValHeight=parseFloat(temp[2]);
                                localDataOfThis.loadedDataset.loaded_points.push([parseFloat(temp[1]), parseFloat(temp[2])]);
                            }
                            if(resultByLine[i].localeCompare("NODE_COORD_SECTION") == 0)
                                arrivedToData=true;
                        }
                        var interval = Math.max(maxValWidth - minValWidth, maxValHeight - minValHeight);
                        if(maxValHeight - minValHeight >= maxValWidth - minValWidth)
                            var canvasDim = localDataOfThis.acArtist._canvas.getHeight();
                        else
                            var canvasDim = localDataOfThis.acArtist._canvas.getWidth();
                        var interval = Math.max(maxValWidth - minValWidth, maxValHeight - minValHeight);
                        console.log(localDataOfThis.acArtist._canvas.getHeight(), localDataOfThis.acArtist._canvas.getWidth(), canvasDim)
                        console.log(localDataOfThis.loadedDataset.loaded_points)
                        for(var i = 0; i < localDataOfThis.loadedDataset.loaded_points.length; i++)
                        {
                            localDataOfThis.loadedDataset.loaded_points[i][0]=
                            (localDataOfThis.loadedDataset.loaded_points[i][0]-minValWidth)/interval;
                            localDataOfThis.loadedDataset.loaded_points[i][0]= localDataOfThis.loadedDataset.loaded_points[i][0]*
                                    (96/100*canvasDim) + 2/100*canvasDim;

                            localDataOfThis.loadedDataset.loaded_points[i][1]= 
                            (localDataOfThis.loadedDataset.loaded_points[i][1]-minValHeight)/interval;
                            localDataOfThis.loadedDataset.loaded_points[i][1] = localDataOfThis.loadedDataset.loaded_points[i][1]*
                                    (96/100*canvasDim) + 2/100*canvasDim;
                            localDataOfThis.loadedDataset.loaded_points[i][1]=localDataOfThis.acArtist._canvas.getHeight()-
                                    localDataOfThis.loadedDataset.loaded_points[i][1];
                        }
                        localDataOfThis.dataWasjustLoaded=true;
                        document.getElementById("user_information_output").innerHTML = "Dataset loaded. Press 'Start' to begin.";
                        localDataOfThis._addSelectedDatasetToCanvas();
                    }
                }
                client.send();
            }
            else
            {
                localDataOfThis.dataWasjustLoaded=true;
                document.getElementById("user_information_output").innerHTML = "Dataset loaded. Press 'Start' to begin.";
                localDataOfThis._addSelectedDatasetToCanvas();
            }
            
        }
    };

    DataManager.prototype._saveCustomPointsListener = function(acArtist) {
        var saveCustomPoints = document.getElementById('save_personal_points');
        saveCustomPoints.addEventListener('click', saveCustomPointsFunction);
        var localDataOfThis = this;
        function saveCustomPointsFunction(e) 
        {
		alert("I am an alert box!");
            var ant = acArtist._ac.getGlobalBest();
            if(!ant)
            {
                document.getElementById("user_information_output").innerHTML = "Nothing to save. Create or choose a dataset first, then press 'Start'.";
                return;
            }
            var tour = ant.getTour()._tour;
            var numberOfPoints = tour.length;
            var linejump = "\n";
            var blankspace = " ";
            //If it's the loaded dataset without point addition
            if(localDataOfThis.loadedDataset.loaded_points.length == numberOfPoints)
            {
                var resultString = "NAME: " + localDataOfThis.loadedDataset.name + ".tsp" + linejump +
                    "TYPE: TSP\n" +
                    "COMMENT: Solution\n" +
                    "DIMENSION: " + numberOfPoints + linejump +
                    "TOUR_SECTION\n";
                var j=0;
                var cityFound=false;
                while(j < numberOfPoints && !cityFound)
                {
                    if(localDataOfThis.loadedDataset.loaded_points[0][0]==tour[j]._x 
                        && localDataOfThis.loadedDataset.loaded_points[0][1]==tour[j]._y)
                    {
                        cityFound=true;
                        var indexOfFirstPoint = j;
                    }
                    j++;
                }
                j=0;
                cityFound=false;
                for(var i = 0; i < numberOfPoints; i++)
                {
                    if(i+indexOfFirstPoint == numberOfPoints)
                        indexOfFirstPoint=-i;
                    while(j < numberOfPoints && !cityFound)
                    {
                        if(localDataOfThis.loadedDataset.loaded_points[j][0]==tour[i+indexOfFirstPoint]._x 
                            && localDataOfThis.loadedDataset.loaded_points[j][1]==tour[i+indexOfFirstPoint]._y)
                            cityFound=true;
                        j++;
                    }
                    resultString+= (j).toString() 
                        + linejump;
                    j=0;
                    cityFound=false;
                }
                resultString+= "-1\n";
            }
            else
            {
                var resultString = "NAME: " + "custom" + numberOfPoints + linejump +
                    "TYPE: TSP\n" +
                    "COMMENT: \n" +
                    "DIMENSION: " + numberOfPoints + linejump +
                    "NODE_COORD_SECTION\n";
                for(var i = 0; i < numberOfPoints; i++)
                {
                    resultString+= (i+1).toString() + blankspace + (tour[i]._x).toString()
                        + blankspace + (tour[i]._y).toString() + linejump;
                }
            }
            resultString+= "EOF";
            
            var client = new XMLHttpRequest();
            var url = "../php/save_dataset.php";
            var params = "dataset="+resultString + "&nb_points="+ numberOfPoints;
            if(localDataOfThis.loadedDataset.name==[])
                params +="&algo_name=custom";
            else
                params +="&algo_name="+localDataOfThis.loadedDataset.name;
            client.open("POST", url, true);
            //Send the proper header information along with the request
            client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            client.onreadystatechange = function() {
                if(client.status != 200)
                    document.getElementById("user_information_output").innerHTML = "An unexpected error happened during the loading of the dataset. Please try again, or contact the administrator";
                if(client.readyState == 4 && client.status == 200) {
                    console.log(client.responseText);
                    document.getElementById("user_information_output").innerHTML = "Dataset saved!";
                }
            }
            client.send(params);
        }
    };

    DataManager.prototype._addSelectedDatasetToCanvas = function() {
        this.acArtist._add_data(this.loadedDataset.loaded_points);
        this.currentPointsComeFromDataset=true;
    };

    DataManager.prototype._compareCurrentTourWithOptimalListener = function(acArtist) {
        var saveCustomPoints = document.getElementById('compare_with_optimal');
        saveCustomPoints.addEventListener('click', saveCustomPointsFunction);
        var localDataOfThis = this;
        function saveCustomPointsFunction(e) 
        {
            var temp_tour=[];
            var ant = acArtist._ac.getGlobalBest();
            if(!ant)
            {
                document.getElementById("user_information_output").innerHTML = "Nothing to compare. Create or choose a dataset first, then press 'Start'.";
                return;
            }
            var tour = ant.getTour();
            var numberOfPoints = tour._tour.length;
            if(localDataOfThis.loadedDataset.loaded_points.length != numberOfPoints)
            {
                document.getElementById("user_information_output").innerHTML = "Theses points don't match any saved dataset. Please Clear and load a new dataset without adding points.";
                return;
            }
            if(localDataOfThis.loadedDataset.optimal_tour == null)
            {
                var client = new XMLHttpRequest();
                client.open('GET', "../dataset/"+localDataOfThis.loadedDataset.name+".opt.tour");
                client.onreadystatechange = function() {
                    if(client.status != 200)
                        document.getElementById("user_information_output").innerHTML = "An unexpected error happened during the loading of the dataset. Please try again, or contact the administrator";
                    if(client.readyState == 4  && client.status == 200)
                    {
                        var arrivedToData = false;
                        var resultByLine= client.responseText.split('\n');
                        var temp_string;
                        for (var i = 0; i < resultByLine.length; i++) {
                            temp_string=resultByLine[i].replace(/\s+/g,"");
                            if(temp_string.localeCompare("-1") == 0)
                                arrivedToData=false;
                            if(arrivedToData)
                                temp_tour.push(resultByLine[i]);
                            if(temp_string.localeCompare("TOUR_SECTION") == 0)
                                arrivedToData=true;
                        }

                        localDataOfThis.loadedDataset.optimal_tour = new Tour(localDataOfThis.acArtist._ac.getGraph());
                        var temp_point, temp_city;
                        for(var i=0; i < temp_tour.length; i++)
                        {
                            temp_point= localDataOfThis.loadedDataset.loaded_points[temp_tour[i]-1];
                            temp_city=tour.containsWithValue(parseInt(temp_point[0]), parseInt(temp_point[1]));
                            if(temp_city != null)
                            {
                                localDataOfThis.loadedDataset.optimal_tour.addCity(temp_city);
                            }
                        }
                        compare()
                    }
                }
                client.send();
            }
            else
            {
                compare()
            }

            function compare() {
                acArtist._drawOptimalTour(localDataOfThis.loadedDataset.optimal_tour);
                console.log(localDataOfThis.loadedDataset.optimal_tour.distance())
                localDataOfThis.acArtist._ac.getGlobalBest().getTour()._distance=null;
                console.log(localDataOfThis.acArtist._ac.getGlobalBest().getTour().distance())
                var i=0, isEqual=true;
                while(i< localDataOfThis.loadedDataset.optimal_tour._tour.length && isEqual)
                {
                    isEqual=localDataOfThis.loadedDataset.optimal_tour._tour[i]==tour._tour[i];
                    i++;
                }
                if(isEqual)
                    document.getElementById("user_information_output").innerHTML = "Congratulations, you managed to find the optimal tour for this dataset!";
                else
                    document.getElementById("user_information_output").innerHTML = "Your tour is not yet optimal. Try again!";
            }
        }
    };

    return DataManager;
})();

















var Graph = (function () {
    function Graph() {
        this._cities = [];
        this._edges = {};
    }

    Graph.prototype.getEdges = function() { return this._edges; };
    Graph.prototype.getEdgeCount = function() { return Object.keys(this._edges).length };
    
    Graph.prototype.getCity = function(cityIndex) {
        return this._cities[cityIndex];
    };
    
    Graph.prototype.getCities = function() {
        return this._cities;
    };
    
    Graph.prototype.size = function() {
        return this._cities.length;
    };

    Graph.prototype.addCity = function(x, y) {
        this._cities.push(new City(x,y));
    };

    Graph.prototype._addEdge = function(cityA, cityB) {
        this._edges[cityA.toString() + '-' + cityB.toString()] = new Edge(cityA, cityB);
    };
    
    Graph.prototype.getEdge = function(cityA, cityB) {
        if (this._edges[cityA.toString() + '-' + cityB.toString()] != undefined) {
            return this._edges[cityA.toString() + '-' + cityB.toString()];
        }
        if (this._edges[cityB.toString() + '-' + cityA.toString()] != undefined) {
            return this._edges[cityB.toString() + '-' + cityA.toString()];
        }
    };

    Graph.prototype.createEdges = function() {
        this._edges = {};

        for (var cityIndex = 0; cityIndex < this._cities.length; cityIndex++) {
            for (var connectionIndex = cityIndex; connectionIndex < this._cities.length; connectionIndex++) {
                this._addEdge(this._cities[cityIndex], this._cities[connectionIndex]);
            }
        }
    };
    
    Graph.prototype.resetPheromone = function() {
        for (var edgeIndex in this._edges) {
            this._edges[edgeIndex].resetPheromone();
        }
    }
    
    Graph.prototype.clear = function() {
        this._cities = [];
        this._edges = {};
    }

    return Graph;
})();

var City = (function () {
    function City(x, y) {
        this._x = x;
        this._y = y;
    }

    City.prototype.getX = function() { return this._x; };
    City.prototype.getY = function() { return this._y; };

    City.prototype.toString = function() {
        return this._x + ',' + this._y;
    };

    City.prototype.isEqual = function(city) {
        if (this._x == city._x && this._y == city._y) {
            return true;
        }
        return false;
    };

    return City;
})();

var Edge = (function () {
    function Edge(cityA, cityB) {
        this._cityA = cityA;
        this._cityB = cityB;
        this._initPheromone = 1;
        this._pheromone = this._initPheromone;

        // Calculate edge distance
        var deltaXSq = Math.pow((cityA.getX() - cityB.getX()), 2);
        var deltaYSq = Math.pow((cityA.getY() - cityB.getY()), 2);
        this._distance = Math.sqrt(deltaXSq + deltaYSq);
    }

    Edge.prototype.pointA = function() {
        return { 'x': this._cityA.getX(), 'y': this._cityA.getY() };
    }
    
    Edge.prototype.pointB = function() {
        return { 'x': this._cityB.getX(), 'y': this._cityB.getY() };
    }
    
    Edge.prototype.getPheromone = function() { return this._pheromone; };

    Edge.prototype.getDistance = function() { return this._distance; };
	
	//self implement begin
	
	Edge.prototype.getCityA = function() {return this._cityA};
	Edge.prototype.getCityB = function() {return this._cityB};
	
	// self end

    Edge.prototype.contains = function(city) {
        if (this._cityA.getX() == city.getX()) {
            return true;
        }
        if (this._cityB.getX() == city.getX()) {
            return true;
        }
        return false;
    };

    Edge.prototype.setInitialPheromone = function(pheromone) {
        this._initPheromone = pheromone;
    };

    Edge.prototype.setPheromone = function(pheromone) {
        this._pheromone = pheromone;
    };
    
    Edge.prototype.resetPheromone = function() {
        this._pheromone = this._initPheromone;
    };

    return Edge;
})();

var AntColony = (function () {
    function AntColony(params) {
        this._graph = new Graph();
        this._colony = [];

        // Set default params
        this._colonySize = 20;
        this._alpha = 1;
        this._beta = 3;
        this._rho = 0.1;
        this._q = 1;
        this._initPheromone = this._q;
        this._type = 'acs';
        this._elitistWeight = 0;
        this._maxIterations = 250;
        this._minScalingFactor = 0.001;

        this.setParams(params);

        this._iteration = 0;
        this._minPheromone = null;
        this._maxPheromone = null;

        this._iterationBest = null;
        this._globalBest = null;

        this._createAnts();
    }

    AntColony.prototype.getGraph = function() { return this._graph; };
    AntColony.prototype.getAnts = function() { return this._colony; };
    AntColony.prototype.size = function() { return this._colony.length; };
    AntColony.prototype.currentIteration = function() { return this._iteration; };
    AntColony.prototype.maxIterations = function() { return this._maxIterations; };

    AntColony.prototype._createAnts = function() {
        this._colony = [];
        for (var antIndex = 0; antIndex < this._colonySize; antIndex++) {
            this._colony.push(new Ant(this._graph, {
                'alpha': this._alpha,
                'beta': this._beta,
                'q': this._q,
            }));
        }
    };
    
    AntColony.prototype.setParams = function(params) {
        if (params != undefined) {
            if (params.colonySize != undefined) {
                this._colonySize = params.colonySize;
            }
            if (params.alpha != undefined) {
                this._alpha = params.alpha;
            }
            if (params.beta != undefined) {
                this._beta = params.beta;
            }
            if (params.rho != undefined) {
                this._rho = params.rho;
            }
            if (params.iterations != undefined) {
                this._maxIterations = params.iterations;
            }
            if (params.q != undefined) {
                this._q = params.q;
            }
            if (params.initPheromone != undefined) {
                this._initPheromone = params.initPheromone;
            }
            if (params.type != undefined) {
                if (params.type == 'elitist') {
                    if (params.elitistWeight != undefined) {
                        this._elitistWeight = params.elitistWeight;
                        this._type = 'elitist';
                    }
                } else if (params.type == 'maxmin') {
                    this._type = 'maxmin';
                } else {
                    this._type = 'acs';
                }
            }
            if (params.minScalingFactor != undefined) {
                this._minScalingFactor = params.minScalingFactor;
            }
        }
    };

    AntColony.prototype.reset = function() {
        this._iteration = 0;
        this._globalBest = null;
        this.resetAnts();
        this.setInitialPheromone(this._initPheromone);
        this._graph.resetPheromone();
    };

    AntColony.prototype.setInitialPheromone = function () {
        var edges = this._graph.getEdges();
        for (var edgeIndex in edges) {
            edges[edgeIndex].setInitialPheromone(this._initPheromone);
        }
    };

    AntColony.prototype.resetAnts = function() {
        this._createAnts();
        this._iterationBest = null;
    };
    
    AntColony.prototype.ready = function() {
        if (this._graph.size() <= 1) {
            return false;
        }
        return true;
    }

    AntColony.prototype.run = function() {
        if (!this.ready()) {
            return;
        }
    
        this._iteration = 0;
        while (this._iteration < this._maxIterations) {
            this.step();
        }
    };
    
    AntColony.prototype.step = function() {
        if (!this.ready() || this._iteration >= this._maxIterations) {
            return;
        }

        this.resetAnts();

        for (var antIndex in this._colony) {
            this._colony[antIndex].run();
        }

        this.getGlobalBest();
        this.updatePheromone();

        this._iteration++;
    };

    AntColony.prototype.updatePheromone = function() {
        var edges = this._graph.getEdges();
        for (var edgeIndex in edges) {
            var pheromone = edges[edgeIndex].getPheromone();
            edges[edgeIndex].setPheromone(pheromone * (1 - this._rho));
        }

        if (this._type == 'maxmin') {
            if ((this._iteration / this._maxIterations) > 0.75) {
                var best = this.getGlobalBest();
            } else {
                var best = this.getIterationBest();
            }
            
            // Set maxmin
            this._maxPheromone = this._q / best.getTour().distance();
            this._minPheromone = this._maxPheromone * this._minScalingFactor;

            best.addPheromone();
        } else {
            for (var antIndex in this._colony) {
                this._colony[antIndex].addPheromone();
            }
        }

        if (this._type == 'elitist') {
            this.getGlobalBest().addPheromone(this._elitistWeight);
        }

        if (this._type == 'maxmin') {
            for (var edgeIndex in edges) {
                var pheromone = edges[edgeIndex].getPheromone();
                if (pheromone > this._maxPheromone) {
                    edges[edgeIndex].setPheromone(this._maxPheromone);
                } else if (pheromone < this._minPheromone) {
                    edges[edgeIndex].setPheromone(this._minPheromone);
                }
            }
        }
    };
    
    AntColony.prototype.getIterationBest = function() {
        if (this._colony[0].getTour() == null) {
            return null;
        }

        if (this._iterationBest == null) {
            var best = this._colony[0]

            for (var antIndex in this._colony) {
                if (best.getTour().distance() >= this._colony[antIndex].getTour().distance()) {
                    this._iterationBest = this._colony[antIndex];
                }
            }
        }

        return this._iterationBest;
    };

    AntColony.prototype.getGlobalBest = function() {
        var bestAnt = this.getIterationBest();
        if (bestAnt == null && this._globalBest == null) {
            return null;
        }

        if (bestAnt != null) {
            if (this._globalBest == null || this._globalBest.getTour().distance() >= bestAnt.getTour().distance()) {
                this._globalBest = bestAnt;
            }
        }

        return this._globalBest;
    };

    return AntColony;
})();

var Ant = (function () {
    function Ant(graph, params) {
        this._graph = graph;
        
        this._alpha = params.alpha;
        this._beta = params.beta;
        this._q = params.q;
        this._tour = null;
    }

    Ant.prototype.reset = function() {
        this._tour = null;
    };
    
    Ant.prototype.init = function() {
        this._tour = new Tour(this._graph);
        var randCityIndex = Math.floor(Math.random() * this._graph.size());
        this._currentCity = this._graph.getCity(randCityIndex);
        this._tour.addCity(this._currentCity);
    }

    Ant.prototype.getTour = function() {
        return this._tour;
    };

    Ant.prototype.makeNextMove = function() {
        if (this._tour == null) {
            this.init();
        }

        var rouletteWheel = 0.0;
        var cities = this._graph.getCities();

        var cityProbabilities = [];
        for (var cityIndex in cities) {
            if (!this._tour.contains(cities[cityIndex])) {
                var edge = this._graph.getEdge(this._currentCity, cities[cityIndex]);
                if (this._alpha == 1) {
                    var finalPheromoneWeight = edge.getPheromone();
                } else {
                    var finalPheromoneWeight = Math.pow(edge.getPheromone(), this._alpha);
                }
                cityProbabilities[cityIndex] = finalPheromoneWeight * Math.pow(1.0 / edge.getDistance(), this._beta);
                rouletteWheel += cityProbabilities[cityIndex];
            }
        }

        var wheelTarget = rouletteWheel * Math.random();

        var wheelPosition = 0.0;
        for (var cityIndex in cities) {
            if (!this._tour.contains(cities[cityIndex])) {
                wheelPosition += cityProbabilities[cityIndex];
                if (wheelPosition >= wheelTarget) {
                    this._currentCity = cities[cityIndex];
                    this._tour.addCity(cities[cityIndex]);
                    return;
                }
            }
        }
    };

    Ant.prototype.tourFound = function() {
        if (this._tour == null) {
            return false;
        }
        return (this._tour.size() >= this._graph.size());
    };

    Ant.prototype.run = function(callback) {
        this.reset();
        while (!this.tourFound()) {
            this.makeNextMove();
        }
    };

    Ant.prototype.addPheromone = function(weight) {
        if (weight == undefined) {
            weight = 1;
        }

        var extraPheromone = (this._q * weight) / this._tour.distance();
        for (var tourIndex = 0; tourIndex < this._tour.size(); tourIndex++) {
            if (tourIndex >= this._tour.size()-1) {
                var fromCity = this._tour.get(tourIndex);
                var toCity = this._tour.get(0);
                var edge = this._graph.getEdge(fromCity, toCity);
                var pheromone = edge.getPheromone();
                edge.setPheromone(pheromone + extraPheromone);
            } else {
                var fromCity = this._tour.get(tourIndex);
                var toCity = this._tour.get(tourIndex+1);
                var edge = this._graph.getEdge(fromCity, toCity);
                var pheromone = edge.getPheromone();
                edge.setPheromone(pheromone + extraPheromone);
            }
        }
    };

    return Ant;
})();

var Tour = (function () {
    function Tour(graph) {
        this._graph = graph;
        this._tour = [];
        this._distance = null;
    }

    Tour.prototype.size = function() { return this._tour.length; };

    Tour.prototype.contains = function(city) {
        for (var tourIndex in this._tour) {
            if (city.isEqual(this._tour[tourIndex])) {
                return true;
            }
        }

        return false;
    };

    Tour.prototype.containsWithValue = function(x, y) {
        for (var tourIndex in this._tour) {
            if (parseInt(this._tour[tourIndex]._x)==x && parseInt(this._tour[tourIndex]._y)==y) {
                return this._tour[tourIndex];
            }
        }

        return null;
    };

    Tour.prototype.addCity = function(city) {
        this._distance = null;
        this._tour.push(city);
    };

    Tour.prototype.get = function(tourIndex) {
        return this._tour[tourIndex];
    };
    
    Tour.prototype.distance = function() {
        if (this._distance == null) {
            //console.log('DISTANCE NEW')
            var distance = 0.0;

            for (var tourIndex = 0; tourIndex < this._tour.length; tourIndex++) {
                if (tourIndex >= this._tour.length-1) {
                    var edge = this._graph.getEdge(this._tour[tourIndex], this._tour[0]);
                    distance += edge.getDistance();
                    //console.log("("+this._tour[tourIndex]._x.toFixed(2)+"-"+this._tour[tourIndex]._y.toFixed(2)+") ("+
                    //+this._tour[0]._x.toFixed(2)+"-"+this._tour[0]._y.toFixed(2)+")  - "+ edge.getDistance().toFixed(2));
                } else {
                    var edge = this._graph.getEdge(this._tour[tourIndex], this._tour[tourIndex+1]);
                    distance += edge.getDistance();
                    //console.log("("+this._tour[tourIndex]._x.toFixed(2)+"-"+this._tour[tourIndex]._y.toFixed(2)+") ("+
                    //+this._tour[tourIndex+1]._x.toFixed(2)+"-"+this._tour[tourIndex+1]._y.toFixed(2)+")  - "+ edge.getDistance().toFixed(2));
                }
            }
            //console.log(distance)
            this._distance = distance;
        }
        return this._distance;
    };

    return Tour;
})();












$(document).ready(function(){
    var getDimensionsOfTd = document.getElementsByTagName('td')[0];
    /*if(getDimensionsOfTd.offsetWidth > getDimensionsOfTd.offsetHeight)
        var square_dim=getDimensionsOfTd.offsetHeight;
    else
        var square_dim=getDimensionsOfTd.offsetWidth;*/
    var antCanvas = new Canvas('#aco_canvas', getDimensionsOfTd.offsetWidth, getDimensionsOfTd.offsetHeight);
    var ac = new AntColony();
    var acArtist = new ACArtist(ac, antCanvas);
    var dataManager = new DataManager(acArtist);
    
    var wasOver;
   antCanvas.pixelOnMouseOver();
    /*antCanvas.pixelOnMouseOver(function(r,g,b,a){
      var isOver = a > 10; // arbitrary threshold
      if (isOver != wasOver){
        wasOver = isOver;
        $('#position').html('0/' + "r:"+r+", g:"+g+", b:"+b+", a:"+a);
      }
      
    });*/
    

    $('#aco-params select').change(function() {
        acArtist.stop();
        setParams();
    });

    $('#aco-mode').change(function() {
        $('#elitist-weight-input').hide();
        $('.maxmin-params').hide();
        if ($(this).val() == 'elitist') {
            $('#elitist-weight-input').show();
        } else if ($(this).val() == 'maxmin') {
            $('.maxmin-params').show();
        }
    });

    function setParams() {
        var params = {
            'type': $('#aco-mode').val(),
            'colonySize': $('#colony-size').val(),
            'alpha': $('#alpha').val(),
            'beta': $('#beta').val(),
            'rho': $('#rho').val(),
            'iterations': $('#max-iterations').val(),
            'elitistWeight': $('#elitist-weight').val(),
            'initPheromone': $('#init-pheromone').val(),
            'q': $('#pheromone-deposit-weight').val(),
            'minScalingFactor': $('#min-scalar').val(),
        };

        ac.setParams(params);
    }

    setParams();

    $('#start_search_btn').click(function() {
        if (!ac.ready() && !dataManager.dataWasjustLoaded) {
            document.getElementById("user_information_output").innerHTML = "Please add at least two destination nodes or a pre-selected dataset";
        }

        if(dataManager.dataWasjustLoaded)
        {
            dataManager.dataWasjustLoaded=false;
        }

        $('.aco_info').show();
        $('#iteration_info').html('0/' + ac.maxIterations());
        $('#best_distance').html('-');
        acArtist.runAC(function() {
            $('#iteration_info').html(ac.currentIteration() + '/' + ac.maxIterations());
            $('#best_distance').html((ac.getGlobalBest().getTour().distance()).toFixed(2));
            document.getElementById("user_information_output").innerHTML = "Algorithm running...";
        });
        
    });

    $('#clear_graph').click(function() {
        document.getElementById("user_information_output").innerHTML = "Dataset cleared. Ready!";
        console.log("Clear");
        acArtist.clearGraph();
        dataManager.currentPointsComeFromDataset=false;
        dataManager.dataWasjustLoaded=false;
        $('.aco_info').hide();
        var datasetSelect = document.getElementById('dataset_selection');
        datasetSelect.selectedIndex = "empty";
    });
});