(function($) {

  $.ContextControls = function(options) {

    jQuery.extend(this, {
      parent: null,
      element: null,
      container: null,
      mode: null,
      windowId: null,
      rectTool: null
    }, options);

    this.init();
  };

  $.ContextControls.prototype = {

    init: function() {    
      this.element = jQuery(this.template()).appendTo(this.container);
      this.hide();
      this.bindEvents();
    },

    show: function() {
      this.element.show().fadeIn();
    },

    hide: function() {
      this.element.hide().fadeOut();
    },

    bindEvents: function() {
      var _this = this;

      this.container.find('.mirador-osd-close').on('click', function() {
        if (_this.rectTool) {
          _this.rectTool.exitEditMode();
        }
        _this.container.find('.mirador-osd-edit-mode').removeClass("selected");
        _this.container.find('.mirador-osd-annotations-layer').removeClass("selected");
        _this.hide();
        _this.parent.parent.setMode('default');
      });
      
      this.container.find('.mirador-osd-back').on('click', function() {
        _this.element.remove();
        _this.element = jQuery(_this.template()).appendTo(_this.container);
        _this.bindEvents();
      });
      
      this.container.find('.mirador-osd-edit-mode').on('click', function() {
        /* For now we won't have the secondary level of menu options
        _this.element.remove();
        _this.element = jQuery(_this.editorTemplate()).appendTo(_this.container);
        _this.bindEvents();*/
        console.log(this);
        jQuery(this).toggleClass("selected");
        _this.parent.parent.setMode('editingAnnotations'); 
        _this.rectTool.enterEditMode();
      });
      
      this.container.find('.mirador-osd-rect-tool').on('click', function() {
        _this.parent.parent.setMode('editingAnnotations'); 
        _this.rectTool.enterEditMode();
        //_this.bindEvents();
      });
    },

    template: Handlebars.compile([
                                 '<div class="mirador-osd-context-controls hud-control">',
                                   '<a class="mirador-osd-close hud-control">',
                                   '<i class="fa fa-2x fa-times"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-edit-mode hud-control">',
                                   '<i class="fa fa-2x fa-edit"></i>',
                                   '</a>',
                                   /*'<a class="mirador-osd-list hud-control">',
                                   '<i class="fa fa-2x fa-list"></i>',
                                   '</a>',*/
                                   /*'<a class="mirador-osd-search hud-control">',
                                   '<i class="fa fa-2x fa-search"></i>',
                                   '</a>',*/
                                   /*'<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-gear"></i>',
                                   '</a>',*/
                                 '</div>'
    ].join('')),

    editorTemplate: Handlebars.compile([
                                 '<div class="mirador-osd-context-controls hud-control">',
                                   '<a class="mirador-osd-back hud-control">',
                                   '<i class="fa fa-2x fa-arrow-left"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-pencil-square"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-ellipsis-h"></i>',
                                   '</a>',
                                   '<a class="mirador-osd-rect-tool hud-control">',
                                   '<i class="fa fa-2x fa-gear"></i>',
                                   '</a>',
                                 '</div>'
    ].join(''))
  };
}(Mirador));
