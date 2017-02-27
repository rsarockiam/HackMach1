/**************** 
    Starter vzrfInit() template. Modify to your custom Needs!! 
****************/

// Choose an alias for jQuery. If this line is removed, will default to VZRF's internally used, $vf
var $ = $vf;

// Where context = id || jQuery object || undefined.
function vzrfInit(context) {
    
    // accessibility
	a11yInit(context);
	
	 //init components and utility
    datepickerInit(context);
    equalHeightsInit(context);
    equalWidthsInit(context);
    formsInit(context);
    fixedBottomInit(context);
    incrementInit(context);
    revealInit(context);
    stickyInit(context);
    xScrollInit(context);
    
    // init widgets
    //carouselInit(context);
    dropListInit(context);
    filterBarInit(context);
    listControlInit(context);
    modalInit(context);
    //offCanvasInit(context);
	paginationInit(context);
    pwToggleInit(context);
    ratingInit(context);
    stepsInit(context);
    tabsInit(context);
    tooltipInit(context);

    // app specific components/widgets
    //appInit(context)
}

// wait until everything else, including images load
$(window).load(function () {
    equalHeightsInit()
    equalWidthsInit()
});

// run on DOM ready
$(function () {
    vzrfInit();
    FastClick.attach(document.body);
});

// Function to return the context as a jQuery object
// Where context = id || jQuery object || undefined.
function getContext(context) {
    var $context;
    if (context instanceof $vf || context instanceof jQuery) {
        $context = context;
    } else if (context) {
        $context = $('#' + context);
    } else {
        $context = $(document);
    }
    return $context;
}