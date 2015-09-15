"use strict";angular.module("dnaApp",["ngRoute","ngDraggable"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("dnaApp").controller("MainCtrl",["$scope",function(a){}]),angular.module("dnaApp").factory("Graph",["$routeParams",function(a){var b=a.sequence?a.sequence:"TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT",c=a.structure?a.structure:"...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............";return{sequence:b,structure:c,makeConnection:function(a,b){var d=c.split("");d.splice(Math.min(a,b),1,"("),d.splice(Math.max(a,b),1,")"),this.structure=d.join("")}}}]),angular.module("dnaApp").directive("sequence",["Graph",function(a){return{templateUrl:"views/sequence.html",restrict:"E",link:function(b,c,d){b.graph=a,b.$watch("graph.structure",function(c){b.nucleotides=_.map(a.sequence,function(a,b){return{base:a,construct:c[b]}})})}}}]),angular.module("dnaApp").directive("nucleotide",["Highlighter","Connector","Configuration","Graph",function(a,b,c,d){return{templateUrl:"views/nucleotide.html",restrict:"E",link:function(e,f,g){e.configuration=c,e.connector=b,e.startConnection=function(){"."==e.nucleotide.construct&&(b.connecting=!0,b.compliment={G:"C",C:"G",A:"T",T:"A"}[e.nucleotide.base])},e.makeConnection=function(a,b,c){d.makeConnection(a,c)},e.cancelConnection=function(){b.connecting=!1,b.compliment=null},e.$watch("connector.compliment",function(a){var c=a!=e.nucleotide.base||"."!=e.nucleotide.construct;e.uncomplimentary=b.connecting?c:!1}),e.highlightNucleotide=function(){a.selectedNucleotideIndex=e.$index},e.unhighlightNucleotide=function(){a.selectedNucleotideIndex=-1}}}}]),angular.module("dnaApp").factory("Configuration",function(){var a={A:"#FF0000",C:"#FF0000",G:"#FF0000",N:"#FF0000",T:"#FF0000"},b=5,c="Times",d=1;return{baseColors:a,baseRadius:b,baseFont:c,lineWidth:d}}),angular.module("dnaApp").directive("configurator",["Configuration","Graph",function(a,b){return{template:"<div></div>",restrict:"E",link:function(b,c){var d=new dat.GUI;d.addColor(a.baseColors,"A").onChange(function(a){b.$apply()}),d.addColor(a.baseColors,"C").onChange(function(a){b.$apply()}),d.addColor(a.baseColors,"G").onChange(function(a){b.$apply()}),d.addColor(a.baseColors,"N").onChange(function(a){b.$apply()}),d.addColor(a.baseColors,"T").onChange(function(a){b.$apply()}),d.add(a,"baseRadius",0,10).onChange(function(a){b.$apply()}),d.add(a,"baseFont",{Times:"times",Arial:"arial",Courier:"courier",Helvetica:"helvetica"}).onChange(function(a){b.$apply()}),d.add(a,"lineWidth",0,10).onChange(function(a){b.$apply()})}}}]),angular.module("dnaApp").directive("visualization",["Graph","Configuration","Highlighter",function(a,b,c){return{template:"<div></div>",restrict:"E",link:function(d,e,f){d.graph=a,d.$watch("graph.structure",function(){g()});var g=function(){var f=new FornaContainer(e[0],{applyForce:!0,allowPanningAndZooming:!0,labelInterval:0}),g={structure:a.structure,sequence:a.sequence},h=(f.addRNA(g.structure,g),d3.selectAll("[node_type=nucleotide]")),i=d3.selectAll("[link_type=backbone], [link_type=basepair]"),j=d3.selectAll("text");d.configuration=b,d.$watch("configuration.baseColors",function(){var a=d3.scale.ordinal().range(_.values(b.baseColors)).domain(["A","C","G","U","T"]);h.style("fill",function(b){return a(b.name)})},!0),d.$watch("configuration.baseRadius",function(a){h.attr("r",a)},!0),d.$watch("configuration.lineWidth",function(a){i.attr("stroke-width",a)},!0),d.$watch("configuration.baseFont",function(a){j.attr("class",a)},!0),d.highlighter=c,d.$watch("highlighter.selectedNucleotideIndex",function(a){a>=0?(h.style("opacity",.2),d3.select(h[0][a]).style("opacity",1)):h.style("opacity",1)}),h.on("mouseenter",function(a){c.selectedBaseIndex=a.num-1,d.$apply()}),h.on("mouseleave",function(a){c.selectedBaseIndex=-1,d.$apply()})}}}}]),angular.module("dnaApp").factory("Highlighter",function(){var a=-1,b=-1;return{selectedNucleotideIndex:a,selectedBaseIndex:b}}),angular.module("dnaApp").factory("Connector",function(){var a,b=!1;return{connecting:b,compliment:a}}),angular.module("dnaApp").run(["$templateCache",function(a){a.put("views/main.html","<!-- the header --> <header>DNA SECONDARY STRUCTURE</header> <!-- the configurator directive --> <!-- allows the user to update base colors, radius, font and line width --> <!-- communicates changes to the Configuration service for communication to other directives --> <configurator></configurator> <!-- the sequence directive --> <!-- displays the sequence and structure --> <sequence></sequence> <!-- the visualization directive --> <!-- displays the 2D visualization --> <visualization></visualization>"),a.put("views/nucleotide.html",'<!-- the base --><!-- angular drag and drop directives from the ngDraggable module: https://github.com/fatlinesofcode/ngDraggable --><!-- drag and drop is used as the mechanism for new connections between bases --><!-- this component is repeated in the sequence directive --> <div ng-style="{\'background\':configuration.baseColors[nucleotide.base]}" ng-drag="nucleotide.construct == \'.\'" ng-drag-data="$index" ng-mousedown="startConnection()" ng-drop="nucleotide.construct == \'.\' && nucleotide.base == connector.compliment" ng-drop-success="makeConnection($data,$event,$index)" ng-drag-stop="cancelConnection()"> {{nucleotide.base}} </div> <!-- the structure construct --> <div class="construct">{{nucleotide.construct}}</div>'),a.put("views/sequence.html",'<!-- the base representation in sequence directive --><!-- angular bindings for nucleotide highlighting on hover --> <nucleotide ng-repeat="nucleotide in nucleotides track by $index" ng-class="{unhighlighted:highlighter.selectedBaseIndex >= 0 && highlighter.selectedBaseIndex != $index, uncomplimentary: uncomplimentary}" ng-mouseenter="highlightNucleotide(nucleotide, $index)" ng-mouseleave="unhighlightNucleotide()"> > </nucleotide>')}]);