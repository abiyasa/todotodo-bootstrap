/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global define, $, FileError, brackets, window */
define(['jquery', 'underscore', 'backbone', 'text!templates/todos.html'], function ($, _, Backbone, todosTemplate) {
    'use strict';
    var TodoView = Backbone.View.extend({

        //... is a table row tag.
        tagName: "tr",

        // Cache the template function for a single item.
        template: _.template(todosTemplate),

        // The DOM events specific to an item.
        events: {
            "click .todo-content": "toggleDone",
            "click .todo-indicator": "toggleDone",
            "click .todo-edit": "edit",
            "click .todo-destroy": "clear",
            "keypress .todo-input": "updateOnEnter",
            "blur .todo-input": "close"
        },

        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function () {
            _.bindAll(this, 'render', 'close', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('destroy', this.remove);
        },

        // Re-render the contents of the todo item.
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            this.input = this.$('.todo-input');
            return this;
        },

        // Toggle the `"done"` state of the model.
        toggleDone: function () {
            this.model.toggle();
        },
        
        // switch the view mode between 'edit' and 'show'
        switchMode: function (mode) {
            switch (mode) {
            case 'edit':
                this.$('.edit-item').removeClass('hidden');
                this.$('.show-item').addClass('hidden');
                break;
                    
            case 'show':
            default:
                this.$('.edit-item').addClass('hidden');
                this.$('.show-item').removeClass('hidden');
                break;
            }
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function (event) {
            this.switchMode('edit');
            this.input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function () {
            this.model.save({
                content: this.input.val()
            });
            this.switchMode('show');
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (e) {
            if (e.keyCode === 13) {
                this.close();
            }
        },

        // Remove the item, destroy the model.
        clear: function () {
            this.model.clear();
        }

    });
    return TodoView;
});