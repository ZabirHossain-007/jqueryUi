// jquery code will goes here

$(document).ready(function () {
  // draggable content starts

  $("#draggable").draggable();

  // draggable content ends

  //   draggable constrain movement start
  $("#draggable1").draggable({ axis: "y" });
  $("#draggable2").draggable({ axis: "x" });
  $("#draggable3").draggable({
    containment: "#containment-wrapper",
    scroll: false,
  });
  $("#draggable4").draggable({ containment: "parent" });
  //   draggable constrain movement ends

  // cursor starts
  $("#draggable5").draggable({
    cursor: "move",
    cursorAt: { top: 56, left: 56 },
  });
  $("#draggable6").draggable({
    cursor: "crosshair",
    cursorAt: { top: -5, left: -5 },
  });
  $("#draggable7").draggable({ cursorAt: { bottom: 0 } });
  // cursor ends

  // events starts
  var $start_counter = $("#event-start"),
    $drag_counter = $("#event-drag"),
    $stop_counter = $("#event-stop"),
    counts = [0, 0, 0];

  $("#draggable8").draggable({
    start: function () {
      counts[0]++;
      updateCounterStatus($start_counter, counts[0]);
    },
    drag: function () {
      counts[1]++;
      updateCounterStatus($drag_counter, counts[1]);
    },
    stop: function () {
      counts[2]++;
      updateCounterStatus($stop_counter, counts[2]);
    },
  });

  function updateCounterStatus($event_counter, new_count) {
    // first update the status visually...
    if (!$event_counter.hasClass("ui-state-hover")) {
      $event_counter
        .addClass("ui-state-hover")
        .siblings()
        .removeClass("ui-state-hover");
    }
    // ...then update the numbers
    $("span.count", $event_counter).text(new_count);
  }
  // events ends

  // handles starts
  $("#draggable9").draggable({ handle: "p" });
  $("#draggable10").draggable({ cancel: "p.ui-widget-header" });
  $("div, p").disableSelection();
  // handles ends

  // draggable + sortable starts
  $("#sortable").sortable({
    revert: true,
  });
  $("#draggable11").draggable({
    connectToSortable: "#sortable",
    helper: "clone",
    revert: "invalid",
  });
  $("ul, li").disableSelection();
  // draggable + sortable ends

  // revert position starts
  $("#draggable12").draggable({ revert: true });
  $("#draggable13").draggable({ revert: true, helper: "clone" });
  // revert position ends

  // visual feedback starts
  $("#draggable14").draggable({ helper: "original" });
  $("#draggable15").draggable({ opacity: 0.7, helper: "clone" });
  $("#draggable16").draggable({
    cursor: "move",
    cursorAt: { top: -12, left: -20 },
    helper: function (event) {
      return $("<div class='ui-widget-header'>I'm a custom helper</div>");
    },
  });
  $("#set div").draggable({ stack: "#set div" });
  // visual feedback ends

  // Droppable default starts
  $("#draggableA").draggable();
  $("#droppableA").droppable({
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
    },
  });
  // Droppable default ends

  // Droppable accept starts
  $("#draggableB, #draggable-nonvalid").draggable();
  $("#droppableB").droppable({
    accept: "#draggableB",
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
    },
  });
  // Droppable accept ends

  // Droppable prvent propagation starts
  $("#draggableC").draggable();

  $("#droppableC, #droppable-inner").droppable({
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("> p").html("Dropped!");
      return false;
    },
  });

  $("#droppableC2, #droppable2-inner").droppable({
    greedy: true,
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("> p").html("Dropped!");
    },
  });
  // Droppable prvent propagation ends

  // revert droppable starts
  $("#draggableD").draggable({ revert: "valid" });
  $("#draggableD2").draggable({ revert: "invalid" });

  $("#droppableD").droppable({
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
    },
  });

  // revert droppable ends

  // simple photo gallery starts
  // There's the gallery and the trash
  var $gallery = $("#gallery"),
    $trash = $("#trash");

  // Let the gallery items be draggable
  $("li", $gallery).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move",
  });

  // Let the trash be droppable, accepting the gallery items
  $trash.droppable({
    accept: "#gallery > li",
    classes: {
      "ui-droppable-active": "ui-state-highlight",
    },
    drop: function (event, ui) {
      deleteImage(ui.draggable);
    },
  });

  // Let the gallery be droppable as well, accepting items from the trash
  $gallery.droppable({
    accept: "#trash li",
    classes: {
      "ui-droppable-active": "custom-state-active",
    },
    drop: function (event, ui) {
      recycleImage(ui.draggable);
    },
  });

  // Image deletion function
  var recycle_icon =
    "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
  function deleteImage($item) {
    $item.fadeOut(function () {
      var $list = $("ul", $trash).length
        ? $("ul", $trash)
        : $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);

      $item.find("a.ui-icon-trash").remove();
      $item
        .append(recycle_icon)
        .appendTo($list)
        .fadeIn(function () {
          $item
            .animate({ width: "48px" })
            .find("img")
            .animate({ height: "36px" });
        });
    });
  }

  // Image recycle function
  var trash_icon =
    "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
  function recycleImage($item) {
    $item.fadeOut(function () {
      $item
        .find("a.ui-icon-refresh")
        .remove()
        .end()
        .css("width", "96px")
        .append(trash_icon)
        .find("img")
        .css("height", "72px")
        .end()
        .appendTo($gallery)
        .fadeIn();
    });
  }

  // Image preview function, demonstrating the ui.dialog used as a modal window
  function viewLargerImage($link) {
    var src = $link.attr("href"),
      title = $link.siblings("img").attr("alt"),
      $modal = $("img[src$='" + src + "']");

    if ($modal.length) {
      $modal.dialog("open");
    } else {
      var img = $(
        "<img alt='" +
          title +
          "' width='384' height='288' style='display: none; padding: 8px;' />"
      )
        .attr("src", src)
        .appendTo("body");
      setTimeout(function () {
        img.dialog({
          title: title,
          width: 400,
          modal: true,
        });
      }, 1);
    }
  }

  // Resolve the icons behavior with event delegation
  $("ul.gallery > li").on("click", function (event) {
    var $item = $(this),
      $target = $(event.target);

    if ($target.is("a.ui-icon-trash")) {
      deleteImage($item);
    } else if ($target.is("a.ui-icon-zoomin")) {
      viewLargerImage($target);
    } else if ($target.is("a.ui-icon-refresh")) {
      recycleImage($item);
    }

    return false;
  });
  // simple photo gallery ends

  // visual feedback starts
  $("#draggableE").draggable();
  $("#droppableE").droppable({
    classes: {
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
    },
  });

  $("#draggableE2").draggable();
  $("#droppableE2").droppable({
    accept: "#draggable2",
    classes: {
      "ui-droppable-active": "ui-state-default",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
    },
  });
  // visual feedback ends

  // resizable default starts
  $("#resizable").resizable();
  // resizable default ends

  // resizable animate starts
  $("#resizableA").resizable({
    animate: true,
  });
  // resizable animate ends

  //  constrain resize area starts
  $("#resizableB").resizable({
    containment: "#container",
  });
  //  constrain resize area ends

  // resize helper starts
  $("#resizableC").resizable({
    helper: "ui-resizable-helper",
  });
  // resize helper ends

  // maximum or minimum starts
  $("#resizableD").resizable({
    maxHeight: 250,
    maxWidth: 350,
    minHeight: 150,
    minWidth: 200,
  });
  // maximum or minimum ends

  // preserve aspect ratio starts
  $("#resizableE").resizable({
    aspectRatio: 16 / 9,
  });
  // preserve aspect ratio ends

  // snap to grid starts
  $("#resizableF").resizable({
    grid: 50,
  });
  // snap to grid ends

  // synchronous resize starts
  $("#resizableG").resizable({
    alsoResize: "#also",
  });
  $("#also").resizable();
  // synchronous resize ends

  // visual feedback of ghost starts
  $("#resizableH").resizable({
    ghost: true,
  });
  // visual feedback of ghost ends

  // seclect default starts
  $("#selectable").selectable();
  // seclect default ends

  // select display as grid starts
  $("#selectableA").selectable();
  // select display as grid ends

  // serialize select starts
  $("#selectableB").selectable({
    stop: function () {
      var result = $("#select-result").empty();
      $(".ui-selected", this).each(function () {
        var index = $("#selectableB li").index(this);
        result.append(" #" + (index + 1));
      });
    },
  });
  // serialize select ends

  // sortable default starts
  $("#sortableA").sortable();
  // sortable default ends

  // connect list starts
  $("#sortable1, #sortable2")
    .sortable({
      connectWith: ".connectedSortable",
    })
    .disableSelection();
  // connect list ends

  // sort as grid starts
  $("#sortableB").sortable();
  $("#sortableB").disableSelection();
  // sort as grid ends



//   Drop placeholder starts
$( "#sortableC" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( "#sortableC" ).disableSelection();
//   Drop placeholder ends

// Handle empty list starts
$( "ul.droptrue" ).sortable({
    connectWith: "ul"
  });

  $( "ul.dropfalse" ).sortable({
    connectWith: "ul",
    dropOnEmpty: false
  });

  $( "#sortableD1, #sortableD2, #sortableD3" ).disableSelection();
// Handle empty list ends

// include or exclude items starts
$( "#sortableE1" ).sortable({
    items: "li:not(.ui-state-disabled)"
  });

  $( "#sortableE2" ).sortable({
    cancel: ".ui-state-disabled"
  });

  $( "#sortableE1 li, #sortableE2 li" ).disableSelection();
// include or exclude items ends

// portlets starts
$( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all"
  });

  $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
      .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  $( ".portlet-toggle" ).on( "click", function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
  });
// portlets ends


// widget starts

// Accordion starts
$( "#accordion" ).accordion();
// Accordion ends

// Accordion collapse starts
$( "#accordionA" ).accordion({
    collapsible: true
  });
// Accordion collapse ends

// customize icons starts
var icons = {
    header: "ui-icon-circle-arrow-e",
    activeHeader: "ui-icon-circle-arrow-s"
  };
  $( "#accordionB" ).accordion({
    icons: icons
  });
  $( "#toggle" ).button().on( "click", function() {
    if ( $( "#accordionB" ).accordion( "option", "icons" ) ) {
      $( "#accordionB" ).accordion( "option", "icons", null );
    } else {
      $( "#accordionB" ).accordion( "option", "icons", icons );
    }
  });
// customize icons ends

// fill space starts
$( "#accordionC" ).accordion({
    heightStyle: "fill"
  });

  $( "#accordion-resizer" ).resizable({
    minHeight: 140,
    minWidth: 200,
    resize: function() {
      $( "#accordionC" ).accordion( "refresh" );
    }
  });
// fill space ends

// No auto height starts
$( "#accordionD" ).accordion({
    heightStyle: "content"
  });
// No auto height ends

// sortable accordion starts
$( "#accordionE" )
      .accordion({
        header: "> div > h3"
      })
      .sortable({
        axis: "y",
        handle: "h3",
        stop: function( event, ui ) {
          // IE doesn't register the blur when sorting
          // so trigger focusout handlers to remove .ui-state-focus
          ui.item.children( "h3" ).triggerHandler( "focusout" );
 
          // Refresh accordion to handle new order
          $( this ).accordion( "refresh" );
        }
      });
// sortable accordion ends

// Auto complete combo box starts 
$.widget( "custom.combobox", {
    _create: function() {
      this.wrapper = $( "<span>" )
        .addClass( "custom-combobox" )
        .insertAfter( this.element );

      this.element.hide();
      this._createAutocomplete();
      this._createShowAllButton();
    },

    _createAutocomplete: function() {
      var selected = this.element.children( ":selected" ),
        value = selected.val() ? selected.text() : "";

      this.input = $( "<input>" )
        .appendTo( this.wrapper )
        .val( value )
        .attr( "title", "" )
        .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
        .autocomplete({
          delay: 0,
          minLength: 0,
          source: this._source.bind( this )
        })
        .tooltip({
          classes: {
            "ui-tooltip": "ui-state-highlight"
          }
        });

      this._on( this.input, {
        autocompleteselect: function( event, ui ) {
          ui.item.option.selected = true;
          this._trigger( "select", event, {
            item: ui.item.option
          });
        },

        autocompletechange: "_removeIfInvalid"
      });
    },

    _createShowAllButton: function() {
      var input = this.input,
        wasOpen = false;

      $( "<a>" )
        .attr( "tabIndex", -1 )
        .attr( "title", "Show All Items" )
        .tooltip()
        .appendTo( this.wrapper )
        .button({
          icons: {
            primary: "ui-icon-triangle-1-s"
          },
          text: false
        })
        .removeClass( "ui-corner-all" )
        .addClass( "custom-combobox-toggle ui-corner-right" )
        .on( "mousedown", function() {
          wasOpen = input.autocomplete( "widget" ).is( ":visible" );
        })
        .on( "click", function() {
          input.trigger( "focus" );

          // Close if already visible
          if ( wasOpen ) {
            return;
          }

          // Pass empty string as value to search for, displaying all results
          input.autocomplete( "search", "" );
        });
    },

    _source: function( request, response ) {
      var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
      response( this.element.children( "option" ).map(function() {
        var text = $( this ).text();
        if ( this.value && ( !request.term || matcher.test(text) ) )
          return {
            label: text,
            value: text,
            option: this
          };
      }) );
    },

    _removeIfInvalid: function( event, ui ) {

      // Selected an item, nothing to do
      if ( ui.item ) {
        return;
      }

      // Search for a match (case-insensitive)
      var value = this.input.val(),
        valueLowerCase = value.toLowerCase(),
        valid = false;
      this.element.children( "option" ).each(function() {
        if ( $( this ).text().toLowerCase() === valueLowerCase ) {
          this.selected = valid = true;
          return false;
        }
      });

      // Found a match, nothing to do
      if ( valid ) {
        return;
      }

      // Remove invalid value
      this.input
        .val( "" )
        .attr( "title", value + " didn't match any item" )
        .tooltip( "open" );
      this.element.val( "" );
      this._delay(function() {
        this.input.tooltip( "close" ).attr( "title", "" );
      }, 2500 );
      this.input.autocomplete( "instance" ).term = "";
    },

    _destroy: function() {
      this.wrapper.remove();
      this.element.show();
    }
  });

  $( "#combobox" ).combobox();
  $( "#toggleC" ).on( "click", function() {
    $( "#combobox" ).toggle();
  });
//  Auto complete combo box ends 

// multiple values starts
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  function split( val ) {
    return val.split( /,\s*/ );
  }
  function extractLast( term ) {
    return split( term ).pop();
  }

  $( "#tags" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
          availableTags, extractLast( request.term ) ) );
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        return false;
      }
    });
// multiple values ens

// xml data parsed starts
function log( message ) {
    $( "<div/>" ).text( message ).prependTo( "#log" );
    $( "#log" ).attr( "scrollTop", 0 );
  }

  $.ajax({
    url: "london.xml",
    dataType: "xml",
    success: function( xmlResponse ) {
      var data = $( "geoname", xmlResponse ).map(function() {
        return {
          value: $( "name", this ).text() + ", " +
            ( String.prototype.trim.call( $( "countryName", this ).text() ) ||
                "(unknown country)" ),
          id: $( "geonameId", this ).text()
        };
      }).get();
      $( "#birds" ).autocomplete({
        source: data,
        minLength: 0,
        select: function( event, ui ) {
          log( ui.item ?
            "Selected: " + ui.item.value + ", geonameId: " + ui.item.id :
            "Nothing selected, input was " + this.value );
        }
      });
    }
  });
// xml data parsed ends


// checkbox starts
$( "input" ).checkboxradio();
// checkbox ends

// product selector starts
function handleShape( e ) {
    $( ".shape" )
      .removeClass( "circle pill square rectangle" )
      .addClass( $( e.target ).val() );
  };
  function handleToggle( e ) {
    var target = $( e.target );

    if ( target.is( ".brand-toggle" ) ) {
      var checked = target.is( ":checked" ),
        value = $( "[name='brand']" )
          .filter( ":checked" )
          .attr( "data-" + target[ 0 ].id )
      $( ".shape" ).css( target[ 0 ].id, checked ? value : "" );
    } else {
      $( ".shape" ).toggleClass( target[ 0 ].id, target.is( ":checked") );
    }
  }
  function updateBrand() {
    handleShape( { target: $( "[name='shape']:checked" ) } );
    $( ".toggle:checked" ).each( function() {
      handleToggle( { target: $( this ) } );
    } );
  }

  // Initalize widgets
  $( "input" ).checkboxradio();
  $( ".shape-bar, .brand" ).controlgroup();
  $( ".toggles" ).controlgroup( {
    direction: "vertical"
  } );

  // Bind event handlers
  $( "[name='shape']").on( "change", handleShape );
  $( ".toggle" ).on( "change", handleToggle );
  $( "[name='brand']").on( "change", updateBrand );

  // Set initial values
  updateBrand();
// product selector ends

// control group starts
$( ".controlgroup" ).controlgroup()
    $( ".controlgroup-vertical" ).controlgroup({
      "direction": "vertical"
    });
// control group ends

// Date picker starts
$( "#datepicker" ).datepicker();
$( "#anim" ).on( "change", function() {
  $( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
});
// Date picker ends

// Dialog starts
$( "#dialog" ).dialog({
  autoOpen: false,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  }
});

$( "#opener" ).on( "click", function() {
  $( "#dialog" ).dialog( "open" );
});
// Dialog ends

// menu starts
$( "#menuA" ).menu();
// menu ends

// widget ends

});
