## ElementTransitions

#### [Demo and example code](http://dan-silver.github.io/ElementTransitions/)

This repository is a wrapper around the code provided by a [codrops article on page transitions](http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/).  Their code has been modified to allow more than one animatable element per page.  Additionally, you can now add transitions straight from html tags.

#### Extension by Chloe Avrillon (DJChloe)
##### AnimateEx function (called from javascript) :
```javascript
function animateex(block, outClass, inClass, step, gotoPage, callback)
```
can be used instead of 
```javascript
function animate(block, callback)
```

Be carefull : Page numbering goes from 0 to n-1 !

* step : specifies the step to go for the next page

* gotoPage : specifies the page number to go to

if gotoPage is defined, step value will be ignored.

Examples 
```javascript
//go to page 3
PageTransitions.animateex($("#mywrapperID").get(0),'moveToRight','moveFromLeft', 1, 3);

//goes back 2 slides
PageTransitions.animateex($("#mywrapperID").get(0),'moveToRight','moveFromLeft', -2);
```
##### Attributes (directly in html elements) :
```html
<button class="et-rotate" et-in="rotateCarouselRightIn" et-out="rotateCarouselRightOut" et-goto="2">goto button</button>

<button class="et-rotate" et-in="rotateCarouselRightIn" et-out="rotateCarouselRightOut"
et-step="3">step button</button>
```


Example (real life, in a Bootstrap 4  project, pages are called from an external menu) :
```html
<div class="navbar-collapse  collapse  w-100" id="collapse1" role="navigation" data-parent="#togglerhaut">
<div class="navbar-nav w-100">
	<!-- widescreen -->
	<div class="btn-group-toggle d-flex-column d-md-flex justify-content-between ml-2 w-100" data-toggle="buttons" id="menubuttons_top">
		<label class="btn btn-sm rounded-0 col-md" id="sel0">
			<input type="radio" name="selector0" id="selector0-0" autocomplete="off" value="2"
			onchange="gotopagemenuselect('#pagetrans1',0)" ><span>Landingpage</span>
		</label>

		<label class="btn btn-sm rounded-0 col-md" id="sel1">
			<input type="radio" name="selector0" id="selector0-1" autocomplete="off" value="3"
			onchange="gotopagemenuselect('#pagetrans1',1)"><span>home</span>
		</label>

		<label class="btn btn-sm rounded-0 col-md" id="sel1">
			<input type="radio" name="selector0" id="selector0-1" autocomplete="off" value="3"
			onchange="gotopage('#pagetrans1',2)"><span>Goto options</span>
		</label>

		<label class="btn btn-sm rounded-0 col-md btn-right" id="sel3">
			<input type="radio" name="selector0" id="selector0-3" autocomplete="off" value="4"
			onchange="gotopagemenuselect('#pagetrans1',4)"><span>Le mur d'or</span>
		</label>
		
		<label class="btn btn-secondary btn-sm btn-round-sm visite col-md" id="sel4">
			<input type="radio" name="selector0" id="selector0-4" autocomplete="off" value="5"
			onchange="gotopagemenuselect('#pagetrans1',5)"><span>Visite virtuelle</span>
		</label>
	</div>
</div>
</div>
.....
<main role="main" class="main_section">
	<div class="et-wrapper h-100" id="pagetrans1">
        <div class="et-page h-100">			<button class="et-rotate" et-in="rotateSlideIn" et-out="rotateSlideOut" et-goto="2">goto page 2</button>
          <div class="et-page">
           <h2>Page 0</h2>
         </div>
			<?php
				include('main/main_landingpage.php');
			?>		
		</div>		
		<div class="et-page h-100 oy-auto">
		    <div class="et-page h-100">			<button class="et-rotate" et-in="rotateSlideIn" et-out="rotateSlideOut">goto page 2 (default behavior)</button>
          <div class="et-page">
           <h2>Page 1</h2>
         </div>				
			<?php
				include('main/main_home.php');
			?>		
		</div>		
		
		<div class="et-page h-100 oy-auto">
		    <div class="et-page h-100">			<button class="et-rotate" et-in="rotateSlideIn" et-out="rotateSlideOut"
		    et-step="-1">goto page 1 (previous, using et-step)</button>
          <div class="et-page">
           <h2>Page 2</h2>
         </div>
			<?php
				include('main/main_options.php');			?>
				
		</div>
	</div>
</main>
.....
<script>
		function gotopage(targetelemtran,pagenum,callback) {
			PageTransitions.animateex($(targetelemtran).get(0),'moveToRight','moveFromLeft', 1, pagenum, callback);
		}
</script>
```


##### License
The css animations in elementTransitions.css were written by Codrops and therefore fall under [their license](http://tympanus.net/codrops/licensing/).  All other source code is released under the MIT License.


##### Credits

[james2doyle](https://github.com/james2doyle) - Removed jQuery dependency


