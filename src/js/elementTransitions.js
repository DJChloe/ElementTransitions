
/*get_elements_until (document.getElementById('first'), 'input', 'td')*/

function get_elements_until (parent, tagname_to_search_for, tagname_to_stop_at) {
 var element_list = []
 var stack_current = [parent]
 while (true) {
 var stack_new = []
  for (var s = 0, curlen_s = stack_current.length; s < curlen_s; s++) {
   var children = stack_current[s].childNodes
   for (var i = 0, curlen = children.length; i < curlen; i++) {
    var child = children[i], tagname = child.tagName
    if (typeof tagname == "undefined") continue
    tagname = tagname.toLowerCase ()
    if (tagname == tagname_to_search_for) element_list.push (child)
    if (tagname != tagname_to_stop_at) stack_new.push (child)
   }
  }
  stack_current = stack_new
  if (stack_new.length == 0) break
 }
 return element_list
}

var PageTransitions = (function() {
	var step=0, gotoPage=0;

  String.prototype.bool = function() {
    return (/^true$/i).test(this);
  };

  var startElement = 0,
  animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  };

  function getTransitionPrefix() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'animation';
    if(typeof s[p] == 'string')
      return 'animation';

    // Tests for vendor specific prop
    var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for( var i=0; i<v.length; i++ ) {
      if(typeof s[v[i] + p] == 'string')
        return v[i] + p;
    }
    return false;
  }
  
  var  animEndEventName = animEndEventNames[getTransitionPrefix()];

  function init() {
    each(".et-page", function(e) {
      e.setAttribute('originalClassList', e.className);
    });

    each(".et-wrapper", function(e) {
      e.setAttribute('current', 0);
      e.setAttribute('isAnimating', false);
	  //get_elements_until (e, 'et-page', 'et-wrapper')[startElement].classList.add('et-page-current');
      e.querySelectorAll(".et-page")[startElement].classList.add('et-page-current');
    });

    each(".et-rotate", function(e) {
      e.addEventListener('click', function() {
        animate(this);
      });
    });
  }

  var each = function(query, callback) {
    return Array.prototype.slice.call(document.querySelectorAll(query), 0).map(callback);
  };
  
  function currentpage(block) {
	var current = parseInt(block.getAttribute('current'), 10),
		$pages = block.querySelectorAll('.et-page');
		//$pages=get_elements_until (block, 'et-page', 'et-wrapper');
	return $pages[current];
  }

  function animate(block, callback) {
		animateex(block, undefined, undefined, undefined, undefined, callback);
  }

  function animateex(block, outClass, inClass, step, gotoPage, callback) {
    if (outClass === undefined)
      outClass = formatClass(block.getAttribute('et-out'));
    else
      outClass = formatClass(outClass);
    if (inClass === undefined)
      inClass  = formatClass(block.getAttribute('et-in'));
    else
      inClass = formatClass(inClass);

    if (step === undefined) 
      step = block.getAttribute('et-step');
  
	if (gotoPage === undefined) 
      gotoPage = block.getAttribute('et-goto');

    	//block    = $(block).closest('.et-wrapper');
		
	
	if (isNaN(parseInt(step,10))) {
      step = 1;
    }
    
	if (block.classList.contains('et-rotate')) {
      while (!block.classList.contains('et-wrapper')) {
        block = block.parentNode;
      }
    }

    var current = parseInt(block.getAttribute('current'), 10),
        $pages = block.querySelectorAll('.et-page'),
		//$pages=get_elements_until (block, 'et-page', 'et-wrapper'),
        pagesCount = $pages.length,
        endCurrPage = false,
        endNextPage = false;

    if(block.getAttribute('isAnimating') && block.getAttribute('isAnimating').bool()) {
      return false;
    }

    block.setAttribute('isAnimating', true);

    var $currPage = $pages[current];
	current = current + step*1;
	
	if (!isNaN(parseInt(gotoPage,10))) {
      current = gotoPage;
    }
	
    if (current >= pagesCount) {
      current = 0;
    }

    block.setAttribute('current', current);

    var $nextPage = $pages[current];

    outClass.forEach(function(c) {
      $currPage.classList.add(c);
    });

    $currPage.addEventListener(animEndEventName, function handlecurr() {
      this.removeEventListener(animEndEventName, handlecurr);
      endCurrPage = true;
      if(endNextPage) {
        if(typeof(callback) == "function") {
          callback(block, $nextPage, this);
        }
        onEndAnimation(this, $nextPage, block);		
      }
    });

    inClass.forEach(function(c) {
      $nextPage.classList.add(c);
    });

    $nextPage.classList.add("et-page-current");

    $nextPage.addEventListener(animEndEventName, function handlenext() {
      $nextPage.removeEventListener(animEndEventName, handlenext);
      endNextPage = true;
      if(endCurrPage) {
        onEndAnimation($currPage, this, block);
      }
    });
  }

  function onEndAnimation($outpage, $inpage, block) {
    block.setAttribute('isAnimating', false);
    $outpage.className = $outpage.getAttribute('originalClassList');
    $inpage.className  = $inpage.getAttribute( 'originalClassList') + ' et-page-current';
  }

  function formatClass(str) {
    var classes = str.split(" ");
    var output = [];
    for(var i=0; i<classes.length; i++){
      output.push("pt-page-" + classes[i]);
    }
    return output;
  }

  return {
    init : init,
    animate: animate,
	animateex: animateex,
	currentpage : currentpage
  };

})();

document.addEventListener('DOMContentLoaded', function() {
  PageTransitions.init();
});